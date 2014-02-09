var shortly = angular.module('Shortly', ['ngRoute']);
shortly.loggedIn = false;
shortly.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl : 'client/links.html',
      controller  : 'LinksController'
    })
    .when('/shorten', {
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
    .otherwise({
      redirectTo: '/'
    })
});

shortly.run(function($rootScope, $location, UserService) {
  $rootScope.$on('$routeChangeStart', function(evt, curr, prev) {
    console.log(UserService.getCurrentUser());
    if (!UserService.getCurrentUser()) {
      $location.path("/login");
    }
    console.log("evt", curr.$$route);
  });
});

shortly.service('UserService', function(){
  console.log('starting user service');
  this.currentUser = null;
  this.getCurrentUser = function(){return this.currentUser};
  this.setCurrentUser = function(user){this.currentUser = user};
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
      console.log('username: ',username);
      UserService.setCurrentUser(username);
      shortly.loggedIn = true;
      $location.path('/');
      return data;
    }).catch(function(data){
      shortly.loggedIn = false;
      console.log('catch:',data);
      $location.path('/signup');
    });
  };
});

shortly.controller('LogoutController', function($scope, $location, UserService){
  $scope.logout = function(){
    console.log("logout");
    UserService.setCurrentUser(null);
    $location.path('/login');
  };
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
      console.log(obj);
      $scope.link = obj.data
    }).catch(function(){
      $scope.stopSpinner();
      $scope.message = "Please enter a valid URL";
    });
  };
  $scope.startSpinner =  function(){
    $scope.spinnerHide = false;
  },
  $scope.stopSpinner = function(){
    $scope.spinnerHide = true;
  }
});