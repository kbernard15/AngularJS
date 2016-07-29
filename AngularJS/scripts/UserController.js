(function () {

    // the controller sets-up the model by attaching to scope
    var UserController = function ($scope, github, $routeParams) {

        var onUserComplete = function (data) {
            $scope.user = data;

            var promise = github.getRepos($scope.user);
            promise.then(onRepose, onError);
        };

        var onRepose = function (data) {
            $scope.user.repos = data;
        };

        var onError = function (reason) {
            $scoope.error = "Could not fectch the data";
        };

        $scope.username = $routeParams.username;
        $scope.repoSortOrder = "-stargazers_count";
        github.getUser($scope.username).then(onUserComplete, onError);

    };

    // create the module
    var app = angular.module("githubViewer");

    // register controller in the module
    app.controller("UserController", ["$scope", "github", "$routeParams", UserController]);

    // tell angular to use the module witn ng-app (in html)

}());