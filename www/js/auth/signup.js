'use strict';

angular.module('leniveauApp.signup', [])
       .controller('SignupCtrl', ['$rootScope', '$scope', '$state', 'errorsService', '$http', 'apiUrl', function($rootScope, $scope, $state, errorsService, $http, apiUrl) {
    
    	   $scope.submitSignup = function(signupForm){
		    	//alert(signupForm.fullname + ' ' + signupForm.email + ' ' + signupForm.password);
    		   // Compléter les champs exigés pour l'application
    		   //user[Typologie],user[RaisonSociale],user[civ],user[last_name],user[first_name],
               //user[email],user[password],user[departement],user[info] 
    		   
			   if (signupForm.user_password !== signupForm.user_password_confirmation){
				   alert('Le mot de passe et sa confirmation doivent être identique');
			   }else{			   
				   //alert("user[Typologie]="+signupForm.user_typologie+"&user[RaisonSociale]="+signupForm.user_raisonsociale+
					//	"&user[civ]="+signupForm.user_civ+"&user[last_name]="+signupForm.user_lastname+"&user[first_name]="
					//	+signupForm.user_firstname+"&user[email]="+signupForm.user_email+
					//			"&user[password]="+signupForm.user_password+"&user[departement]="+signupForm.user_departement+
					//			"&trombifile="+signupForm.files+"&user[info]="+signupForm.user_info);
								
				   var contentType ="application/x-www-form-urlencoded; charset=utf-8";

					if(window.XDomainRequest) //for IE8,IE9
						contentType = "text/plain";
					// On envoie le formulaire de connexion au serveur par le biais du WebService
					$.ajax({
						url:"/api/Services/ValidationInscription.ashx",
						data:"user[Typologie]="+signupForm.user_typologie+"&user[RaisonSociale]="+signupForm.user_raisonsociale+
						"&user[civ]="+signupForm.user_civ+"&user[last_name]="+signupForm.user_lastname+"&user[first_name]="
						+signupForm.user_firstname+"&user[email]="+signupForm.user_email+
								"&user[password]="+signupForm.user_password+"&user[departement]="+signupForm.user_departement+
								"&trombifile="+signupForm.files+"&user[info]="+signupForm.user_info,
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
			   }
			};
    	   
    	   
    	   
//    $scope.submitSignup = function(signupForm){
//    	$http.post(apiUrl+'/auth/sign-up', signupForm)
//    		.success(function(data){
//    			$rootScope.submitLogin({email:signupForm.email, password:signupForm.password})
//    		})
//    		.error(function(data, status){ errorsService.displayError("L'inscription a échoué.", data, status); });
//    };
//    
//    $scope.$on('auth:login-success', function(ev, user){
//        $state.go("logged.avis.commentaire");
//    });
//
//    $scope.$on('auth:login-error', function(ev, data){ errorsService.displayError("La connexion a échouée",data,401); });
}]);