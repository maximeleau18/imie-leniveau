'use strict';

angular.module('leniveauApp.login', [])
       .controller('LoginCtrl', ['$scope', '$state', 'errorsService', '$cookies', 'apiUrl', function($scope, $state, errorsService, $cookies, apiUrl) {

    $scope.loginForm = {
		user_connect_email:'trimoreau.yonn@gmail.com',
		user_connect_pwd1:'pvlyst'
	};
    //console.log(document.cookie);
	$scope.sendLogin = function(loginForm){
		var contentType ="application/x-www-form-urlencoded; charset=utf-8";
    	 
    	if(window.XDomainRequest) //for IE8,IE9
    	    contentType = "text/plain";
    	 
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
        	    			 civility:data.Object[3],
        	    			 firstname:data.Object[1],
        	    			 lastname:data.Object[2],
        	    			 fullname:data.Object[1]+' '+data.Object[2]
        	    	 };
    	    		 localStorage.setItem("user", JSON.stringify(user));
    	    		 $state.go('logged.artisan');
    	    	 }
    	    	 else{
    	    		 alert(data.Message);
    	    	 }
    	     },
    	     error:function(jqXHR, textStatus, errorThrown)
    	     {
    	        alert("Problème de Cross Domain.");
    	     }
    	});
    };
}]);
