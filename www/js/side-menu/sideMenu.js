'use strict';

angular.module('leniveauApp.sideMenu', [])
       .controller('SideMenuCtrl', ['$scope', '$state', 'errorsService', '$ionicSideMenuDelegate', function($scope, $state, errorsService, $ionicSideMenuDelegate) {
    
    $scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.avis = function() { $state.go('logged.avis.commentaire'); };
    $scope.artisan = function() { $state.go('logged.artisan'); };
}]);
