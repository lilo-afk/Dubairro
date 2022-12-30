var btn = document.getElementById('nome');
var container = document.querySelector('.nome');
var containerfoto = document.querySelector('.foto');
btn.addEventListener('click', function() {
containerfoto.style.display = 'none'; 
if(container.style.display === 'block') {
    container.style.display = 'none';
} else {
    container.style.display = 'block';
}
});