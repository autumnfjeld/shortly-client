Shortly.Users = Backbone.Collection.extend({

  model: Shortly.User,
  url: '/users'
  
});

/*
url       model.url() 
Returns the relative URL where the model's resource would be located on the server. If your models are located somewhere else, override this method with the correct logic. Generates URLs of the form: "[collection.url]/[id]" by default, but you may override by specifying an explicit urlRoot if the model's collection shouldn't be taken into account.

Delegates to Collection#url to generate the URL, so make sure that you have it defined, or a urlRoot property, if all models of this class share a common root URL. A model with an id of 101, stored in a Backbone.Collection with a url of "/documents/7/notes", would have this URL: "/documents/7/notes/101"


urlRoot      model.urlRoot or model.urlRoot() 
Specify a urlRoot if you're using a model outside of a collection, to enable the default url function to generate URLs based on the model id. "[urlRoot]/id"
Normally, you won't need to define this. Note that urlRoot may also be a function.

var Book = Backbone.Model.extend({urlRoot : '/books'});

var solaris = new Book({id: "1083-lem-solaris"});

alert(solaris.url());
*/
