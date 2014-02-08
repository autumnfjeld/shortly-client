var shortly = angular.module('Shortly', ['ngRoute']);

shortly.run(function($rootScope) {
  $rootScope.name = "Ari Lerner";
});

shortly.config(function($routeProvider) {
  $routeProvider
    // route for the links page
    .when('/', {
      templateUrl : 'client/links.html',
      controller  : 'LinksController'
    })

    // route for the about page
    .when('/shorten', {
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
    $scope.links = obj.links;
  })
});

shortly.controller('ShortenController', function($scope){
  $scope.message ="Got to ShortenController";
});


