'use strict';

angular.module('leniveauApp.login', [])
.controller('LoginCtrl', ['$scope', '$state', 'errorsService', '$cookies', 'apiUrl', function($scope, $state, errorsService, $cookies, apiUrl) {
	
//	alert(auth);
//	
//	if (auth !== null){
//		location.replace("/#/artisan");
//	} else {
		location.replace("/#/login");
			$scope.loginForm = {
					user_connect_email:'trimoreau.yonn@gmail.com',
					user_connect_pwd1:'pvlyst'
			};			
			
			$scope.sendLogin = function(loginForm){	
				//alert('user connexion');
				var contentType ="application/x-www-form-urlencoded; charset=utf-8";

				if(window.XDomainRequest) //for IE8,IE9
					contentType = "text/plain";
				// On envoie le formulaire de connexion au serveur par le biais du WebService
				$.ajax({
					url:"/api/Services/Connexion.ashx",
					data:"user_connect_email="+loginForm.user_connect_email+"&user_connect_pwd1="+loginForm.user_connect_pwd1,
					type:"POST",
					dataType:"json",   
					contentType:contentType,    
					success:function(data)
					{
						if(data.Success == true){
							var user = {
									id:data.Object[0],
									firstname:data.Object[1],
									lastname:data.Object[2],
									civility:data.Object[3],
									fullname:data.Object[1]+' '+data.Object[2]
							};
							// On remplit la session par l'utilisateur connecté
							sessionStorage.setItem("user", JSON.stringify(user));
							$state.go('logged.artisan');		 
						} else {
							// Success = false on affiche le message
							alert(data.Message);
							location.replace("/#/login");
						}
					},
					error:function(jqXHR, textStatus, errorThrown)
					{
						alert("Un problème est survenu veuillez contacter l'administrateur du site.");
						location.replace("/#/login");
					}
				});
			};
//		}
}]);
