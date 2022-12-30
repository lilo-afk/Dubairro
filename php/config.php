<?php
  //VARIÁVEL ARMAZENA A URL DO SEU SITE
  $site = "https://dubairroweb.gq/";
 //DIZ SE O SITE SERÁ RODADO LOCALMENTE OU DE FORMA ONLINE
  $modo = 'local'; 

  //CREDENCIAIS LOCAL (XAMPP)
  if($modo =='local'){
      $hostname = "localhost";
      $username = "root";
      $password = "";
      $dbname = "chat";
      //RECEBE OS VALORES DOS PARAMETROS ACIMA PARA A CONEXÃO 
      $conn = mysqli_connect($hostname, $username, $password, $dbname);
      if(!$conn){ //SE A CONEXÃO FALHAR RETORNA UM ERRO AO USUÁRIO
        echo "Database connection error".mysqli_connect_error();
      }
  }
  
  //CREDENCIAIS PRODUÇÃO (ONLINE)
  if($modo == 'producao'){
      $hostname ="localhost";
      $username = "u978778643_dubairro";
      $password = "Dubairro*2022";
      $dbname = "u978778643_dubairro";
      //RECEBE OS VALORES DOS PARAMETROS ACIMA PARA A CONEXÃO 
      $conn = mysqli_connect($hostname, $username, $password, $dbname);
      if(!$conn){ //SE A CONEXÃO FALHAR RETORNA UM ERRO AO USUÁRIO
        echo "Database connection error".mysqli_connect_error();
      }
  }
//FAZ O TRATAMENTO DA CONEXÃO COM O BANCO DE DADOS
try{
  $pdo = new PDO("mysql:host=$hostname;dbname=$dbname",$username,$password); 
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
  //echo "Banco conectado com sucesso!"; 
}catch(PDOException $erro){ //RETORNA ERRO SE A CONEXÃO FALHAR
   echo "Falha ao se conectar com o banco! ";
}

//FUNÇÃO PARA LIMPAR O POST
function limparPost($dados){
   $dados = trim($dados);
   $dados = stripslashes($dados);
   $dados = htmlspecialchars($dados);
   return $dados;
}

//FUNÇÃO PARA AUTENTICAÇÃO
function auth($tokenSessao){
   global $pdo;
   //VERIFICAR SE TEM AUTORIZAÇÃO
   $sql = $pdo->prepare("SELECT * FROM users WHERE token=? LIMIT 1");
   $sql->execute(array($tokenSessao));
   $usuario = $sql->fetch(PDO::FETCH_ASSOC);
   //SE NÃO ENCONTRAR O USUÁRIO
   if(!$usuario){
       return false;
   }else{
      return $usuario;
   }
}
?>
