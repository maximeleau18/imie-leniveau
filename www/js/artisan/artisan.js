'use strict';

angular.module('leniveauApp.artisan', [])
       .controller('ArtisanCtrl', ['$scope', 'apiUrl', '$http', 'errorsService', function($scope, apiUrl, $http, errorsService) {

      	var strUser = localStorage.getItem("user");
    	var valUser = {};
        try {
          valUser = strUser ? JSON.parse(strUser) : {};
        }
        catch (e) {
          console.log('Erreur de parse pour localStorage user');
        }
    	if (valUser != null){
    	   
	    	var contentType ="application/x-www-form-urlencoded; charset=utf-8";
	      	 
	       	if(window.XDomainRequest) //for IE8,IE9
	       	    contentType = "text/plain";
	    	   
	    	   $.ajax({
	      	     url:"/api/Services/RecherchePro.ashx",
	      	     data:"action=searchpro"+"&q=4",
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
	      	    	 }
	      	     },
	      	     error:function(jqXHR, textStatus, errorThrown)
	      	     {
	      	        alert("Problème de Cross Domain.");
	      	     }
	      	});
    	}
}]);
