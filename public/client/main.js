var shortly = angular.module('Shortly', ['ngRoute']);

shortly.config(function($routeProvider, $locationProvider) {
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
    //TODO
    .otherwise({
      redirectTo: '/'
    });
});

shortly.controller('MainController', function($scope) {
  $scope.message = "Hi from the main container controller";
});

shortly.controller('LinksController', function($scope, $http) {
  $scope.message = 'This is the links controller';
  $http({
    method : 'GET',
    url : '/links'
  })
  .then(function(obj){
    console.log(obj.data);
    $scope.links = obj.data;
  })
});

shortly.controller('ShortenController', function($scope, $http){
  $scope.processForm = function(){
    $http({
      method : 'POST',
      url : '/links',
      data : {url : $scope.url}
    });
  };
});


