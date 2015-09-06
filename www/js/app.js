'use strict';

angular.module('leniveauApp', 
	[
     	'ionic',
     	'ngCookies',
     	'ngMockE2E',
     	'leniveauApp.qrCode',
        'leniveauApp.manageErrors',
        'leniveauApp.login',
        'leniveauApp.signup',
        'leniveauApp.forgotPass',
        'leniveauApp.sideMenu',
        'leniveauApp.artisan',
        'leniveauApp.avis'
    ])

.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
}])


//Setting API's url globally
.constant('apiUrl','/api')

//Configure the app
.config(['$stateProvider', '$urlRouterProvider', 'apiUrl', '$ionicConfigProvider', function($stateProvider, $urlRouterProvider, apiUrl, $ionicConfigProvider) {
	
	function isLoggedUser(){
		if(typeof(Storage)!== "undefined"){
			// Le navigateur supporte le web storage
			if (typeof(sessionStorage.getItem("user")) !== 'undefined' &&  sessionStorage.getItem("user") !== null){
				return sessionStorage.getItem("user");
			} else {
				return null;
			}
		} else {
			alert('Votre navigateur ne supporte pas le WebStorage.');
			return "undefined";
		}	
	}		
	
	//Configure states
	$stateProvider
	.state('qrcode', {
		url: '/qrcode/:id',
		controller: 'QrCodeCtrl'
	})
	.state('auth', {
		templateUrl: 'js/auth/auth.html'
	})
	.state('auth.login', {
		url: '/login',         
	    controller: 'LoginCtrl',
	    templateUrl: 'js/auth/login.html',
		resolve: {
			auth: isLoggedUser
		}
	})
	.state('auth.signup', {
		url: '/signup',
		templateUrl: 'js/auth/signup.html',
		controller: 'SignupCtrl'
	})
	.state('auth.forgotpass', {
		url: '/forgot-pass',
		templateUrl: 'js/auth/forgotPass.html',
		controller: 'ForgotPassCtrl'
	})
		//This is where security accessing logged pages happens
	.state('logged', {
		abstract: true,
		templateUrl: 'js/side-menu/sideMenu.html',
		controller: 'SideMenuCtrl',
		resolve: {
			auth: isLoggedUser
		}
	})
	.state('logged.artisan', {
		url: '/artisan',
		templateUrl: 'js/artisan/artisan.html',
		controller: 'ArtisanCtrl',
		resolve: {
			auth: isLoggedUser
		}
	})
	.state('logged.avis', {
      url: '/avis',
      abstract:true,
      templateUrl: 'js/avis/avis.html',
	  controller: 'AvisCtrl'
    })
    .state('logged.avis.commentaire', {
    	url: '/commentaire',
    	views: {
    		'commentaireContent': {
    			templateUrl: 'js/avis/commentaire/commentaire.html',
            	controller:'CommentaireCtrl'
    		}
    	}
    })
    .state('logged.avis.details', {
    	url: '/details',
    	views: {
    		'detailsContent': {
    			templateUrl: 'js/avis/details/details.html',
    	    	controller: 'DetailsCtrl'
    		}
    	}
    });

	//Redirect to home if wrong url entry point
	$urlRouterProvider.otherwise('/qrcode/9');
	
	//Set default view config
	$ionicConfigProvider.tabs.position('bottom');
	$ionicConfigProvider.views.transition('ios');
	$ionicConfigProvider.backButton.icon('ion-arrow-left-c');
	$ionicConfigProvider.navBar.alignTitle('center');
}]);
