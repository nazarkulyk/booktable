angular.module('BookTableApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate', 'ngAria', 'ngResource']);

angular.module('BookTableApp')
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

angular.module('BookTableApp')
    .controller('PagesCtrl', ['$scope', function($scope) {

      $scope.changePage = function() {
        $scope.page = "details";
      };
      $scope.goStart = function() {
        $scope.page = "menu";
      };

      $scope.goStart();
    }]);

angular.module('BookTableApp')
    .controller('MenuCtrl', ['$scope', '$resource', '$window', function($scope, $resource, $window) {
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

        $scope.redirectToLink = function(link) {
            if (!link) {
                return false;
            }
            $window.open(link, '_blank');
        };
    }]);
