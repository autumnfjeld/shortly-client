class CreateUser < ActiveRecord::Migration


   def self.up
        create_table :users do |t|
            t.string :username
            t.string :email
            t.string :pw_hash
            t.string :pw_salt
            t.string :session_token
            t.boolean :logged_in
            t.timestamps
        end
    end

    def self.down
        drop_table :users
    end

end
