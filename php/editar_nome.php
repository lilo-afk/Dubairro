<?php
    
        ob_start();

        // Incluir a conexao com BD
        include_once "php/config.php";
        $dados = filter_input_array(INPUT_POST, FILTER_DEFAULT); 
        // Receber os dados do formulario
        $sql2 = mysqli_query($conn, "SELECT unique_id, lname FROM users WHERE unique_id = {$_SESSION['unique_id']}");
        if(mysqli_num_rows($sql2) > 0){
        $row = mysqli_fetch_assoc($sql2);

        if($sql2){
            if(!empty($dados['EditarNome'])){
            

            if(isset($_POST['nome_usuario']) && !empty($_POST['nome_usuario'])){
                $nome = limparPost($_POST['nome_usuario']);
                $sql = mysqli_query($conn, "UPDATE users SET lname = '{$nome}' WHERE  unique_id = {$_SESSION['unique_id']}");
            }
        }}}
?>