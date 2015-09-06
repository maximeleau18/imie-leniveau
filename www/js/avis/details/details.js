'use strict';

angular.module('leniveauApp.avis')
       .controller('DetailsCtrl', ['$rootScope', '$scope', 'apiUrl', '$http', function($rootScope, $scope, apiUrl, $http) {
    
    if($rootScope.qualiteIntervention === undefined){
    	$rootScope.qualiteIntervention = 1;
    	$rootScope.qualitePrix = 1;
    	$rootScope.relationClient = 1;
    	$rootScope.qualiteFinitions = 1;
    	$rootScope.propreteChantier = 1;
    	$rootScope.conseil = 1;
    }
    	   
    $scope.submitAvis = function(){
    	var user = null;
    	var idArtisan = null;
    	var contentType ="application/x-www-form-urlencoded; charset=utf-8";
    	var crit_GEN = $rootScope.rating ? $rootScope.rating : 1;
    	var crit_INT = $rootScope.qualiteIntervention ? $rootScope.qualiteIntervention : 1;
    	var crit_QPRIX = $rootScope.qualitePrix ? $rootScope.qualitePrix : 1;
    	var crit_REL = $rootScope.relationClient ? $rootScope.relationClient : 1;
    	var crit_FIN = $rootScope.qualiteFinitions ? $rootScope.qualiteFinitions : 1;
    	var crit_PROP = $rootScope.propreteChantier ? $rootScope.propreteChantier : 1;
    	var crit_CONS = $rootScope.conseil ? $rootScope.conseil : 1; 
    	var description = $rootScope.description;
    	
    	console.log(HtmlEncode(description));
    	alert("GEN="+ crit_GEN + " INT=" + crit_INT + " QPRIX=" + crit_QPRIX + " REL=" + crit_REL + " FIN=" + crit_FIN + " PROP=" + crit_PROP + " CONS=" + crit_CONS);
    	
    	try {
			user = JSON.parse(sessionStorage.getItem("user"));
		}
		catch (e) {
			console.log('Erreur de parse pour sessionStorage user');
			location.replace("/#/avis");
		}
				
		idArtisan = window.localStorage.getItem("idArtisan");  	
		    	
		alert(user.id + "   " + idArtisan);
		
    	if(window.XDomainRequest) //for IE8,IE9
			contentType = "text/plain";
		// On envoie l'avis sur le professionnel complété par le client au serveur par le biais du WebService
		$.ajax({
			url:"/api/Services/Avis.ashx",
			data:"connect="+user.id+"&proid="+idArtisan+"&avis_titre="+$rootScope.title+
							"&avis_description="+HtmlEncode(description)+
							"&avis_GEN="+crit_GEN+"&avis_INT="+crit_INT+"&avis_QPRIX="+crit_QPRIX+"&avis_REL="+crit_REL+
							"&avis_FIN="+crit_FIN+"&avis_PROP="+crit_PROP+"&avis_CONS="+crit_CONS+"&uploadfiles="+"",
			type:"POST",
			dataType:"json",   
			contentType:contentType,    
			success:function(data)
			{
				if(data.Success == true){
					alert(data.Message);		 
					location.replace("/#/artisan");
				} else {
					// Success = false on affiche le message
					alert(data.Message);
					location.replace("/#/avis");
				}
			},
			error:function(jqXHR, textStatus, errorThrown)
			{
				alert("Un problème est survenu veuillez contacter l'administrateur du site.");
				location.replace("/#/avis");
			}
		});
    }
    
    // Fonction d'encodage du text en HTML
    function HtmlEncode(s)
    {
    	var el = document.createElement("div");
    	el.innerText = el.textContent = s;
    	s = el.innerHTML;
    	return s;
    }
    
}]);