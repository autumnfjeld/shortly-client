window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <div id="container"></div>'
  ),

  events: {
    "click li a.index"  :  "renderIndexView",
    "click li a.create" : "renderCreateView",
    "submit"       : "renderSearchResult"
  },

  initialize: function(){
    console.log( "Shortly is running" );
    this.links = new Shortly.Links();
    $('body').append(this.render().el);
    this.renderIndexView(); // default view
  },

  render: function(){
    this.$el.html( this.template() );
    return this;
  },

  renderIndexView: function(e){
    //var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {collection: this.links} );
    this.$el.find('#container').html( linksView.render().el );  //this sets html for #containter (overwrites)
    this.searchBar();
    this.updateNav('index');
  },

 renderSearchResult: function(e){
    e && e.preventDefault(); //need this otherwise form submit refreshes page
    var $form = this.$el.find('form .searchtext')
    var searchString = $form.val();
    console.log('checkintou', searchString);
    var view = new Shortly.LinkSearchView( {collection: this.links} );
    this.$el.find('#container').html(view.addResult(searchString));
  },

  searchBar: function(e){
    e && e.preventDefault();
    var $search = $('<div class "searchbar"> \
        <form> \
          Search <input class="searchtext" type="text" name="search">\
        </form>\
      </div>');
    this.$el.find('#container').prepend($search);
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    var linkCreateView = new Shortly.LinkCreateView();
    this.$el.find('#container').html( linkCreateView.render().el );
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  }

});