angular.module('BookTableApp', ['ngMaterial', 'angular-loading-bar', 'ngAnimate', 'ngAria', 'ngResource']);

angular.module('BookTableApp')
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);

angular.module('BookTableApp').config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
    };
});

angular.module('BookTableApp')
    .controller('PagesCtrl', ['$scope', '$location', function($scope, $location) {
        var self = this;

        self.path = $location.path();

        this.today = new Date();

        this.changePage = function(name, param) {
            var l = $location.path(name);
            if (param) {
                l.search(param);
            }
            self.path = $location.path();
        };

        this.goDetails = function(path) {
            return self.changePage(path[0], path[1]);
        };

        this.goStart = function() {
            return self.changePage("menu");
        };

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
