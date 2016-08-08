// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//angular.module('starter', ['ionic','starter.controllers','service.api'])
angular.module('starter', ['ionic','starter.controllers'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider,$urlRouterProvider){
	
	$stateProvider
	
	.state('app',{
		url: '/app',
		abstract:false,
		templateUrl:'templates/menu.html',
		controller:'AppCtrl'
		
		
	})
	
	/*.state('app.login',{
		
		url: '/login',
		views: {
        'menuContent': {
        templateUrl: 'templates/login.html',
		controller:'loginController'
      }
    }
		
	})*/

	.state('login',{
		
		url: '/login',
		controller:'loginController',
		templateUrl: 'templates/login.html'
		

       
    })

    .state('cadastro',{
		url: '/cadastro',
		cache: false,
		controller:'cadastroController',
        templateUrl: 'templates/cadastro.html'
		
		
	})
	
	/*.state('app.cadastro',{
		url: '/cadastro',
		views: {
        'menuContent': {
        templateUrl: 'templates/cadastro.html',
		controller:'cadastroController'
		}
	}
		
	})*/
	
	.state('app.teste',{
		url: '/teste',
		views: {
        'menuContent': {
        templateUrl: 'templates/teste.html',
		controller:'testeController'
		}
	}
		
	})
	
	.state('app.listarAviso',{
		url: '/listarAviso',
		cache:false,
		views: {
        'menuContent': {
        templateUrl: 'templates/listarAviso.html',
		controller:'listarAvisoController'
		}
	}
		
	})
	
	

	.state('app.filtragemAviso',{
		
		url: '/filtragemAviso',
		views: {
        'menuContent': {
        templateUrl: 'templates/listTeste.html',
			
			controller:'pesquisarAvisoController'
		}
	}
		
	})
	
	
	.state('app.visualizarAviso',{
		url:'/visualizarAviso/:id_informe',
		views: {
        'menuContent': {
        templateUrl: 'templates/visualizarAviso.html',
		controller:'visualizarAvisoController'
		}
	}
		
	
	})
	
	
	.state('app.pesquisarAviso',{
		
		url: '/pesquisarAviso',
		cache:false,
		views: {
        'menuContent': {
			templateUrl: 'templates/pesquisarAviso.html',
			 controller:'pesquisarAvisoController'
		}
	}
		
	})
		
	$urlRouterProvider.otherwise('/login');
	//$urlRouterProvider.otherwise('/app/login');
	
});













