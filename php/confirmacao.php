<?php
require('config.php');

if(isset($_GET['cod_confirm']) && !empty($_GET['cod_confirm'])){
    
    //LIMPAR O GET
    $cod = limparPost($_GET['cod_confirm']);

    //CONSULTAR SE ALGUM USUARIO TEM ESSE CODIGO DE CONFIRMACAO
    //VERIFICAR SE EXISTE ESTE USUÁRIO
    $sql = $pdo->prepare("SELECT * FROM users WHERE codigo_confirmacao=? LIMIT 1");
    $sql->execute(array($cod));
    $usuario = $sql->fetch(PDO::FETCH_ASSOC);
    if($usuario){
        $select_sql2 = mysqli_query($conn, "SELECT * FROM users WHERE codigo_confirmacao = '{$cod}'");
        $result = mysqli_fetch_assoc($select_sql2);
        $_SESSION['unique_id'] = $result['unique_id'];
        //ATUALIZAR O STATUS PARA CONFIRMADO
        $estatus = "confirmado";
        $sql = $pdo->prepare("UPDATE users SET estatus=? WHERE codigo_confirmacao=?");
        if($sql->execute(array($estatus,$cod))){
            header('location: ../login.php');
        }
    }else{
       echo "<h1>Código de confirmação inválido!</h1>";
    }

}