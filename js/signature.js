/*
 * https://github.com/legalthings/signature-pad-angular
 * Copyright (c) 2015 ; Licensed MIT
 */

angular.module('signature', []);

angular.module('signature').directive('signaturePad', ['$window', '$timeout',
  function ($window, $timeout) {
    'use strict';

    var signaturePad, element, EMPTY_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA=';
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="signature" style="width: 100%; max-width:{{width}}px"><canvas ng-mouseup="onMouseup()" ng-mousedown="notifyDrawing({ drawing: true })"></canvas></div>',
      scope: {
        accept: '=',
        clear: '=',
        dataurl: '=',
        height: '@',
        width: '@',
        notifyDrawing: '&onDrawing',
      },
      controller: [
        '$scope',
        function ($scope) {
          $scope.accept = function () {
            var signature = {};

            if (!$scope.signaturePad.isEmpty()) {
              signature.isEmpty = false;
            } else {
              signature.dataUrl = EMPTY_IMAGE;
              signature.isEmpty = true;
            }

            return signature;
          };

          $scope.onMouseup = function () {
            $scope.updateModel();

            // notify that drawing has ended
            $scope.notifyDrawing({ drawing: false });
          };

          $scope.updateModel = function () {
            /*
             defer handling mouseup event until $scope.signaturePad handles
             first the same event
             */
            $timeout()
              .then(function () {
                var result = $scope.accept();
                $scope.dataurl = result.isEmpty ? undefined : result.dataUrl;
              });
          };

          $scope.clear = function () {
            $scope.signaturePad.clear();
            $scope.dataurl = undefined;
          };

          $scope.$watch("dataurl", function (dataUrl) {
            if (dataUrl) {
              $scope.signaturePad.fromDataURL(dataUrl);
            }
          });
        }
      ],
      link: function (scope, element, attrs) {
        var canvas = element.find('canvas')[0];
        var parent = canvas.parentElement;
        var ctx = canvas.getContext('2d');

        var width = parseInt(scope.width, 10);
        var height = parseInt(scope.height, 10);
        var aspectRatio = height / width;

        canvas.width = width;
        canvas.height = height;
        
        //Resize to fix UI Bootstrap Modal Show problem
        $timeout(function(){
            canvas.width = attrs.width;
            canvas.height = attrs.height; 
        }, 500);
        
        scope.signaturePad = new SignaturePad(canvas);

        if (scope.signature && !scope.signature.$isEmpty && scope.signature.dataUrl) {
          scope.signaturePad.fromDataURL(scope.signature.dataUrl);
        }

        var calculateScale = function () {
          // calculate parent Width;
          var parentWidth = parent.offsetWidth;
          if (parentWidth < width) {
            // Calculate aspect ratio
            var newWidth = parentWidth;
            var newHeight = newWidth * aspectRatio;
            canvas.style.height = newHeight + "px";
            canvas.style.width = newWidth + "px";

            // Calculate scale
            var scale =  width / newWidth;
            ctx.resetTransform();
            ctx.scale(scale, scale);
          }
        }

        angular.element($window).bind('resize', calculateScale);
        scope.$on('$destroy', function () {
          angular.element($window).unbind('resize', calculateScale);
        });

        calculateScale();
        
        element.on('touchstart', onTouchstart);

        element.on('touchend', onTouchend);

        function onTouchstart() {
          scope.$apply(function () {
            // notify that drawing has started
            scope.notifyDrawing({ drawing: true });
          });
        }

        function onTouchend() {
          scope.$apply(function () {
            // updateModel
            scope.updateModel();

            // notify that drawing has ended
            scope.notifyDrawing({ drawing: false });
          });
        }
      }
    };
  }
]);

// Backward compatibility
angular.module('ngSignaturePad', ['signature']);
