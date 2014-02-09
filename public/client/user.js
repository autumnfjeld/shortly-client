Shortly.User = Backbone.Model.extend({

  urlRoot: '/users',
  defaults : { logged_in : false}

});

// Notes:
// this will be called in userLoginView


/*
var buttonView = {
  label  : 'underscore',
  onClick: function(){ alert('clicked: ' + this.label); },
  onHover: function(){ console.log('hovering: ' + this.label); }
};
_.bindAll(buttonView, 'onClick', 'onHover');
// When the button is clicked, this.label will have the correct value.
jQuery('#underscore_button').bind('click', buttonView.onClick);


bind is:   _.bind(function, object, [*arguments]) 
*/