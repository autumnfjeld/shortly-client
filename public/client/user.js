Shortly.User = Backbone.Model.extend({

  //urlRoot: '/links'
  //will want to remove later

  work: function(){
    return this.get('username') + 'is working';
  }

});

// Notes:
// this will be called in userLoginView