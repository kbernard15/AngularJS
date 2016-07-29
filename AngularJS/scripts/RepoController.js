(function () {

    var RepoController = function ($scope, $routeParams, github) {

        var onRepo = function (data) {
            $scope.repo = data;
        };

        var onError = function (reason) {
            $scope.error = reason;
        }

        var reponame = $routeParams.reponame;
        var username = $routeParams.username;

        github.getRepoDetails(username, reponame)
             .then(onRepo, onError);

    };


    var app = angular.module("githubViewer");
    app.controller("RepoController", ["$scope", "$routeParams", "github", RepoController]);
    

}());