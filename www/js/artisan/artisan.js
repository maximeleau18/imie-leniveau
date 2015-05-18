'use strict';

angular.module('leniveauApp.artisan', [])
.controller('ArtisanCtrl', ['$scope', '$state', 'apiUrl', '$http', 'errorsService', 'auth', function($scope, $state, apiUrl, $http, errorsService, auth) {

		alert(auth);
		if (auth !== null){
			// L'utilisateur est bien connecté
			var contentType ="application/x-www-form-urlencoded; charset=utf-8";

			alert(window.localStorage.getItem("idArtisan"));
			
			if(window.XDomainRequest) //for IE8,IE9
				contentType = "text/plain";
			// On envoie la requête au serveur de façon à afficher le professionnel recherché
			$.ajax({
				url:"/api/Services/RecherchePro.ashx",
				data:"action=searchpro"+"&q="+window.localStorage.getItem("idArtisan"),
				type:"GET",
				dataType:"json",   
				contentType:contentType,    
				success:function(data)
				{
					if(data.Success == true){
						var artisan = {
								id:data.Object[0],
								adresse:data.Object[1],
								adresseComp:data.Object[2],
								codePostal:data.Object[3],
								ville:data.Object[4],
								nom:data.Object[5],
								activite:data.Object[6],
								urlSite:data.Object[7],
								telFixe:data.Object[8],
								telPort:data.Object[9],
								pathLogo:"/api"+data.Object[10],
								avisLeNiveau:data.Object[11],
								avisClients:data.Object[12]
						};
						$scope.idArtisan = artisan.id;
						$scope.artisan = artisan;
						$("#avisLeNiveau").html($scope.artisan.avisLeNiveau);
					}
					else{
						alert("Aucun professionnel trouvé.");
						location.replace("/#/artisan");
					}
				},
				error:function(jqXHR, textStatus, errorThrown)
				{
					alert("Un problème est survenu veuillez contacter l'administrateur du site.");
					location.replace("/#/artisan");
				}
			});
		} else {	
			// L'utilisateur n'est pas connecté on redirige vers la page de login
			alert('user null');
			location.replace("/#/login");
		}
}]);
