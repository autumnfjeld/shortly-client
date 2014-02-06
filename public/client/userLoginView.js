Shortly.UserLoginView = Backbone.View.extend({

  className: 'userLogin',

    template: _.template(' <div class="userInput"> \
    <form> \
        username: <input id="username" type="text" name="username"> \
        password: <input id="password" type="password" name="password"> \
        <input type="submit" value="Log in"> \
    </form> \
    <img class="spinner" src="/spiffygif_46x46.gif"> \
    <div class="message"></div>

    </div>'
  ),

  events: {
    "submit": "userAuthenticate"
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },
    // will need model for user info
  userAuthenticate: function(){
    

  }

});
