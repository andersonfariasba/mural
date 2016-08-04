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

	//Lista area de conhecimento OBS: LEMBRAR DE ALTERAR A URL NA CAP, EM CASA É DIFERENTE O ENDEREÇO
	$http.get('http://localhost/api/api/index.php/listArea').success( function(data) {
	$scope.areas = data;
						
   })
    //final listagem
	
	//Ação de Cadastrar
	$scope.add_new = function(user) {

		//alert('teste');
		var parameter = JSON.stringify(user);
		//console.log(parameter);
		//alert('teste');
		
	//var parameter = JSON.stringify({type:"user", username:user_email, password:user_password});
    //OBS: LEMBRAR DE ALTERAR A URL NA CAP
    $http.post('http://localhost/api/api/index.php/add', parameter).
    success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
               console.log(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
	

	}
	
	$scope.selectAction = function() {
     console.log($scope.myOption);
	};
	
	
})
	
.controller('listarAvisoController', function($scope,$state){
	
	$scope.btPesquisarAviso = function(){
	  $state.go('app.pesquisarAviso');	
	}
	
});




