(function () {

    // create the app
    var app = angular.module("githubViewer", ["ngRoute"]);

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"  // this is optional - if here, not needed in view.
            })
            .when("/user/:username", {        // username as parameter
                templateUrl: "user.html",
                controller: "UserController"
            })
            .when("/repo/:username/:reponame", {        // username as parameter
                templateUrl: "repo.html",
                controller: "RepoController"
            })
            .otherwise({ redirectTo: "/main" });
    });

}());