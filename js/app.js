angular.module('BookTableApp', ['ngMaterial']);

angular.module('BookTableApp')
.controller('TestCtrl', ['$scope', function($scope) {
  $scope.test = 'Test';
}]);
