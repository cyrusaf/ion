var controllers = angular.module('controllers', []);

controllers.controller('exampleController', ['$scope', '$http', function ($scope, $http) {

	$scope.example = "Hello World!";

	console.log(1);

}]);