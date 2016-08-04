angular.module('starter.controllers', [])

.controller('loginController', function($scope,$state,$http) {

 $scope.btLogar = function(user){
	//$state.go('app.listarAviso');
	//var login = user.login_entrada;
	//var senha = user.senha_entrada;
	//alert("Login = "+login+" Senha =  "+senha);
	var parameter = JSON.stringify(user);

	$http.post('http://localhost:8080/api/api/index.php/login', parameter).
    success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
		//$state.go('app.login');
        //console.log(data);
		if(data>0){
			localStorage.setItem('id_area',data);
			$state.go('app.listarAviso');
		}
		
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
 
 
 
 }
  
 
})

.controller('AppCtrl', function($scope) {
//Area de menu caso tenha alguma interação	
})

//.controller('testeController', function ($scope, Api) {

.controller('testeController', function ($scope, $http) {
	
	//alert(localStorage.getItem('id_area'));

    var id_area = localStorage.getItem('id_area');
	//var id_area = 5;
	$http.get('http://localhost:8080/api/api/index.php/getInformeAluno?id_area='+id_area).success(function(data){
		$scope.informes = data;
	})
	
	
	/*Api.getApi().then(function(result){
		console.log(result);
		$scope.areas = result.data;
	})*/

})

//Controller para cadastro do aluno
.controller('cadastroController',function($scope,$state,$http){

	//Lista area de conhecimento OBS: LEMBRAR DE ALTERAR A URL NA CAP, EM CASA É DIFERENTE O ENDEREÇO
	$http.get('http://localhost:8080/api/api/index.php/listArea').success( function(data) {
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
    $http.post('http://localhost:8080/api/api/index.php/add', parameter).
    success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
		//$state.go('app.login');
        //console.log(data);
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
	  
	  $state.go('app.login');
	  
	

	}

	
	$scope.selectAction = function() {
     console.log($scope.myOption);
	};
	
	
})

//Visualizar Aviso
.controller('visualizarAvisoController', function($scope,$state,$http){
	
	var id_informe = $state.params.id_informe;
	
	$http.get('http://localhost:8080/api/api/index.php/detalheInforme?id_informe='+id_informe).success(function(data){
		$scope.informes = data;

	})
	
})

.controller('pesquisarAvisoController',function($scope,$state,$http){
	
	//Lista area de conhecimento OBS: LEMBRAR DE ALTERAR A URL NA CAP, EM CASA É DIFERENTE O ENDEREÇO
	$http.get('http://localhost:8080/api/api/index.php/listArea').success( function(data) {
	$scope.areas = data;
						
   })
	
	$scope.btPesquisarAviso = function(area){
		
		var id_area = area.id_area;
		alert(id_area)
		
	}
	
})



//lisar Aviso	
.controller('listarAvisoController', function($scope,$state,$http){
	//var id_area = 5;
	 var id_area = localStorage.getItem('id_area');
	$http.get('http://localhost:8080/api/api/index.php/getInformeAluno?id_area='+id_area).success(function(data){
		$scope.informes = data;
	})
	
		
	/*$scope.btPesquisarAviso = function(){
	  $state.go('app.pesquisarAviso');	
	}*/

	
});






