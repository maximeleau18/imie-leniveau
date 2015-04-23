'use strict';

angular.module('leniveauApp.sideMenu', [])
.controller('SideMenuCtrl', ['$scope', '$state', 'errorsService', '$ionicSideMenuDelegate', 'auth', function($scope, $state, errorsService, $ionicSideMenuDelegate, auth) {

	if(auth !== null){
			var strUser = sessionStorage.getItem("user");
			var user = {};
			try {
				user = strUser ? JSON.parse(strUser) : {};
			}
			catch (e) {
				console.log('Erreur de parse pour sessionStorage user');
				location.replace("/#/artisan");
			}
			$scope.user = user;
		}

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	};

	$scope.logout = function(){
		if (sessionStorage.getItem("user") !== null){
			// Il y a bien un utilisateur connecté
			var contentType ="application/x-www-form-urlencoded; charset=utf-8";

			if(window.XDomainRequest) //for IE8,IE9
				contentType = "text/plain";

			// On envoie la requête de déconnexion au serveur
			$.ajax({
				url:"/api/Services/Deconnexion.ashx",
				type:"POST",
				dataType:"json",   
				contentType:contentType,    
				success:function(data)
				{
					if(data.Success == true){
						sessionStorage.removeItem("user");
						location.replace("/#/login");
					} else {
						// Même en cas d'erreur on déconnecte l'utilisateur
						sessionStorage.removeItem("user");
						location.replace("/#/login");
					}
				},
				error:function(jqXHR, textStatus, errorThrown)
				{
					alert("Un problème est survenu veuillez contacter l'administrateur du site.");
					sessionStorage.removeItem("user");
					location.replace("/#/login");
				}
			});
		}
	}

	$scope.avis = function() {
		$state.go('logged.avis.commentaire'); 
	}

	$scope.artisan = function() { 
		$state.go('logged.artisan'); 
	}
}]);
