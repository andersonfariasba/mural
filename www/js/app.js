// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
//var app = angular.module('starter', ['ionic','ngMessages'])

var app = angular.module('starter', ['ionic'])


//configuração api
/*
.config(['$httpProvider', function($httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];  
    }
])
*/
//final configuração

app.config(function($stateProvider,$urlRouterProvider){

//URL DEFAULT
$urlRouterProvider.otherwise('/login');

//ROTA DE LOGIN
$stateProvider
  .state('login', {
    url:'/login',
    controller:'loginCtrl',
    templateUrl:'templates/login.html'
  })

//ROTA DE CADASTRO DE USUÁRIO
  .state('addUser', {
    url:'/addUser',
    controller: 'addUserCtrl',
    templateUrl:'templates/addUser.html' 
  })

  //ROTA VISUALIZAR AVISO PELO ID
  .state('visualizarAviso',{
    url:'/visualizarAviso/:id_informe',
    controller:'visualizarAvisoCtrl',
    templateUrl: 'templates/visualizarAviso.html'
  })

  .state('pesquisarAviso',{
    url:'/pesquisarAviso',
    controller:'pesquisarAvisoCtrl',
    templateUrl:'templates/pesquisarAviso.html'
  })

  //LISTA DE AVISOS
  .state('listarAviso',{
    url:'/listarAviso',
    controller:'listarAvisoCtrl',
    templateUrl: 'templates/listarAviso.html'

  }); 



}) //FINAL CONFIG


//CONTROLLER DE LOGIN
app.controller('loginCtrl',function($scope,$http,$state,$window,$location,$ionicPopup){

  //Evento ao clicar no botao de logar
  $scope.btLogar = function(user){
    var parameter = JSON.stringify(user);
    //console.log(parameter);
    $http.post('https://vellore.com.br/api/api/index.php/login',parameter).success(function(data,status,headers,config){
      //console.log(data);
      $window.localStorage.setItem('id_area', data);
       //Caso o retorno seja maior que zero, está autenticado
       if(data>0){
          $state.go('listarAviso');
          //$location.path('listarAviso');
          //console.log($window.localStorage.getItem('id_area'));
       } else {

        var alert = $ionicPopup.alert({
        
        title: 'Acesso Negado!',
        template: 'Usuário não encontrado!'
        });
        
        alert.then(function(res) {
           $location.path('login');
        });


       }


    });

} //final btLogar

}); //FINAL CONTROLLER LOGIN


//LISTA OS AVISOS POR AREA DO ALUNO, BASEADO NO LOGIN
app.controller('listarAvisoCtrl',function($scope,$state,$http,$window,$location){

  var id_area = $window.localStorage.getItem('id_area');
  $http.get('https://vellore.com.br/api/api/index.php/getInformeAluno?id_area='+id_area).
  success(function(data){
    $scope.informes = data;
  });

});

//VISUALIZAR AVISO
app.controller('visualizarAvisoCtrl',function($scope,$state,$http){
  var id_informe = $state.params.id_informe;

  $http.get('https://vellore.com.br/api/api/index.php/detalheInforme?id_informe='+id_informe).success(function(data){
    $scope.informes = data;
  }); 

});


//FILTRAR AVISO
app.controller('pesquisarAvisoCtrl',function($scope,$state,$http){

  $http.get('https://vellore.com.br/api/api/index.php/listArea').
    success(function(data){
      $scope.areas = data;
    })

    $scope.data = {};
    $scope.submit = function(){
      var parameter = JSON.stringify($scope.data);
      $http.post('http://vellore.com.br/api/api/index.php/pesquisarAviso',parameter).
      success(function(data,status,headers,config){
        $scope.informes = data;
      });


    }


});


//CONTROLLER DE CADASTRAR USUÁRIO
app.controller('addUserCtrl',function($scope,$http,$state,$window,$ionicPopup,$location){

   //LISTA AREAS DE ENSINO
  $http.get('https://vellore.com.br/api/api/index.php/listArea').success(function(data){
    $scope.areas = data;
    console.log(data);
  });

  //MOSTRAR RADIO DE AREAS
  $scope.showPopup = function(user) {
    $scope.data = {};
  $ionicPopup.show({
    templateUrl: 'templates/areas_ensino.html',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>OK</b>',
        type: 'button-positive',
        onTap: function(e) {
          //console.log(user.id_area);
        }
      }
    ]
  });
  }
  //FINAL AREAS DE RADIOS



  //EVENTO AO CLICAR NO BOTÃO
  $scope.add_new = function(user) {
   var parameter = JSON.stringify(user);
   //console.log(user.login);
    
if(user.login==null){
  var alert = $ionicPopup.alert({
                      title: 'Email Inválido',
                      template: 'E-mail não informado!'
                      });

                      alert.then(function(res) {
                      $location.path('addUser');
                    });
}
  

   $http.post('https://vellore.com.br/api/api/index.php/validarUser',parameter).success(function(retorno,status,headers,config){
       //localStorage.setItem('valor',retorno);
      // $window.localStorage.setItem('codigo', retorno);
      // if($window.localStorage.getItem('codigo')==0){
      
       if(retorno==0){
            //console.log(parameter);
            
            //INICIO CADASTRO

              $http.post('http://vellore.com.br/api/api/index.php/add', parameter).
                  success(function(data, status, headers, config) {

                    var alert = $ionicPopup.alert({
                      title: 'Cadastro com sucesso!',
                      template: 'Seja bem vindo, favor logar!'
                      });

                      alert.then(function(res) {
                      $location.path('login');
                    });
                  
      
                });

            //FINAL CADASTRO
       

       } else{
              var alert = $ionicPopup.alert({
              title: 'Usuário Já existente!',
              template: 'Aluno já possui cadastro!'
              });

              alert.then(function(res) {
              $location.path('login');
            });

       }
       //console.log($window.localStorage.getItem('codigo'));


   }); //final valida usar
    
    

  } //FINAL ADD



}) //FINAL CONTROLLER CADASTRO DE USER


//ULTIMA OPERAÇÃO  NÃO INSERIR PONTO E VIRGULA


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
