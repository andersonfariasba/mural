angular.module('starter.controllers', [])


.controller('loginController', function($scope,$state,$http,$ionicPopup,$location) {
	
    console.log("entrou no controller");
 $scope.btLogar = function(user){
 	console.log("entrou na acao");

	var caminho = "http://localhost:8080/api/api/index.php/";
	//$state.go('app.listarAviso');
	//var login = user.login_entrada;
	//var senha = user.senha_entrada;
	//alert("Login = "+login+" Senha =  "+senha);
	var parameter = JSON.stringify(user);
	console.log(parameter);

	//$http.post('http://localhost/api/api/index.php/login', parameter).
	$http.post(caminho+"login", parameter).
    success(function(data, status, headers, config) {
       console.log(data);
		if(data>0){
			localStorage.setItem('id_area',data);
			$state.go('app.listarAviso');
		}else{
			
			 var alert = $ionicPopup.alert({
		    title: 'Acesso Negado!',
		    template: 'Usuário não encontrado!'
			});

            alert.then(function(res) {
				$location.path('login');
            	//console.log("acesso existente");
            	//console.log(res);
            	 //e.preventDefault();
         // Custom functionality....
			});
		
		
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
	$http.get('http://localhost/api/api/index.php/getInformeAluno?id_area='+id_area).success(function(data){
		$scope.informes = data;
	})
	
	
	/*Api.getApi().then(function(result){
		console.log(result);
		$scope.areas = result.data;
	})*/

})

//Controller para cadastro do aluno
.controller('cadastroController',function($scope,$ionicHistory,$ionicPopup,$state,$http,$timeout,$location){
	//$state.reload();
	
    $ionicHistory.clearHistory();
	
	localStorage.setItem('testeVar',100);
	console.log(localStorage.getItem('testeVar'));
	
	
    var caminho = "http://localhost:8080/api/api/index.php/";
	//Lista area de conhecimento OBS: LEMBRAR DE ALTERAR A URL NA CAP, EM CASA É DIFERENTE O ENDEREÇO
	$http.get(caminho+'listArea').success( function(data) {
	$scope.areas = data;
						
   })
    //final listagem

  	
	//Ação de Cadastrar
	$scope.add_new = function(user) {
		
		console.log(localStorage.getItem('testeVar'));
		
        //alert('teste');
		var parameter = JSON.stringify(user);
		//alert(parameter);
		//console.log(parameter);
		//alert('teste');
		
		//VERIFICA SE O USUÁRIO JÁ EXISTE
	    var caminho = "http://localhost:8080/api/api/index.php/";
		$http.post(caminho+'validarUser', parameter).
        success(function(datax, status, headers, config) {
		
		localStorage.setItem('codigo_user',datax);
		
		console.log("RETORNO DATA VALIDAÇÃO DATA =  "+localStorage.getItem('codigo_user'));
		console.log("RETORNO DATA VALIDAÇÃO DATAX =  "+localStorage.getItem('codigo_user'));
		
		//console.log("INICIO:"+localStorage.getItem('codigo_user'));
       
		
		if(datax>0){
			console.log("IF USUÁRIO EXISTENTE, VALOR DO DATA = "+datax)
				
			             
            var alert = $ionicPopup.alert({
		    title: 'Usuário Já existente!',
		    template: 'Aluno já possui cadastro!'
			});

            alert.then(function(res) {
				$location.path('login');
            	//console.log("acesso existente");
            	//console.log(res);
            	 //e.preventDefault();
         // Custom functionality....
			});
			
	     // $location.path('login');
	      //$state.go('login');
				 
		}
		
      }).
      
	  error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
		
		//FINAL VERIFICAÇÃO USER LOGIN
	console.log(localStorage.getItem('testeVar'));	
	console.log("VALOR SESSÃO = "+localStorage.getItem('codigo_user'));
	//console.log("ENTRADA DO ADD:"+localStorage.getItem('codigo_user'));
	if(localStorage.getItem('codigo_user')==0){	
	
	//var parameter = JSON.stringify({type:"user", username:user_email, password:user_password});
    //OBS: LEMBRAR DE ALTERAR A URL NA CAP
    var caminho = "http://localhost:8080/api/api/index.php/";
	$http.post(caminho+'add', parameter).
    success(function(data, status, headers, config) {
		console.log("sucesso");
      
      }).
      error(function(data, status, headers, config) {
       console.log("erro");
      });
	  
	  
	  console.log("alert");
      $ionicPopup.alert({
		title: 'Cadastro confirmado!',
		template: 'Bem vindo, favor logar'
      });
	
	
	}
	  
	  $ionicHistory.clearHistory();
	  $location.path('login');
	  //$state.go('login');
	
			   
}
	
	$scope.selectAction = function() {
     console.log($scope.myOption);
	};
	
	
		
})

//Visualizar Aviso
.controller('visualizarAvisoController', function($scope,$state,$http){
	var caminho = "http://localhost:8080/api/api/index.php/";
	var id_informe = $state.params.id_informe;
	
	$http.get(caminho+'detalheInforme?id_informe='+id_informe).success(function(data){
		$scope.informes = data;

	})
	
})

.controller('pesquisarAvisoController',function($scope,$state,$http){

	 $scope.guardarValor = function() {
	 $scope.PreferredLanguage = this.PreferredLanguage;
	 };


	//Lista area de conhecimento OBS: LEMBRAR DE ALTERAR A URL NA CAP, EM CASA É DIFERENTE O ENDEREÇO
	var caminho = "http://localhost:8080/api/api/index.php/";
	$http.get(caminho+'listArea').success( function(data) {
	$scope.areas = data;
	})
   
   $scope.data = {};
    
	
   
    $scope.submit = function(){
		//alert($scope.data.id_area);
		//console.log(JSON.stringify($scope.data));
		var data_pesquisa = $scope.data.data;
		var id_area = $scope.data.id_area;
		
		var parameter = JSON.stringify($scope.data);
		
		console.log(parameter);
		
		var caminho = "http://localhost:8080/api/api/index.php/";
		$http.post(caminho+'pesquisarAviso', parameter).
        success(function(data, status, headers, config) {
       
		//if(data>0){
			//localStorage.setItem('id_area',data);
			//$state.go('app.filtragemAviso');
			console.log(data);
			$scope.informes = data;
		//}
		
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });
		
	} //final submit botão
	
	
	
})


//lisar Aviso	
.controller('listarAvisoController', function($scope,$state,$http){
	//var id_area = 5;
	var id_area = localStorage.getItem('id_area');
	var caminho = "http://localhost:8080/api/api/index.php/";
	$http.get(caminho+'getInformeAluno?id_area='+id_area).success(function(data){
		$scope.informes = data;
	})
	
		
	$scope.btPesquisarAviso = function(){
	  $state.go('app.pesquisarAviso');	
	}

	
});






