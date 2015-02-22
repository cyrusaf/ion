var app = angular.module('app', [
  'ngRoute',
  'controllers'
]);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'partials/examplePartial.html',
			controller: 'exampleController'
		}).
		otherwise({
			redirectTo: '/'
		});
  	}
]);