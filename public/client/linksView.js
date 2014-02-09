Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(){
    //this.collection.forEach(this.addOne, this);
    this.collection.sortBy(function(item){
        return -item.get("visits");
      }, this).forEach(this.addOne, this);
  },

  addSearchResult: function(searchString){
    console.log('here is', searchString);
    this.addOne(this.collection.where( {title : searchString}));
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    this.$el.append(view.render().el);
  },


});

//TODO : create template for this that will include search bar, 
//then will refesh subcontainer for list or search results