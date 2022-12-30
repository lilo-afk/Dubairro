<?php 
    session_start();
    include_once "config.php";
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = mysqli_real_escape_string($conn, $_POST['password']);
    if(!empty($email) && !empty($password)){
        $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
        if(mysqli_num_rows($sql) > 0){
            $row = mysqli_fetch_assoc($sql);
            $user_pass = md5($password);
            $enc_pass = $row['password'];
            if($user_pass === $enc_pass){
                $status = "online";
                $sql2 = mysqli_query($conn, "UPDATE users SET status = '{$status}' WHERE unique_id = {$row['unique_id']}");
                if($sql2){
                     $_SESSION['unique_id'] = $row['unique_id'];
                    echo "success";
                }else{
                    echo "Algo deu errado. Por favor, tente novamente!  ";
                }
            }else{
                echo "E-mail ou senha incorretos!  ";
            }
        }else{
            echo "$email - Este E-mail não existe!  ";
        }
    }else{
        echo "Preencha todos os campos!  ";
    }
?>