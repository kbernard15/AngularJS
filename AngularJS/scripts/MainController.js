(function () {

    // the controller sets-up the model by attaching to scope
    var MainController = function ($scope, $interval, $location) {

        var decrementCountdown = function(){
            $scope.countdown = $scope.countdown - 1;
            if ($scope.countdown < 1) {
                $scope.search($scope.username);
            }
        }

        var countdownInterval = null;
        var startCountdown = function () {
            //use the interval service
            countdownInterval = $interval(decrementCountdown, 1000, 5);
        }

        // an attribute on $scope
        $scope.search = function (username) {
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
            //
            $location.path("/user/" + username);
        };

        $scope.username = "angular";
        $scope.countdown = 5;
        startCountdown();
    };

    // create the module
    var app = angular.module("githubViewer");

    // register controller in the module
    app.controller("MainController", ["$scope", "$interval", "$location", MainController]);

    // tell angular to use the module witn ng-app (in html)

}());