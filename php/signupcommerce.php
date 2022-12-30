<?php
        session_start(); //SESSÃO INICIADA

        include_once "config.php"; //INCLUINDO A CONEXÃO COM O BANCO DE DADOS ATRAVÉS DO ARQUIVO config.php
        //REQUERIMENTO DO PHPMAILER
       
        
        //Atribuindo valor do POST para as váriaveis
        $lname = mysqli_real_escape_string($conn, $_POST['lname']);
        $cnpj = mysqli_real_escape_string($conn, $_POST['cnpj']);
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $password = mysqli_real_escape_string($conn, $_POST['password']);
        $repete_senha = limparPost($_POST['repete_senha']);
        $captcha = $_POST['g-recaptcha-response'];

        //Verificando se os campos input foram preenchidos
        if(!empty($lname) && !empty($cnpj) && !empty($email) && !empty($password) && !empty($repete_senha) && isset($_FILES["image"]) && !empty($_FILES["image"]["name"]) && !empty($captcha)){
            function validar_cnpj($cnpj)
{
	$cnpj = preg_replace('/[^0-9]/', '', (string) $cnpj);
	
	// Valida tamanho
	if (strlen($cnpj) != 14)
		return false;

	// Verifica se todos os digitos são iguais
	if (preg_match('/(\d)\1{13}/', $cnpj))
		return false;	

	// Valida primeiro dígito verificador
	for ($i = 0, $j = 5, $soma = 0; $i < 12; $i++)
	{
		$soma += $cnpj[$i] * $j;
		$j = ($j == 2) ? 9 : $j - 1;
	}

	$resto = $soma % 11;

	if ($cnpj[12] != ($resto < 2 ? 0 : 11 - $resto))
		return false;

	// Valida segundo dígito verificador
	for ($i = 0, $j = 6, $soma = 0; $i < 13; $i++)
	{
		$soma += $cnpj[$i] * $j;
		$j = ($j == 2) ? 9 : $j - 1;
	}

	$resto = $soma % 11;

	return $cnpj[13] == ($resto < 2 ? 0 : 11 - $resto);
}
if(validar_cnpj($cnpj) == FALSE){
    echo "cnpj inválido";
}       else{
        //CURL
        $curl = curl_init();
        //REQUISIÇÃO CURL   
        curl_setopt_array($curl,[
        CURLOPT_URL => 'https://www.google.com/recaptcha/api/siteverify',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => [
            'secret' => '6LfbigQjAAAAALP9d7JC8Qidc5sGbiHC_qlWQRE3',
            'response' => $_POST['g-recaptcha-response'] ?? ''
        ]
        ]);
        //EXECUTAR A REQUISIÇÃO
        $response = curl_exec($curl);
        //FINALIZAR A CONEXÃO
        curl_close($curl);
        //RESPONSE EM ARRAY
        $responseArray = json_decode($response, true);
        //PEGA OS VALORES DO ARRAY E RETORNA SUCESS OR FALSE
        $sucesso = $responseArray['success'] ?? false;
        //ATRIBUI O VALOR DO RECAPTCHA EM BOOLEAN
        $sucesso ?true:false;
        //VERIFICA SE DEU ERRO NA VERIFICAÇÃO DO RECAPTCHA
        if($sucesso == false){
            echo "Recaptcha inválido";
        }else{
            //CASO NÃO TENHA ERRO, PROSSEGUIR COM O CÓDIGO
        }
        //VERIFICA SE O EMAIL É VÁLIDO
        if(filter_var($email, FILTER_VALIDATE_EMAIL)){
            //VERIFICA SE O EMAIL DO POST JÁ EXISTE NO BANCO
            $sql = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
            //SE O EMAIL JÁ EXISTIR RETORNA ERRO
            if(mysqli_num_rows($sql) > 0){
                echo "$email - Este E-mail já existe!";
            }else //SE EMAIL AINDA NÃO EXISTIR NO BANCO
            {
                if(isset($_FILES['image'])){
                    $img_name = $_FILES['image']['name'];
                    $img_type = $_FILES['image']['type'];
                    $tmp_name = $_FILES['image']['tmp_name'];
                    
                    $img_explode = explode('.',$img_name);
                    $img_ext = end($img_explode);
                    $extensions = ["jpeg", "png", "jpg"];
                    //VERIFICA SE A IMAGEM TEM EXTESÃO E NOME VALIDOS
                    if(in_array($img_ext, $extensions) === true){
                        $types = ["image/jpeg", "image/jpg", "image/png"];
                        if(in_array($img_type, $types) === true){
                    //SE A IMAGEM É VALIDA MOVE O ARQUIVO PARA UMA NOVA LOCALIZAÇÃO E COM NOVO NOME
                    $time = time();
                    $new_img_name = $time.$img_name;
                    if(move_uploaded_file($tmp_name,"images/".$new_img_name)){
            //VERIFICAR SE EXISTE ARQUIVO DE IMAGEM DENTRO DO INPUT FILE
            
                    //ARQUIVO CARREGADO NO NOVO LOCAL, É ATRIBUÍDO VARIÁVEIS QUE SEU CONTEÚDO SERÁ ARMAZENADO NO BANCO DE DADOS
                    $recupera_senha="";
                    //SERÁ USADA CASO O USUÁRIO DESEJE RECUPERAR A SUA SENHA
                    $token="confirmado";
                    //USADO PARA VERIFICAR SE O USUÁRIO
                    $codigo_confirmacao = uniqid();
                    //CÓDIGO QUE SERÁ INSERIDO NA URL, APÓS O USUÁRIO CLICAR EM CONFIRMAR E-MAIL, NA MENSAGEM ENVIADA PARA SEU EMAIL
                    $estatus = "novo";
                    //AO CRIAR A CONTA RECEBE O ESTATUS NOVO, QUE SERVE PARA IMPEDIR QUE O USUÁRIO ENTRE NO SISTEMA SEM TER CONFIRMADO O EMAIL, APÓS CONFIRMAÇÃO ESTATUS ATUALIZADO PARA "confirmado"
                    $data_cadastro = date('d/m/Y');
                    //ARMAZENA A DATA QUE O USUÁRIO SE REGISTROU NO SISTEMA
                    $ran_id = rand(time(), 100000000);
                    //CÓDIGO USADO PARA FAZER INTERAÇÕES DO USUARIO COM ESSE ID NO SISTEMA 
                    $status = "online";
                    //STATUS, PODE TER VALOR "online" OU "offline",MOSTRA SE O USUÁRIO ESTÁ COM SESSÃO ATIVA OU SESSÃO DESATIVO NO SISTEMA NAQUELE MOMENTO
                    $encrypt_pass = md5($password);
                    //CRIPTOGRAFA A SENHA DO USUARIO NO BANCO DE DADOS
                    $insert_query = mysqli_query($conn, "INSERT INTO users (unique_id, lname, cnpj, email, password, img, status, recupera_senha, token, codigo_confirmacao, estatus, data_cadastro)
                    VALUES ({$ran_id},'{$lname}','{$cnpj}', '{$email}', '{$encrypt_pass}', '{$new_img_name}', '{$status}', '{$recupera_senha}', '{$token}', '{$codigo_confirmacao}', '{$estatus}', '{$data_cadastro}')");
                    //PEGA OS VALORES DAS VARIÁVEIS E INSERI NOS CAMPOS DO BANCO DE DADOS NA RESPECTIVA ORDEM 
                    if($insert_query) { //VERIFICA SE EXISTE A VARIÁVEL
                        $select_sql2 = mysqli_query($conn, "SELECT * FROM users WHERE email = '{$email}'");
                        //VERIFICAR NO BANCO SE O EMAIL FOI CADASTRADO
                        if(mysqli_num_rows($select_sql2) > 0){ //VERIFICA SE O EMAIL FOI CADASTRADO, CONTINUA O CÓDIGO
                    //VERIFICA OS MODOS DO SITE LOCAL OU PRODUÇÃO, LOCAL SE FOR RODADO LOCALMENTE (LOCALHOST), PRODUÇÃO SE O SITE ESTÁ ONLINE   
                    if($modo =="local"){
                        //SE MODO LOCAL ELE LIBERA O ACESSO DO USUÁRIO AO SISTEMA GERANDO A SESSÃO unique_id PARA O USUÁRIO
                        $result = mysqli_fetch_assoc($select_sql2);
                        $_SESSION['unique_id'] = $result['unique_id'];
                        $_SESSION['token'] = $result['token'];
                        echo "success";
                    }else{
                        //CASO NÃO SEJA LOCAL CONTINUAR O CÓDIGO
                    }

                    //SE O MODO FOR PRODUCAO
                    if($modo =="producao"){
                        
                        //ENVIAR EMAIL PARA USUARIO
                        $mail = new PHPMailer(true);
                        //TRY FAZ O TRATAMENTO PARA POSSÍVEIS ERROS
                        try {
                        
                            //CONFIGURAÇÕES DO SERVIDOR
                            //Ativar saída de depuração detalhada
                            $mail->isSMTP();                                            //Enviar usando SMTP
                            $mail->Host       = 'smtp.hostinger.com';                     //Definir o servidor SMTP
                            $mail->SMTPAuth   = true;                                   //ATIVAR AUTENTICAÇÃO SMTP
                            $mail->Username   = 'dubairro@dubairroweb.gq';                     //NOME DE USUÁRIO SMTP
                            $mail->Password   = '$Dubairro22';                               //SENHA DO USUÁRIO SMTP
                            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Habilitar criptografia TLS implícita
                            $mail->Port       = 465;                                    //PORTA DO SERVIDOR USADA NA CONEXÃO
                        
                            //PARAMETROS DE REMETENTE E DESTINATARIO
                            $mail->setFrom('dubairro@dubairroweb.gq', 'DUBAIRRO');//PARAMETROS DO REMETENTE(E-MAIL, NOME) 
                            $mail->addAddress($email,$lname);     //PARAMETROS DO DESTINARIO(E-MAIL, NOME)
                            
                            $mail->isHTML(true);  //CORPO DO EMAIL COMO HTML
                            $mail->Subject = 'Confirme seu cadastro!'; //TITULO DO EMAIL
                            $mail->AddEmbeddedImage('logo 3000x2000.png', 'logo_ref');

                            $mail->Body    = 
                            '<div style="background-color:#190E2C; font-family: Roboto; width: 450px; height: 450px; padding: 20px; border-radius: 5px; text-align: center; justify-content: center; align-items: center;">
                                <div class="container-content" style="background-color: #281646; height: 450px;"><a href="#"><img src="cid:logo_ref" style="width: 100px;" alt="logo"></a>
                                <p style="font-size:15px; color: #eeee; line-height: 23px; font-weight: 500; padding: 0 30px;">Oi <span style="color: rgb(51, 108, 200);text-decoration:underline; cursor: pointer;">'.$lname.'</span>! <br><br></p>
                                    <p style="font-size:15px; color: #eeee; line-height: 23px; font-weight: 500; padding: 0 30px;">
                                    Você está a um passo de se juntar/fazer parte do projeto Dubairro! Convidamos para transformarmos os
                                    bairros
                                    onde moramos, naquilo que sempre sonhamos, contribua já com seu cadastro no nosso site. <br><br>
                                    Esperamos por você no site! ;) <br><br>
                                    Por favor confirme seu endereço de e-mail clicando no botão abaixo:
                                    </p>
                                <br><br>
                                <a style="background: #d8083c; color: #fff; font-size: 15px; font-weight: 550; text-decoration:none; padding:18px 145px; border-radius:3px;"
                                    href="'.$site.'php/confirmacao.php?cod_confirm='.$codigo_confirmacao.'">Confirmar E-mail</a>
                                    </div>
                                </div>';//CONTEÚDO DA MENSAGEM ENVIADO AO USUÁRIO QUE VAI CARREGAR NA URL O CODIGO DE CONFIRMAÇÃO GERADO NA VARIAVEL $codigo_confirmacao QUE SERÁ USADO PARA VALIDAR O ESTATUS DO USUÁRIO NO SISTEMA
                             
                             $mail->send();
                             //FAZ O ENVIO DO EMAIL COM OS DADOS ACIMA PARA O USUÁRIO
                             echo "success";
                             //USUÁRIO LIBERADO PARA ACESSAR O SISTEMA
                           } catch (Exception $e) { //CATCH CASO RETORNE ALGUM ERRO NO CÓDIGO TRY, ERRO EXIBIDO AO USUÁRIO
                               echo "Houve um problema ao enviar -email de confirmação: {$mail->ErrorInfo}";
                            }
                        //CASO AS CONDIÇÕES(IF) NÃO FOREM VALIDAS EXIBIR ELSE RESPECTIVO A CADA CONDIDIÇÃO INVÁLIDA COM A MENSAGEM DE ERRO
                        }
                        }else{
                            echo "Este endereço de E-mail não existe!  ";
                        }
                        }else{
                            echo "Algo deu errado. Por favor, tente novamente!  ";
                        }}
                    }else{
                          echo "Por favor! Envie uma imagem do tipo - jpeg, png, jpg  ";
                    }
                    }else{
                        echo "Por favor! Selecione um arquivo: jpeg, png ou jpg  ";
                    }
                        }
                       }}else{
                            echo "Este e-mail não é um e-mail válido";
                        }
                        }}else{
                            echo "Preencha todos os Campos!  ";
                        }
?>