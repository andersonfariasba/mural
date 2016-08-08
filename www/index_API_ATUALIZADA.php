<?php

require 'Slim/Slim.php';

$app = new Slim();
$app->response()->header('Content-Type', 'application/json');

//Conexao banco de dados
function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="";
	$dbname="estacio";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}


$app->post('/pesquisarAviso','filtroAviso');

//http://localhost/api/api/index.php/list
$app->get('/list','filtroAviso');

//LISTA AREA DE CONHECIMENTO
//http://localhost/api/api/index.php/listArea
$app->get('/listArea','getArea');

//LOGIN
$app->post('/login','logar');

//LOGIN
$app->post('/validarUser','validarUser');

//CADASTRA ALUNO
$app->post('/add','addAluno');


//LISTA AVISOS
$app->get('/getInformeAluno','listarInforme');


//VISUALIZAR INFORME
$app->get('/detalheInforme','visualizarInforme');


//http://localhost/api/api/index.php/teste/3/
//$app->get('/teste/:id/', function($id){
//	echo $id;
//});

//http://localhost/api/api/index.php/listArea
//http://localhost/api/api/index.php/listArea

	

function filtroAviso(){
    
	//http://hostbrasileiro.com.br/api/api/index.php/login
	$request = Slim::getInstance()->request();
	$app = json_decode($request->getBody());

	$db = getConnection();

	//CONSULTA DE TODAS AS QUOTAS CADASTRADAS
    //$id = 5;
	$stmt = $db->prepare("select i.id_informe,i.titulo,i.data_publicacao,i.turno,i.texto,ai.id_area,ar.descricao from area_informe ai 
	inner join informe i on(i.id_informe = ai.id_informe) 
	inner join areas ar on(ai.id_area = ar.id_area)
	where ai.id_area = :id_area order by i.data_publicacao desc");

	

	try {
	
	$db = getConnection();
    
   
    $linha = 0;	
    $id_area = 0;	
	 $stmt->bindParam("id_area",$app->id_area);
	//$stmt->bindParam("senha",$app->senha_entrada);
	$stmt->execute();

	//nova inclusao
     $listQuotaAll = $stmt->fetchAll(PDO::FETCH_OBJ);
     
     	
	$quotasAll = null; 
	foreach($listQuotaAll as $key1 => $value1):
	   //echo $value1->name;
	    $quotasAll[$key1]['id_informe'] = $value1->id_informe;
	    $quotasAll[$key1]['titulo'] = utf8_encode($value1->titulo);
	    $quotasAll[$key1]['texto'] = utf8_encode($value1->texto);
	    $quotasAll[$key1]['descricao'] = utf8_encode($value1->descricao);
	    $quotasAll[$key1]['data_publicacao'] = date('d/m/Y H:i:s', strtotime($value1->data_publicacao));
	endforeach;


	
	$db = null;

	//$listQuotaAll = $stmt->fetchAll(PDO::FETCH_OBJ);
	//echo $stmt->rowCount();

	echo json_encode($quotasAll);
		
}

//echo json_encode($wine);
 catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}';
}

	
}


function validarUser(){
	//http://hostbrasileiro.com.br/api/api/index.php/login
	$request = Slim::getInstance()->request();
	$app = json_decode($request->getBody());

	$db = getConnection();

	//CONSULTA DE TODAS AS QUOTAS CADASTRADAS
	//$stmt = $db->prepare("SELECT * FROM aluno WHERE login=:login and senha=:senha");
	$stmt = $db->prepare("select a.login,a.senha,aa.id_area from aluno a inner join area_aluno aa on (a.id_aluno = aa.id_aluno) WHERE login=:login");

	

	try {
	
	$db = getConnection();
    
   // $t1 = "ana";
    //$t2 = "45678";
    $linha = 0;	
    $id_area = 0;	
	$stmt->bindParam("login",$app->login);
	
	$stmt->execute();

	//nova inclusao
     $listUser = $stmt->fetchAll(PDO::FETCH_OBJ);
     
     foreach($listUser as $key1 => $dados):
	   //echo $value1->name;
	    $id_area = $dados->id_area;
	  
	endforeach;
	//final


	
	$db = null;

	//$listQuotaAll = $stmt->fetchAll(PDO::FETCH_OBJ);
	//echo $stmt->rowCount();

	echo $id_area;
		
}

//echo json_encode($wine);
 catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}';
}


}





function getArea(){

	//CONSULTA DE TODAS AS AREA, MENOS A AREA "TODAS" QUE UMA FLAG INTERNA
$quotas_all = "SELECT * FROM areas where id_area not in(1)";

try {
	
	$db = getConnection();
	//Todas as quotas das operadoas

	$stmt = $db->prepare($quotas_all);
	//$stmt->bindParam("id", $id);
	$stmt->execute();
	$listQuotaAll = $stmt->fetchAll(PDO::FETCH_OBJ);
	
	$db = null;
  //CRIA UM NOVO ARRAY DAS 
   foreach($listQuotaAll as $key1 => $value1):
	   //echo $value1->name;
	    $quotasAll[$key1]['id_area'] = $value1->id_area;
	    $quotasAll[$key1]['descricao'] = utf8_encode($value1->descricao);
	    
	endforeach;

	       //print_r($quotasAll);
	
	echo json_encode($quotasAll);
}


//echo json_encode($wine);
 catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}';
}
	
	
	
}



function logar(){
	//http://hostbrasileiro.com.br/api/api/index.php/login
	$request = Slim::getInstance()->request();
	$app = json_decode($request->getBody());

	$db = getConnection();

	//CONSULTA DE TODAS AS QUOTAS CADASTRADAS
	//$stmt = $db->prepare("SELECT * FROM aluno WHERE login=:login and senha=:senha");
	$stmt = $db->prepare("select a.login,a.senha,aa.id_area from aluno a inner join area_aluno aa on (a.id_aluno = aa.id_aluno) WHERE login=:login and senha=:senha");

	

	try {
	
	$db = getConnection();
    
   // $t1 = "ana";
    //$t2 = "45678";
    $linha = 0;	
    $id_area = 0;	
	$stmt->bindParam("login",$app->login_entrada);
	$stmt->bindParam("senha",$app->senha_entrada);
	$stmt->execute();

	//nova inclusao
     $listUser = $stmt->fetchAll(PDO::FETCH_OBJ);
     
     foreach($listUser as $key1 => $dados):
	   //echo $value1->name;
	    $id_area = $dados->id_area;
	  
	endforeach;
	//final


	
	$db = null;

	//$listQuotaAll = $stmt->fetchAll(PDO::FETCH_OBJ);
	//echo $stmt->rowCount();

	echo $id_area;
		
}

//echo json_encode($wine);
 catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}';
}


}


//http://hostbrasileiro.com.br/api/api/index.php/add
function addAluno(){

    $request = Slim::getInstance()->request();
	$app = json_decode($request->getBody());

	$db = getConnection();

	//CADASTRA NA TABELA DE ALUNO
	$stmt = $db->prepare("INSERT INTO aluno(login,senha,matricula,status) values(?,?,?,?)");

	try {
	
	//$db = getConnection();
	//criptografia de senha
	//$senha = md5($app->senha);
	$senha = $app->senha;
    //status ativo
	$status = 0;
	
	$stmt->bindParam(1,$app->login);
	$stmt->bindParam(2,$senha);
	$stmt->bindParam(3,$app->matricula);
	$stmt->bindParam(4,$status);
	$stmt->execute();
 
	//CADASTRA NA TABELA ALUNO AREA
	$id_aluno = $db->lastInsertId();
	
	$stmt2 = $db->prepare("INSERT INTO area_aluno(id_aluno,id_area) values(?,?)");
	$stmt2->bindParam(1,$id_aluno);
	$stmt2->bindParam(2,$app->id_area);
	$stmt2->execute();
	
	$db = null;
  	
	//echo json_encode($quotasAll);
}


//echo json_encode($wine);
 catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}';
}

}


function listarInforme(){

	$id = $_REQUEST['id_area'];
	

	$quotas_all = "select i.id_informe,i.titulo,i.data_publicacao,i.turno,i.texto,ai.id_area,ar.descricao from area_informe ai 
	inner join informe i on(i.id_informe = ai.id_informe) 
	inner join areas ar on(ai.id_area = ar.id_area)
	where ai.id_area = {$id} order by i.data_publicacao desc";


try {
	
	$db = getConnection();
	//Todas as quotas das operadoas

	$stmt = $db->prepare($quotas_all);
	//$stmt->bindParam("id", $id);
	$stmt->execute();
	$listQuotaAll = $stmt->fetchAll(PDO::FETCH_OBJ);
	
	$db = null;
		
		
   //CRIA UM NOVO ARRAY DAS QUOTAS COM TODAS AS OPERADOS E ADIÇÃO DA CHAVE QNT QUE RECEBERÁ O VALOR DO ARRAY DAS QUOTAS UTILIZADAS
   foreach($listQuotaAll as $key1 => $value1):
	   //echo $value1->name;
	    $quotasAll[$key1]['id_informe'] = $value1->id_informe;
	    $quotasAll[$key1]['titulo'] = utf8_encode($value1->titulo);
	    $quotasAll[$key1]['texto'] = utf8_encode($value1->texto);
	    $quotasAll[$key1]['descricao'] = utf8_encode($value1->descricao);
	    $quotasAll[$key1]['data_publicacao'] = date('d/m/Y H:i:s', strtotime($value1->data_publicacao));
	endforeach;


	       //print_r($quotasAll);
	if($stmt->rowCount()>0){
    	echo json_encode($quotasAll);
    }else{
    	 echo json_encode(null);
    }




}


//echo json_encode($wine);
 catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}';
}

}


function visualizarInforme(){

	$id = $_REQUEST['id_informe'];
	

	$quotas_all = "select i.id_informe,i.titulo,i.data_publicacao,i.turno,i.texto,ai.id_area,ar.descricao from area_informe ai 
	inner join informe i on(i.id_informe = ai.id_informe) 
	inner join areas ar on(ai.id_area = ar.id_area)
	where i.id_informe = {$id}";


try {
	
	$db = getConnection();
	//Todas as quotas das operadoas

	$stmt = $db->prepare($quotas_all);
	//$stmt->bindParam("id", $id);
	$stmt->execute();
	$listQuotaAll = $stmt->fetchAll(PDO::FETCH_OBJ);
	
	$db = null;
		
		
   //CRIA UM NOVO ARRAY DAS QUOTAS COM TODAS AS OPERADOS E ADIÇÃO DA CHAVE QNT QUE RECEBERÁ O VALOR DO ARRAY DAS QUOTAS UTILIZADAS
   foreach($listQuotaAll as $key1 => $value1):
	   //echo $value1->name;
	    $quotasAll[$key1]['id_informe'] = $value1->id_informe;
	    $quotasAll[$key1]['titulo'] = utf8_encode($value1->titulo);
	    $quotasAll[$key1]['texto'] = utf8_encode($value1->texto);
	    $quotasAll[$key1]['descricao'] = utf8_encode($value1->descricao);
	    $quotasAll[$key1]['data_publicacao'] = date('d/m/Y H:i:s', strtotime($value1->data_publicacao));
	endforeach;


	       //print_r($quotasAll);
	if($stmt->rowCount()>0){
    	echo json_encode($quotasAll);
    }else{
    	 echo json_encode(null);
    }




}


//echo json_encode($wine);
 catch(PDOException $e) {
	echo '{"error":{"text":'. $e->getMessage() .'}}';
}

}



$app->run();




?>
