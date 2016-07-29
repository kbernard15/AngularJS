(function () {

    // the controller sets-up the model by attaching to scope
    var MainController = function ($scope, $http, $interval, $log) {

        var onUserComplete = function (response) {
            $scope.user = response.data;

            var promise = $http.get($scope.user.repos_url);
            promise.then(onRepose, onError);

        };

        var onRepose = function (response) {
            $scope.user.repos = response.data;
        };

        var onError = function (reason) {
            $scoope.error = "Could not fectch the data";
        };

        var decrementCountdown = function(){
            $scope.countdown -= 1;
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
            $log.info("searcing for " + username);
            var promise = $http.get("https://api.github.com/users/" + username);
            promise.then(onUserComplete, onError);
            if (countdownInterval) {
                $interval.cancel(countdownInterval);
                $scope.countdown = null;
            }
        };

        $scope.username = "angular";
        $scope.message = "GitHub Viewer";
        $scope.repoSortOrder = "-stargazers_count";
        $scope.countdown = 5;
        startCountdown();
    };

    // create the module
    var app = angular.module("gitHubViewer", []);

    // register controller in the module
    app.controller("MainController", ["$scope", "$http", "$interval", "$log", MainController]);

    // tell angular to use the module witn ng-app (in html)

}());