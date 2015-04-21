'use strict';

angular.module('leniveauApp.sideMenu', [])
       .controller('SideMenuCtrl', ['$scope', '$state', 'errorsService', '$ionicSideMenuDelegate', function($scope, $state, errorsService, $ionicSideMenuDelegate) {
    
    	var strUser = localStorage.getItem("user");
       	var valUser = {};
           try {
             valUser = strUser ? JSON.parse(strUser) : {};
           }
           catch (e) {
             console.log('Erreur de parse pour localStorage user');
           }
    	   $scope.user = valUser;
    	   
    $scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
    };
    
    $scope.logout = function(){
    	var contentType ="application/x-www-form-urlencoded; charset=utf-8";
   	 
    	if(window.XDomainRequest) //for IE8,IE9
    	    contentType = "text/plain";
    	 
		 $.ajax({
    	     url:"/api/Services/Deconnexion.ashx",
    	     type:"POST",
    	     dataType:"json",   
    	     contentType:contentType,    
    	     success:function(data)
    	     {
    	    	 if(data.Success == true){
    	    		 //alert('Au Revoir ' + valUser.fullname);
    	    		 localStorage.setItem("user", null);
    	    		 $state.go('auth.login');
    	    	 }
    	    	 else{
    	    		 localStorage.setItem("user", null);
    	    		 $state.go('auth.login');
    	    	 }
    	     },
    	     error:function(jqXHR, textStatus, errorThrown)
    	     {
    	        alert("Problème de Cross Domain.");
    	        localStorage.setItem("user", null);
	    		$state.go('auth.login');
    	     }
    	});
    }
    
    $scope.avis = function() { $state.go('logged.avis.commentaire'); };
    $scope.artisan = function() { $state.go('logged.artisan'); };
}]);
