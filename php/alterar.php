<?php
require('php/config.php');

if(isset($_GET['cod']) && !empty($_GET['cod'])){
    //LIMPAR O GET
    $cod = limparPost($_GET['cod']);

    //VERIFICAR SE A POSTAGEM EXISTE DE ACORDO COM OS CAMPOS
if(isset($_POST['senha']) && isset($_POST['repete_senha'])){
    //VERIFICAR SE TODOS OS CAMPOS FORAM PREENCHIDOS
    if(empty($_POST['senha']) or empty($_POST['repete_senha'])){
        echo  "Todos os campos são obrigatórios!";
    }else{
        //RECEBER VALORES VINDOS DO POST E LIMPAR        
        $senha = limparPost($_POST['senha']);
        $senha_cript = sha1($senha);
        $repete_senha = limparPost($_POST['repete_senha']);
      
        //VERIFICAR SE SENHA TEM MAIS DE 6 DÍGITOS
        
      
        if(!isset($erro_geral)  && !isset($erro_senha) && !isset($erro_repete_senha)){
            //VERIFICAR SE ESTE RECUPERACAO DE SENHA EXISTE
            $sql = $pdo->prepare("SELECT * FROM usuarios WHERE recupera_senha=? LIMIT 1");
            $sql->execute(array($cod));
            $usuario = $sql->fetch();
            //SE NÃO EXISTIR O USUARIO - ADICIONAR NO BANCO
            if(!$usuario){
                echo "Recuperação de senha inválida!";
            }else{
                //JÁ EXISTE USUARIO COM ESSE CÓDIGO DE RECUPERAÇÃO
                 //ATUALIZAR O TOKEN DESTE USUARIO NO BANCO
                $sql = $pdo->prepare("UPDATE usuarios SET senha=? WHERE recupera_senha=?");
                if($sql->execute(array($senha_cript,$cod))){
                    //REDIRECIONAR PARA LOGIN
                    echo "success";
                }
               
            }
        }

    }



}

}else{
    echo "success";
}



?>
