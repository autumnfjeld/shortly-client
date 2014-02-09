var shortly = angular.module('Shortly', ['ngRoute']);

shortly.config(function($routeProvider){//, $locationProvider) {
  // $locationProvider.html5Mode(true);

  $routeProvider
    // route for the links page
    .when('/', {
      templateUrl : 'client/links.html',
      controller  : 'LinksController'
    })
    // route for the about page
    .when('/shorten', { // shorten
      templateUrl : 'client/shorten.html',
      controller  : 'ShortenController'
    })

    .when('/login',{
      templateUrl : 'client/login.html',
      controller : 'LoginController'
    })
    .when('/signup',{
      templateUrl : 'client/signup.html',
      controller : 'SignupController'
    })
    //TODO
    .otherwise({
      redirectTo: '/'
    })
});

shortly.run(function($rootScope, $location, UserService) {
  $rootScope.$on('$routeChangeStart', function(evt, curr, prev) {
    if (!UserService.getCurrentUser()) {
      $location.path("/login");
    }
    console.log("evt", curr.$$route);
  });
});

shortly.service('UserService', function(){
  var currentUser = null;
  this.getCurrentUser = function(){return currentUser};
  this.setCurrentUser = function(user){currentUser = user};
});

shortly.controller('LogoutController', function($scope, $location, UserService){
  $scope.logout = function(){
    UserService.setCurrentUser(null);
    $location.path('/login');
  };
});

shortly.service('AuthService', function($http, $location, $q, UserService){
  this.authenticate = function(username, password){
    console.log('verifying');
    return $http({
      method : 'GET',
      url : '/users',
      params : {user_id : username,
                password : password}
    })
    .then(function(data){
      UserService.setCurrentUser(username);
      $location.path('/');
      return data;
    }).catch(function(data){
      console.log('catch:',data);
      $location.path('/signup');
    });
  };
  // this.checkAuthentication =  function() {
  //     var deferred = $q.defer();

  //     if (!isAuthenticated) {
  //        $location.path('/login');
  //     }
  //     deferred.resolve();
  //     return deferred.promise;
  //   }
});

shortly.controller('LoginController', function($scope, AuthService) {
  $scope.authenticate = function() {
    AuthService.authenticate($scope.username, $scope.password);
  };
});

shortly.controller('SignupController', function($scope, UserService){
  $scope.createUserAccount = function(){
    return $http({
      method: "POST",
      url: '/signup',
      params: {
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      }
    })
    .then(function(){
      console.log("CREATED USER!");
    })
    .catch(function(){
      console.log("FAILED TO CREATE");
    });
  };
});


shortly.controller('LinksController', function($scope, $http) {
  $http({
    method : 'GET',
    url : '/links'
  })
  .then(function(obj){
    $scope.links = obj.data;
  });
  $scope.switch = false;
  $scope.toggle = function(){
    return $scope.switch = !$scope.switch;
  };
  // TODO: add update click count logic:
  // $scope.getClicks = function(){
  //   $http({
  //   method : 'GET',
  //   url : '/links'
  // })
  // .then(function(obj){
  //   $scope.links = obj.data;
  // });
  // }
});

shortly.controller('ShortenController', function($scope, $http){
  $scope.spinnerHide = true;
  $scope.infoHide = true;

  $scope.processForm = function(){
    $scope.startSpinner();
    $http({
      method : 'POST',
      url : '/links',
      data : {url : $scope.url}
    }).then(function(obj){
      $scope.stopSpinner();
      $scope.infoHide = false;
      // var view = new Shortly.LinkView( {model: link} );
      // $scope.message = link;
      console.log(obj);
      $scope.link = obj.data
      // this.$el.find('.message').append(view.render().$el.hide().fadeIn());
    }).catch(function(){
      $scope.stopSpinner();
      $scope.message = "Please enter a valid URL";
    });
  };

  $scope.startSpinner =  function(){
    $scope.spinnerHide = false;
    // this.$el.find('form input[type=submit]').attr('disabled', "true");
    // this.$el.find('.message').html("").removeClass('error');
  },

  $scope.stopSpinner = function(){
    $scope.spinnerHide = true;
    // this.$el.find('form input[type=submit]').attr('disabled', null);
    // this.$el.find('.message').html("").removeClass('error');
  }

});


