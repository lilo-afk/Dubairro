const form = document.querySelector(".signup form"),
continueBtn = form.querySelector(".button input"),
errorText = form.querySelector(".error-text");
error = document.querySelector(".msg");
buttonclient = document.querySelector(".troca_cliente");
buttoncom = document.querySelector(".troca_comercio");
buttontext = document.querySelector(".comercio");

buttonclient.style.background = "#190E2C";
buttoncom.style.background = "#281646";
buttontext.style.color = "#F82056";

form.onsubmit = (e)=>{
    e.preventDefault();
}

continueBtn.onclick = ()=>{
  const img = document.getElementById('image');
  const recaptcha = document.querySelector(".form .field .g-recaptcha");
  const name = document.getElementById('lname');
  const email = document.getElementById('email');
  const cnpj = document.getElementById('cnpj');
  const password = document.getElementById('password');
  const repete_senha = document.getElementById('repete_senha');

  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const cnpjValue = cnpj.value.trim();
  const passwordValue = password.value.trim();
  const repete_senhaValue = repete_senha.value.trim();

  function isName(name) {
      
    return /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(name);
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
  }

  if(nameValue === '') {
    setErrorFor(name, 'Nome não pode estar vazio');
  } else if (!isName(nameValue)) {
    setErrorFor(name, 'Nome Inválido, apenas letras');
    error.textContent = "Atenção: Nome Inválido, apenas letras!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },3000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
  } else {
    setSuccessFor(name); 
  }

  if(emailValue === '') {
    setErrorFor(email, 'E-mail não pode estar vazio');
    
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Formato Inválido,   formato:example@example.com');
    error.textContent = "Atenção: Formato de E-mail inválido!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
  } else {
    setSuccessFor(email);
  }
  function validarCNPJ(cnpj) {
 
    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;
      
    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
          
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
          
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;
            
    return true;
    
    }

    

  if(passwordValue === '') {
    setErrorFor(password, 'Senha não pode estar vazia');
  }else if (passwordValue.length < 6) 
  {
    setErrorFor(password, 'Senha deve ter mais de 6 caracteres!');
    error.textContent = "Atenção: Senha Curta!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
  } else if (repete_senhaValue != passwordValue){
    setErrorFor(password, 'Senha e confirmar senha não coincidem!');

    error.textContent = "Atenção: Senha e confirmar senha não coincidem!!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
  } else{
    setSuccessFor(password);
  }
  

  if(repete_senhaValue === '') {
    setErrorFor(repete_senha, 'Confirmar senha não pode estar vazio');
  }else if (repete_senhaValue.length < 6) {
    setErrorFor(repete_senha, 'Confirmar senha deve ter mais de 6 caracteres!');
  } else if (repete_senhaValue != passwordValue) {
    setErrorFor(repete_senha , 'Senha e Confirmar senha não se coincidem!');
  }  else {
    setSuccessFor(repete_senha);
  }
  if (img.files.length === 0) {
    setErrorForimg(img, 'Carregue uma imagem!');
    
} else {
setSuccessForimg(img);

}
if(cnpjValue === '') {
  setErrorFor(cnpj, 'CNPJ não pode estar vazio');
    } else if (cnpjValue.length < 18){
      setErrorFor(cnpj, 'CNPJ deve ter 14 caracteres');
    } 
    else if (validarCNPJ(cnpjValue) === false) {
      setErrorFor(cnpj, 'CNPJ Inválido!');
      error.textContent = "Atenção: CNPJ Inválido!";
                
    $('.alert').addClass("show");
    $('.alert').removeClass("hide");
    $('.alert').addClass("showAlert");
    setTimeout(function(){
      $('.alert').removeClass("show");
      $('.alert').addClass("hide");
    },5000);
    $('.close-btn').click(function(){
      $('.alert').removeClass("show");
      $('.alert').addClass("hide");
    });
    } else {
      setSuccessFor(cnpj); 
    }
function setErrorForimg(input, message) {
const form = document.querySelector(".signup form")
const formControl = input.parentElement;
const small = form.querySelector('small.img');
formControl.className = 'field image error';
small.innerText = message;
}
function setSuccessForimg(input){
const formControl = input.parentElement;
formControl.className = 'field image success';
}

  function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'field input error';
  small.innerText = message;
    }
  function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'field input success';
    }

  
    
 

  if(grecaptcha.getResponse() === ""){
    setErrorForrecaptcha(recaptcha, 'Marque a Recaptcha!');
    
  }
  else{
    setSuccessForrecaptcha(recaptcha);
    
  }
  function setErrorForrecaptcha(input, message) {
  const form = document.querySelector(".signup form")
  const formControl = input.parentElement;
  const small = form.querySelector('small.recaptcha');
  formControl.className = 'field captcha error';
  small.innerText = message;
}
  function setSuccessForrecaptcha(input){
    const formControl = input.parentElement;
    formControl.className = 'field captcha success';
  }

 
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/signupcommerce.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
            let data = xhr.response;
            if(data === "Preencha todos os Campos!  "){
              error.textContent = "Atenção: Preencha todos os Campos!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
            } 
            if(data === "cnpj inválido"){
              error.textContent = "Atenção: CNPJ inválido!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
            } 
            if(data === "Este e-mail não é um e-mail válido"){
              error.textContent = "Atenção: E-mail inválido!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
            } 
            if(data === "Por favor! Selecione um arquivo: jpeg, png ou jpg"){
              error.textContent = "Atenção: Por favor! Selecione um arquivo: jpeg, png ou jpg";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
            }
            if(data === "Por favor! Envie uma imagem do tipo - jpeg, png, jpg  "){
              error.textContent = "Atenção:Por favor! Envie uma imagem do tipo - jpeg, png, jpg";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
            }
            if(data === "Recaptcha inválido"){
              error.textContent = "Atenção: Recaptcha inválido!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
            }
            if(data === emailValue+" - Este E-mail já existe!"){
              error.textContent = emailValue+" - Este E-mail já existe!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
            }
            if(data === "Algo deu errado. Por favor, tente novamente!  "){
              error.textContent = "Atenção: Algo deu errado. Por favor, tente novamente!";
              
              $('.alert').addClass("show");
              $('.alert').removeClass("hide");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },5000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
            }
            if(data === "success"){
              error.textContent = "Pré-cadastro realizado com sucesso!";
              $('.alert').addClass("success");
              $('.alert').removeClass("hide");
              $('.fas').removeClass("fa-exclamation-circle");
              $('.fas').addClass("fa-check-circle");
              $('.alert').addClass("showAlert");
              setTimeout(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              },3000);
              $('.close-btn').click(function(){
                $('.alert').removeClass("show");
                $('.alert').addClass("hide");
              });
             
               
              setTimeout(function(){
                location.href="comercios.php";
            }, 3000);
            }else {

            }
              
  }}}
    let formData = new FormData(form);
    xhr.send(formData);

  }
  
  
  