require 'sinatra'
require "sinatra/reloader" if development?
require 'active_record'
require 'digest/sha1'
require 'pry'
require 'uri'
require 'open-uri'
require 'bcrypt'
# require 'nokogiri'

###########################################################
# Configuration
###########################################################

set :public_folder, File.dirname(__FILE__) + '/public'

configure :development, :production do
    ActiveRecord::Base.establish_connection(
       :adapter => 'sqlite3',
       :database =>  'db/dev.sqlite3.db'
     )
end

# Handle potential connection pool timeout issues
after do
    ActiveRecord::Base.connection.close
end

# turn off root element rendering in JSON
ActiveRecord::Base.include_root_in_json = false

###########################################################
# Models
###########################################################
# Models to Access the database through ActiveRecord.
# Define associations here if need be
# http://guides.rubyonrails.org/association_basics.html

class Link < ActiveRecord::Base
    has_many :clicks

    validates :url, presence: true

    before_save do |record|
        record.code = Digest::SHA1.hexdigest(url)[0,5]
    end
end

class Click < ActiveRecord::Base
    belongs_to :link, counter_cache: :visits
end

class User < ActiveRecord::Base
    def authenticate(password)
        self.password === BCrypt::Engine.hash_secret(password, self.pw_salt)
    end

    before_save do |record|
        record.pw_salt  = BCrypt::Engine.generate_salt
        puts "aftersalt"
        record.password = BCrypt::Engine.hash_secret(record.password, record.pw_salt)
        record.session_token = Digest::SHA1.hexdigest record.to_s
    end
end


# before '/' do
#     halt redirect('/login') unless logged_in?
# end

###########################################################
# Routes
###########################################################

['/', '/shorten'].each do |path|
    get path do
        erb :index
    end
end

get '/login' do
    erb :login
end

post '/login' do
    puts "in login function"
    user = User.find_by_username params[:username]
    if user.nil?
        redirect '/signup'
    else
        session[:identifier] = user.session_token if user.authenticate(params[:password])
        puts "found user account #{user.inspect}"
        redirect '/'
    end
end

get '/signup' do
    erb :signup
end

post '/signup' do
    puts params
    record = User.find_by_username params[:username]
    puts record.inspect
    unless record.nil?
        redirect '/login'
    else
        record = User.create params
        puts "should be creating new user in db"
        redirect '/'
    end
end

get '/links' do
    links = Link.order("created_at DESC")
    links.map { |link|
        link.as_json.merge(base_url: request.base_url)
    }.to_json
end

post '/links' do
    data = JSON.parse request.body.read
    uri = URI(data['url'])
    raise Sinatra::NotFound unless uri.absolute?
    link = Link.find_by_url(uri.to_s) ||
           Link.create( url: uri.to_s, title: get_url_title(uri) )
    link.as_json.merge(base_url: request.base_url).to_json
end

get '/:url' do
    link = Link.find_by_code params[:url]
    raise Sinatra::NotFound if link.nil?
    link.clicks.create!
    redirect link.url
end

###########################################################
# Utility
###########################################################

def read_url_head url
    head = ""
    url.open do |u|
        begin
            line = u.gets
            next  if line.nil?
            head += line
            break if line =~ /<\/head>/
        end until u.eof?
    end
    head + "</html>"
end

def get_url_title url
    # Nokogiri::HTML.parse( read_url_head url ).title
    result = read_url_head(url).match(/<title>(.*)<\/title>/)
    result.nil? ? "" : result[1]
end
