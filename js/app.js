angular.module('BookTableApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate', 'ngAria', 'ngResource']);

angular.module('BookTableApp')
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

angular.module('BookTableApp')
    .controller('PagesCtrl', ['$scope', '$location', function($scope, $location) {
      var self = this;

      self.path = $location.path();

      this.changePage = function(name) {
        $location.path(name);
        self.path = $location.path();
      };

      this.goDetails = function() {
        return self.changePage("details");
      };

      this.goStart = function() {
        return self.changePage("menu");
      };

      _.isBlank(this.path) || this.goStart();
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
