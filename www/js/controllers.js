angular.module('starter.controllers', [])

.controller('loginController', function($scope,$state) {

 $scope.btLogar = function(){
	$state.go('app.listarAviso');
 }
  
 
})


.controller('AppCtrl', function($scope) {
//Area de menu caso tenha alguma interação	


})


.controller('testeController', function ($scope, Api) {

	Api.getApi().then(function(result){
		console.log(result);
		$scope.areas = result.data;
	})

})


//.controller('testeController', function($scope,$http) {

//console.log("inicio atualizado");

//$scope.areas = [{descricao: 'one', id_area: 30 },{ descricao: 'two', id_area: 27 },{ descricao: 'three', id_area: 50 }];
//console.log(JSON.stringify($scope.areas));

//})




//Controller para cadastro do aluno
.controller('cadastroController',function($scope,$http){

	//Lista area de conhecimento
	$http.get('http://localhost:8080/api_estacio/api/index.php/listArea').success( function(data) {
	$scope.areas = data;
						
   })
	
	//Ação de Cadastrar
	$scope.add_new = function(user) {
		
		alert(user.id_area);
		 
	}
	
	$scope.selectUpdated = function(optionSelected) {
   
    alert(optionSelected);
};
	
	
})
	
.controller('listarAvisoController', function($scope,$state){
	
	$scope.btPesquisarAviso = function(){
	  $state.go('app.pesquisarAviso');	
	}
	
});




