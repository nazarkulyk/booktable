angular.module('BookTableApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate', 'ngAria', 'ngResource']);

angular.module('BookTableApp')
  .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);

angular.module('BookTableApp')
    .controller('TestCtrl', ['$scope', '$resource', function($scope, $resource) {
        $scope.title = 'Список';
        $scope.today = new Date();

        var menus = $resource('data/menu.json', null, {
          query: {
            method: 'GET',
            isArray: true
          }
        }).query().$promise;

        menus.then(function(data) {
          $scope.menus = data;
        });

/*
        _.times(4, function(index) {
            todos.push({
                //face: imagePath,
                what: "Brunch this weekend?",
                who: "Min Li Chan",
                notes: "I'll be in your neighborhood doing errands."
            });
        });
        $scope.todos = todos;
        */
    }]);
