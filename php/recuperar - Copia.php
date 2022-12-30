<?php
require('config.php');
//REQUERIMENTO DO PHPMAILER
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../config/PHPMailer/src/Exception.php';
require '../config/PHPMailer/src/PHPMailer.php';
require '../config/PHPMailer/src/SMTP.php';

if(isset($_POST['email']) && !empty($_POST['email'])){
    //RECEBER OS DADOS VINDO DO POST E LIMPAR
    $email = limparPost($_POST['email']);
    $estatus="confirmado";

    //VERIFICAR SE EXISTE ESTE USUÁRIO COM STATUS CONFIRMADO
    $sql = $pdo->prepare("SELECT * FROM users WHERE email=? AND estatus=?   LIMIT 1");
    $sql->execute(array($email,$estatus));
    $usuario = $sql->fetch(PDO::FETCH_ASSOC);
    if($usuario){
        //EXISTE O USUARIO
        //ENVIAR EMAIL PARA USUARIO FAZER NOVA SENHA
        $mail = new PHPMailer(true);
        $cod = sha1(uniqid());

        $sql2 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
        $row = mysqli_fetch_assoc($sql2);
        $name = $row['lname'];
         //ATUALIZAR O CÓDIGO DE RECUPERACAO DESTE USUARIO NO BANCO
         $sql = $pdo->prepare("UPDATE users SET recupera_senha=? WHERE email=?");
         if($sql->execute(array($cod,$email))){
            echo "success";
           

         }

        

    }else{
        echo "Houve uma falha ao buscar este e-mail. Tente novamente!";
    }

}else{
    echo "Preencha todos os campos!";
}
?>