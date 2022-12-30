const form = document.querySelector(".login form"),
continueBtn = form.querySelector("input[type='submit']"),
errorText = form.querySelector(".error-text");
error = document.querySelector(".msg");


form.onsubmit = (e)=>{
    e.preventDefault();
}

continueBtn.onclick = ()=>{
  

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    if(emailValue === '') {
      setErrorFor(email, 'E-mail não pode estar vazio');
      
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, 'Formato Inválido,   formato:example@example.com');
      
    } else {
      
    }

    if(passwordValue === '') {
      setErrorFor(password, 'Senha não pode estar vazia');
    }else if (passwordValue.length < 6) 
    {
      setErrorFor(password, 'Senha deve ter mais de 6 caracteres!');
    }else {
      
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
        function setErrorForInput(input) {
          const formControl = input.parentElement;
          formControl.className = 'field input incorrect';
          }

    function isEmail(email) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }




  function setErrorForInput(input) {
    const formControl = input.parentElement;
    formControl.className = 'field input incorrect';
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/login.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              let data = xhr.response;
              if(data === "Preencha todos os campos!  ")
              {
                error.textContent = "Atenção: Preencha todos os campos!!";
  
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
              const email = document.getElementById('email');
              const emailValue = email.value.trim();
              if(data === emailValue+" - Este E-mail não existe!  "){

                setErrorFor(email, 'Este E-mail não existe!');

                error.textContent = "Atenção: Este E-mail não existe!  ";
                
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
              if(data === "E-mail ou senha incorretos!  "){
                setErrorFor(email, 'E-mail ou senha incorretos!');
                setErrorFor(password, 'E-mail ou senha incorretos!');

                error.textContent = "Atenção: E-mail ou senha incorretos!";
                
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
                setErrorFor(email, 'Algo deu errado!');
                setErrorFor(password, 'Algo deu errado!');

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
                error.textContent = "Login realizado com Sucesso!";
                $('.alert').addClass("success");
                $('.alert').removeClass("hide");
                $('.fas').removeClass("fa-exclamation-circle");
                $('.fas').addClass("fa-check-circle");
                $('.alert').addClass("showAlert");
                setTimeout(function(){
                  $('.alert').removeClass("show");
                  $('.alert').addClass("hide");
                },20000);
                $('.close-btn').click(function(){
                  $('.alert').removeClass("show");
                  $('.alert').addClass("hide");
                });
                setSuccessFor(email);
                setSuccessFor(password);
                setTimeout(function(){
                  location.href = "perfill-comum.php";
              }, 3000);
              }else{ 
                
              }
          }
      }
    }
    let formData = new FormData(form);
    xhr.send(formData);

    }
    
  