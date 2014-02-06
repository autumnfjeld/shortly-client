Shortly.UserLoginView = Backbone.View.extend({

  className: 'userLogin',

  template: _.template(' <div class="userInput"> \
      <form> \
          username<input class="userinfo" type="text" id="username" name="username"> \
          email <input class="userinfo" type="email" name="email"> \
          password <input class="userinfo" type="password" name="password"> \
          <input type="submit" value="Log in"> \
      </form> \
      <div class="confirm"></div> \
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
  userAuthenticate: function(e){
    e.preventDefault();
    var $username = this.$el.find('form #username')
    console.log('Authenticating', $username );
  }

});
