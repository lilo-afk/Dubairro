var btnfoto = document.getElementById('btn-div-foto');
        var containerfoto = document.querySelector('.foto');
        var container = document.querySelector('.nome');
        btnfoto.addEventListener('click', function() {
            container.style.display = 'none';    
        if(containerfoto.style.display === 'block') {
            containerfoto.style.display = 'none';
        } else {
            containerfoto.style.display = 'block';
        }
        });