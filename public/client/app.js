window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="login">Login</a></li> \
        <li><a href="#" class="all">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.all"      : "renderLinksView",
    "click li a.create"   : "renderCreateView",
    "click li a.login"    : "renderLoginView",
    "submit form#search"  : "renderSearchResult"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    this.links = new Shortly.Links();
    $('body').append(this.render().el);
    this.renderLoginView();
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderLoginView : function(e){
    e && e.preventDefault();
    var userLoginView = new Shortly.UserLoginView();
    this.$el.find('#container').html(userLoginView.render().el);
    this.updateNav('login');
  },

  renderLinksView: function(e){
    e && e.preventDefault();

    var linksView = new Shortly.LinksView( {collection: this.links} );
    this.$el.find('#container').html( linksView.render().el );  //this sets html for #containter (overwrites)
    this.searchBar();
    this.updateNav('index');
  },

 renderSearchResult: function(e){
    e && e.preventDefault(); //need this otherwise form submit refreshes page
    var $form = this.$el.find('form .searchtext')
    var searchString = $form.val();
    var view = new Shortly.LinkSearchView( {collection: this.links} );
    this.$el.find('#container').html("Search result should go here")
    //this.$el.find('#container').html(view.addResult(searchString));
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },

  searchBar: function(e){
    e && e.preventDefault();
    var $search = $('<div class "searchbar"> \
        <form id="search"> \
          Search <input class="searchtext" type="text" name="search">\
        </form>\
      </div>');
    this.$el.find('#container').prepend($search);
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});