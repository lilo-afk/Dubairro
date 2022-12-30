<?php 
    session_start();
    if(isset($_SESSION['unique_id'])){ //SE EXISTIR SESSÃO unique_id
        include_once "config.php"; //ADICIONAR ARQUIVO config.php
        $outgoing_id = $_SESSION['unique_id']; //VARIAVEL RECEBE A SESSÃO unique_id
        $incoming_id = mysqli_real_escape_string($conn, $_POST['incoming_id']); //ARMAZENA O VALOR DO POST incoming_id
        $message = mysqli_real_escape_string($conn, $_POST['message']); //ARMAZENA O VALOR DO POST message
        if(!empty($message)){ //SE O POST message NÃO ESTIVER VAZIO
            $sql = mysqli_query($conn, "INSERT INTO messages (incoming_msg_id, outgoing_msg_id, msg)
                                        VALUES ({$incoming_id}, {$outgoing_id}, '{$message}')") or die(); //INSERIR DENTRO DA TABELA messages DENTRO DOS RESPECTIVOS CAMPOS incoming_msg_id, outgoing_msg_id, msg, OS RESPECTIVOS VALORES DAS VARIÁVEIS incoming_id, outgoing_id e message OU FINALIZA O CÓDIGO COM O or die()
        }
    }else{ //CASO A CONDIÇÃO NÃO EXISTIR, OU SEJA O POST MESSAGE ESTIVER VAZIO, O USUÁRIO É REDIRECIONADO PARA O login.php
        header("location: ../login.php");
    }


    
?>