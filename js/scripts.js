// LIMITE_CARACTERES

let message = document.querySelector(".message"),
textArea = message.querySelector("textarea"),
minNum = message.querySelector(".min-num");

textArea.addEventListener("keyup", () => {
    let valLenght = textArea.value.length;

    minNum.innerHTML = valLenght;

    valLenght > 0 
    ? message.classList.add("active")
    : message.classList.remove("active");
    
    valLenght > 500
    ? message.classList.add("error")
    : message.classList.remove("error");

    console.log(valLenght);
});