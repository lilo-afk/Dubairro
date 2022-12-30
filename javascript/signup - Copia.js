const form = document.querySelector(".signup form"),
continueBtn = form.querySelector("input[type='submit']"),
errorText = form.querySelector(".error-text");
error = document.querySelector(".msg");
buttontext = document.querySelector(".cliente");

buttontext.style.color = "#F82056";

form.onsubmit = (e)=>{
    e.preventDefault();
}

continueBtn.onclick = ()=>{
  const recaptcha = document.querySelector(".form .field .g-recaptcha");
  const img = document.getElementById('image');
  const name = document.getElementById('lname');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const repete_senha = document.getElementById('repete_senha');

  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
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

  
    
  if (img.files.length === 0) {
          setErrorForimg(img, 'Carregue uma imagem!');
          
    } else {
      setSuccessForimg(img);
      
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
  

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/signup.php", true);
  xhr.onload = ()=>{
    if(xhr.readyState === XMLHttpRequest.DONE){
        if(xhr.status === 200){
            let data = xhr.response;
            if(data === "success"){
              error.textContent = "Cadastro realizado com sucesso!";
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
                location.href="perfill-comum.php";
            }, 3000);
            }else {

            }
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
            if(data === emailValue+" não é um e-mail válido"){
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
              
            
      
    }}}
    let formData = new FormData(form);
    xhr.send(formData);
  }
  

