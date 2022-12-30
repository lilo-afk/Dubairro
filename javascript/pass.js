const senha = document.getElementById("repete_senha");
Icon = document.getElementById("eye");

Icon.onclick = () =>{
  if(senha.type === "password"){
    senha.type = "text";
    Icon.classList.add("active");
  }else{
    senha.type = "password";
    Icon.classList.remove("active");
  }
}
