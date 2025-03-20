const btn_watch = document.querySelector('#btn-watch')

btn_watch.addEventListener('click', function() {

    const v = btn_watch.setAttribute('href', '#')
    const v1 = btn_watch.setAttribute('href', 'assistir.html')

    if(v === v1) {

        console.log('Minha lógica deu certo!')

    }

})

