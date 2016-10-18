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

angular.module('BookTableApp').factory('$templateCache', ['$cacheFactory', '$http', '$injector', function($cacheFactory, $http, $injector) {
    var cache = $cacheFactory('templates');
    var allTplPromise;

    return {
        get: function(url) {
            var fromCache = cache.get(url);

            // already have required template in the cache
            if (fromCache) {
                return fromCache;
            }

            // first template request ever - get the all tpl file
            if (!allTplPromise) {
                allTplPromise = $http.get('views/main.html').then(function(response) {
                    // compile the response, which will put stuff into the cache
                    $injector.get('$compile')(response.data);
                    return response;
                });
            }

            // return the all-tpl promise to all template requests
            return allTplPromise.then(function(response) {
                return {
                    status: response.status,
                    data: cache.get(url),
                    headers: response.headers
                };
            }).catch(function() {
                return $http.get(url).then(function(response) {
                    $injector.get('$compile')(response.data);
                    return response;
                });
            });

        },

        put: function(key, value) {
            cache.put(key, value);
        }
    };
}]);

angular.module('BookTableApp')
    .controller('PagesCtrl', ['$rootScope', '$location', function($rootScope, $location) {
      var self = this;

      this.page = {};
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
          self.page.path = $location.path();
          self.page.params = $location.search();
          self.currentTpl = '/views' + self.page.path + '.html';
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
