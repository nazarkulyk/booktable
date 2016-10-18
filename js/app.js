angular.module('BookTableApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate', 'ngAria', 'ngResource']);

angular.module('BookTableApp')
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

/* TODO: use this with moment js lib */
/*
angular.module('BookTableApp')
    .config(function($mdDateLocaleProvider) {
        $mdDateLocaleProvider.formatDate = function(date) {
            return moment(date).format('YYYY-MM-DD');
        };
    });
*/

angular.module('BookTableApp')
    .controller('PagesCtrl', ['$rootScope', '$location', function($rootScope, $location) {
        var self = this;

        this.today = new Date();

        this.changePage = function(name, param) {
            var l = $location.path(name);
            if (param) {
                l.search(param);
            }
        };

        this.goDetails = function(path) {
            return self.changePage(path[0], path[1]);
        };

        this.goStart = function() {
            return self.changePage("menu");
        };

        $rootScope.$on('$locationChangeSuccess', function(event) {
            console.log(event);
            self.path = $location.url();
            self.params = $location.search();
        });

        _.isEmpty(this.path) && this.goStart();
    }]);

angular.module('BookTableApp')
    .controller('MenuCtrl', ['$scope', '$resource', '$window', function($scope, $resource, $window) {
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
