angular.module('starter.controllers', [])

.controller('loginController', function($scope,$state) {

 $scope.btLogar = function(){
	$state.go('app.listarAviso');
 }
  
 
})


.controller('AppCtrl', function($scope) {
//Area de menu caso tenha alguma interação	
})
	
.controller('listarAvisoController', function($scope,$state){
	
	$scope.btPesquisarAviso = function(){
	  $state.go('app.pesquisarAviso');	
	}
	
});




