const form = document.querySelector(".login form"),
continueBtn = form.querySelector("input[type='submit']"),
errorText = form.querySelector(".error-text");
error = document.querySelector(".msg");


form.onsubmit = (e)=>{
    e.preventDefault();
}

continueBtn.onclick = ()=>{

    const email = document.getElementById('email');
    const emailValue = email.value.trim();

    if(emailValue === '') {
      setErrorFor(email, 'E-mail não pode estar vazio');
      
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, 'Formato Inválido,   formato:example@example.com');
      
    } else {
      
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
    xhr.open("POST", "php/recuperar.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              let data = xhr.response;
              if(data === "success"){
                error.textContent = "Email enviado com Sucesso!!!";
                $('.alert').addClass("success");
                $('.alert').removeClass("hide");
                $('.fas').removeClass("fa-exclamation-circle");
                $('.fas').addClass("fa-check-circle");
                $('.alert').addClass("showAlert");
                setTimeout(function(){
                  $('.alert').removeClass("show");
                  $('.alert').addClass("hide");
                },10000);
                $('.close-btn').click(function(){
                  $('.alert').removeClass("show");
                  $('.alert').addClass("hide");
                });

                setSuccessFor(email);
                setTimeout(function(){
                  location.href = "email-enviado-recupera.php";
              }, 3000);
                
              }else{ 
                
              }
              if(data === "Preencha todos os campos!")
              {
                error.textContent = "Atenção: Preencha todos os campos!";
  
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

              if(data === "Houve uma falha ao buscar este e-mail. Tente novamente!"){

                setErrorFor(email, 'E-mail não existe!');

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
              
              
          }
      }
    }
    let formData = new FormData(form);
    xhr.send(formData);



    }
    
    