const form = document.querySelector(".signup form"),
continueBtn = form.querySelector("input[type='submit']"),
errorText = form.querySelector(".error-text");
error = document.querySelector(".msg");


form.onsubmit = (e)=>{
    e.preventDefault();
}

continueBtn.onclick = ()=>{
    
    
    const repete_senha = document.getElementById('repete_senha');
    const password = document.getElementById('password');
    const repete_senhaValue = repete_senha.value.trim();
    const passwordValue = password.value.trim();

    if(repete_senhaValue === '') {
      setErrorFor(repete_senha, 'Confirmar senha não pode estar vazio');
      
    } else if (repete_senhaValue.length < 6){
      setErrorFor(repete_senha, 'Confirmar senha deve ter mais de 6 caracteres');
      
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
        
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/alterar.php", true);
    xhr.onload = ()=>{
      if(xhr.readyState === XMLHttpRequest.DONE){
          if(xhr.status === 200){
              let data = xhr.response;
              if(data === "Todos os campos são obrigatórios!"){
               
                
                error.textContent = "Atenção: Todos os campos são obrigatórios!";
                
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
              if(data === "error")
              {
                error.textContent = "Atenção: Algo deu errado!";
  
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

              
              if(data === "Recuperação de senha inválida!"){
                

                error.textContent = "Atenção: Recuperação de senha inválida!";
                
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
                error.textContent = "Senha alterada com Sucesso!!!";
                  
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
                  setSuccessFor(repete_senha);
                  setSuccessFor(password);
                  
    
                setTimeout(function(){
                  location.href = "perfil.php";
              }, 3000);
              }else{ 
                
              }
          }
      }
    }
    let formData = new FormData(form);
    xhr.send(formData);

    }
    
  