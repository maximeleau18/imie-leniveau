'use strict';

angular.module('leniveauApp.forgotPass', [])
       .controller('ForgotPassCtrl', ['$scope', function($scope){
			
			$scope.submitForgotPass = function(forgotpassForm){

		    	alert(forgotpassForm.email);
				var contentType ="application/x-www-form-urlencoded; charset=utf-8";

				if(window.XDomainRequest) //for IE8,IE9
					contentType = "text/plain";
				// On envoie le formulaire de connexion au serveur par le biais du WebService
				$.ajax({
					url:"/api/Services/PertePassword.ashx",
					data:"user_pertepwd[email]="+forgotpassForm.email,
					type:"POST",
					dataType:"json",   
					contentType:contentType,    
					success:function(data)
					{
						if(data.Success == true){
							alert(data.Message);
							location.replace("/#/login");		 
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
}]);
