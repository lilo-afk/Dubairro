<?php
    while($row = mysqli_fetch_assoc($query)){ //ENQUANTO EXISTIR USUÁRIO ASSOCIADO AO TERMO PESQUISADO NA BUSCA
        $sql2 = "SELECT * FROM messages WHERE (incoming_msg_id = {$row['unique_id']} 
                OR outgoing_msg_id = {$row['unique_id']}) AND (outgoing_msg_id = {$outgoing_id} 
                OR incoming_msg_id = {$outgoing_id}) ORDER BY msg_id DESC LIMIT 1"; //SELECIONAR TODOS OS CAMPOS DA TABELA message QUE O CAMPO outgoing_msg_Id SEJA O MESMO VALOR DO CAMPO unique_id DA TABELA users OU outgoing SEJA IGUAL AO unique_id DA TABELA USERS E O CAMPO outgoing SEJA IGUAL A VARIAVEL outgoing QUE RECEBEU A SESSÃO unique_id, OU TODOS QUE incoming SEJA IGUAL A VARIAVEL outgoing  ORDENADOS PELA A ORDEM DECRESÇENTE DO CAMPO msg_id ONDE A COSULTA RETORNA UM ÚNICO REGISTRO NO CONJUNTO DE RESULTADOS
        $query2 = mysqli_query($conn, $sql2); //VARIAVEL query2 FAZ A EXECUÇÃO DA VARIÁVEL sql2 QUE RECEBE A OPERAÇÃO COM O BANCO
        $row2 = mysqli_fetch_assoc($query2); //VAI RECEBER A ASSOCIAÇÃO DOS DADOS RETORNADOS DA OPERAÇÃO
        (mysqli_num_rows($query2) > 0) ? $result = $row2['msg'] : $result ="
        Nenhuma mensagem disponível"; //SE O NÚMERO DE LINHAS RETORNADOS DA OPERAÇÃO COM O BANCO ARMAZENADA PELA VARIAVEL query2 FOR MAIOR QUE 0, O USUÁRIO VERÁ A MENSAGEM ENVIADA PARA ELE PELO OUTRO USUÁRIO, SE FOR MENOR DO QUE 0, O USUÁRIO VERÁ NENHUMA MENSAGEM DISPONÍVEL
        (strlen($result) > 28) ? $msg =  substr($result, 0, 28) . '...' : $msg = $result; //SE O TOMANHO DA MENSAGEM FOR MAIOR QUE 28 CARACTERES APARECE '...' SE O TAMANHO DA MENSAGEM FOR ATÉ 28 APARECERÁ A MENSAGEM NORMALMENTE
        if(isset($row2['outgoing_msg_id'])){ //SE EXISTIR A LINHA outgoing NO BANCO ASSOCIADA A OPERAÇÃO ARMAZENADA PELA VARIÁVEL query2 NO BANCO DE DADOS CONTINUAR O CÓDIGO
            ($outgoing_id == $row2['outgoing_msg_id']) ? $you = "You: " : $you = ""; //SE A VARIÁVEL OUTGOING FOR IGUAL A LINHA outgoing NO BANCO ASSOCIADA A OPERAÇÃO ARMAZENADA PELA VARIÁVEL query2 NO BANCO DE DADOS A VARIÁVEL you SERÁ IGUAL Á "You" CASO FALSE VARIÁVEL you IGUAL Á ""(VAZIO)
        }else{ //SE NÃO EXISTIR A ASSOCIAÇÃO row2 VARIAVEL you IGUAL Á ""(VAZIO)
            $you = ""; 
        }
        ($row['status'] == "Offline") ? $offline = "offline" : $offline = ""; //SE A LINHA STATUS DA OPERAÇÃO ROW FOR IGUAL A offline A VARIAVEL offline RECEBE "offline" SE RETORNA DIFERENTE DISSO A VARIAVEL offline RECEBE ""(VAZIO)
        ($outgoing_id == $row['unique_id']) ? $hid_me = "hide" : $hid_me = "";//SE O VALOR DA VARIAVEL outgoing É IGUAL A LINHA unique_id DA OPERAÇÃO ROW CASO VERDADEIRO A VARIÁVEL hid_me RECEBE "hide" CASO FALSO A VARIÁVEL hid_me RECEBE ""(VAZIO)

        //MOSTRA OS VALORES DAS OPERAÇÕES PARA O USUÁRIO COMO STATUS A IMG E OS NOMES DOS USUÁRIOS
        $output .= '<a href="chat.php?user_id='. $row['unique_id'] .'">
                    <div class="content">
                    <img src="php/images/'. $row['img'] .'" alt="">
                    <div class="details">
                        <span>'. $row['lname'] .'</span>
                        <p>'. $you . $msg .'</p>
                    </div>
                    </div>
                    <div class="status-dot '. $offline .'"><i class="fas fa-circle"></i></div>
                </a>';
    }
?>