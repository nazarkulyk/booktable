angular.module('BookTableApp', ['ngMaterial']);

angular.module('BookTableApp')
.controller('TestCtrl', ['$scope', function($scope) {
  var todos = [];
  $scope.test = 'Test ' + _.VERSION;
  $scope.title = 'My App Title';

  for (var i = 0; i < 15; i++) {
    todos.push({
      //face: imagePath,
      what: "Brunch this weekend?",
      who: "Min Li Chan",
      notes: "I'll be in your neighborhood doing errands."
    });
  }
  $scope.todos = todos;
}]);
