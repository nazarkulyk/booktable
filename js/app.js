angular.module('BookTableApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate']);

angular.module('BookTableApp')
    .controller('TestCtrl', ['$scope', function($scope) {
        var todos = [];
        $scope.test = 'Test ' + _.VERSION;
        $scope.title = 'Список';

        _.times(15, function(index) {
            todos.push({
                //face: imagePath,
                what: "Brunch this weekend?",
                who: "Min Li Chan",
                notes: "I'll be in your neighborhood doing errands."
            });
        });
        $scope.todos = todos;
    }]);
