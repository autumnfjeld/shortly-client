Shortly.Link = Backbone.Model.extend({

  urlRoot: '/links'

});

// Notes:  urlRoot to enable default url function to generate urls based on model id.  
// ie modelinstance.url() will produce /links/someid