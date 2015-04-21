'use strict';

angular.module('leniveauApp.artisan', [])
       .controller('ArtisanCtrl', ['$scope', 'apiUrl', '$http', 'errorsService', function($scope, apiUrl, $http, errorsService) {

   /*$scope.idArtisan = window.localStorage['artisan'];
   
   if($scope.idArtisan !== undefined){
	   $http.post(apiUrl+'get-artisan', {id:$scope.idArtisan})
	       .success(function(data){
	           $scope.artisan = data;
	           console.log("hello");
	       })
	       .error(function(data, status){ console.log("bye");errorsService.displayError("L'obtention de l'artisan a échouée",data,status); });
   }*/
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
      	    	 console.log(data);
      	    	 if(data.Success == true){
      	    		 var artisan = {
      	    				 id:data.Object[0],
      	    				 address:data.Object[1],
      	    				 name:data.Object[2],
      	    				 activity:data.Object[3]
          	    	 };
      	    		 $scope.idArtisan = artisan.id;
      	    		 $scope.artisan = artisan;
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
}]);
