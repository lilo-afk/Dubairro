<?php
    session_start(); //INICIAR SESSÃO
    include_once "config.php"; //INCLUIR ARQUIVO

    $outgoing_id = $_SESSION['unique_id']; //ATRIBUINDO A SESSÃO PARA A VARIAVEL outgoing_id
    $searchTerm = mysqli_real_escape_string($conn, $_POST['searchTerm']); //ARMAZENA O VALOR INSERIDO PELO USUÁRIO NO INPUT BUSCA

    $sql = "SELECT * FROM users WHERE NOT unique_id = {$outgoing_id} AND (lname LIKE '%{$searchTerm}%') "; //SELECIONAR TODOS OS CAMPOS DENTRO DA TABELA users QUE NÃO TENHAM A SESSÃO unique_id, OU SEJA TODOS USUÁRIO MENOS VOCÊ MESMO, EM QUE O CAMPO LNAME TENHA ALGUM CARACTERE DIGITADO NO CAMPO BUSCA NO CAMPO LNAME PODE ESTAR EM QUALQUER PARTE DO CAMPO, ENTRE O INICIO, MEIO E FIM 
    $output = ""; //VARIÁVEL VAZIA QUE SERÁ USADA CASO OCORRA ALGUM ERRO
    $query = mysqli_query($conn, $sql); //VARIÁVEL EXECUTA A OPERAÇÃO DA VARIAVEL sql COM O BANCO
    if(mysqli_num_rows($query) > 0){ //SE RETORNA ALGUM VALOR EXIBIR O ARQUIVO data.php
        include_once "data.php";
    }else{ //SE NÃO RETORNAR NADA DA OPERAÇÃO COM O BANCO, É EXIBIDA A MENSAGEM output
        $output .= 'Nenhum usuário encontrado relacionado ao seu termo de pesquisa';
    }
    echo $output;
?>