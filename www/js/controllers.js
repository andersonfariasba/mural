angular.module('starter.controllers', [])


.controller('loginController', function($scope,$state) {
  //alert('teste');
 // $scope.nome = 'Teste!'
 
 //exemplo de ação ao botão
 $scope.btCadastrar = function(){
	$state.go('cadastro');
 }
  
});



