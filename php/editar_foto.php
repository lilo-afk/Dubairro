<?php
    
        ob_start();

        // Incluir a conexao com BD
        include_once "php/config.php";
        
        // Receber os dados do formulario
        $sql2 = mysqli_query($conn, "SELECT unique_id, img FROM users WHERE unique_id = {$_SESSION['unique_id']}");
        if(mysqli_num_rows($sql2) > 0){
        $row = mysqli_fetch_assoc($sql2);

        if($sql2){
            $dados = filter_input_array(INPUT_POST, FILTER_DEFAULT); 
        // Verificar se o usuario clicou no botao
        if(!empty($dados['EditarFoto'])){

            if(isset($_FILES['img'])){
                
                $img_name = $_FILES['img']['name'];
                $img_type = $_FILES['img']['type'];
                $tmp_name = $_FILES['img']['tmp_name'];
                
                $img_explode = explode('.',$img_name);
                $img_ext = end($img_explode);

                $extensions = ["jpeg", "png", "jpg"];
                if(in_array($img_ext, $extensions) === true){
                    $types = ["image/jpeg", "image/jpg", "image/png"];
                    if(in_array($img_type, $types) === true){
                        $time = time();
                        $new_img_name = $time.$img_name;
                        if(move_uploaded_file($tmp_name,"php/images/".$new_img_name)){
                            $endereco_imagem = 'php/images/'.$row['img'];
                            unlink($endereco_imagem);
                            $sql = mysqli_query($conn, "UPDATE users SET img = '{$new_img_name}' WHERE  unique_id = {$_SESSION['unique_id']}");
                        }}}}}}}
?>