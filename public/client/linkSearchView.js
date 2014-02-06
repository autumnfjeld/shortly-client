Shortly.LinkSearchView = Backbone.View.extend({

  className: 'searchResult',

  initialize: function(){
    this.collection.fetch();
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addResult: function(searchString){
    console.log('here is', searchString);
    //why doesn't findWhere work???!?!?!
    //var result = this.collection.findWhere( {title : searchString});
    var result = this.collection.find( function(item){
      return  item.get('title') === searchString;
    });
    console.log('result', result);
    this.addOne(result);
    //this.addOne(this.collection.where( {title : searchString}));
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    this.$el.append(view.render().el);
  },


});