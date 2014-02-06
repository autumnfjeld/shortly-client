Shortly.UserLoginView = Backbone.View.extend({

  className: 'userLogin',

  template: _.template(' <div class="userInput"> \
      <form id="userdata"> \
          username<input class="userinfo" type="text" id="username" name="username"> \
          email <input class="userinfo" type="email" id="email" name="email"> \
          password <input class="userinfo" type="password" id="password" name="password"> \
          <input type="submit" value="Log in"> \
      </form> \
      <div class="confirm"></div> \
    </div>'
  ),

  events: {
    "submit.userdata" : "getUserData"
  },

  render: function() {
    this.$el.html( this.template() );
    return this;
  },      

  getUserData: function(e){
    e.preventDefault();
    //TODO:  check out jquery.serializeobject to serialize an html form
      //var data = JSON.stringify($('#userdata').serializeObject());
    var user = new Shortly.User( {
      username  : $('#username').val(),
      email     : $('#email').val(),
      password  : $('#password').val()
     });
    console.log(user.attributes);
  },

  userAuthenticate: function(e){
    e.preventDefault();
    var $username = this.$el.find('form #username')
    console.log('Authenticating', $username );
  }

});





/** Notes
* this.$el is a jquery object!  .find is jquery method
* can also use dirct access with $('#email').val()), think this works
* because it is unique id, no possible conflict elsewhere.....
* getUserData creates an instance of the User model, which will then
* sync with the database

**/