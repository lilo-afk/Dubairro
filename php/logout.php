<?php
    session_start(); //INICIA A SESSÃO
    if(isset($_SESSION['unique_id'])){ //VERIFICA SE EXISTE A SESSÃO unique_id
        include_once "config.php"; //INCLUI A CONEXÃO COM O BANCO DE DADOS ATRAVÉS DO ARQUIVO config.php
        $logout_id = mysqli_real_escape_string($conn, $_GET['logout_id']); //VARIAVEL ARMAZENA O VALOR DO GET logout_id QUE FOI ATRIBUÍDO A URL
        if(isset($logout_id)){ //VERIFICA SE EXISTE O GET logout_id
            $status = "Offline"; //SE EXISTIR SEU STATUS É OFFLINE
            $sql = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id={$_GET['logout_id']}"); //ATUALIZA NO BANCO A TABELA users AO QUAL O CAMPO status VAI ARMAZENAR O VALOR DA VARIAVEL status ONDE O CAMPO unique_id SEJA IGUAL AO DO GET logout_id, LEMBRANDO QUE O logout_id RECEBEU ANTERIORMENTE O VALOR DO unique_id ATUAL
            if($sql){ //SE A OPERAÇÃO COM O BANCO FOR FEITA
                //FINALIZA E DESTROI A SESSÃO ATUAL E REDIRECIONA O USUÁRIO PARA O login.php
                session_unset(); 
                session_destroy();
                header("location: ../login.php");
            }
        }else{ //SE NÃO EXISTIR O CONTEÚDO DA VARIÁVEL logout_id USUÁRIO É REDIRECIONADO PARA users.php
            header("location: ../users.php");
        }
    }else{  //SE NÃO  EXISTIR A SESSÃO unique_id USUÁRIO É REDIRECIONADO PARA login.php
        header("location: ../login.php");
    }
?>