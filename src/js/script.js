const btnRemove = document.querySelector('#btn-remove')
const navBarMobile = document.querySelector('#navbar-mobile')
const headerContainer = document.querySelector('#header-container')

const films_container = document.querySelector('#films-container')
const resultado_container = document.querySelector('#resultado-container')

const img_background = document.querySelector('#img-background')
const title = document.querySelector('#title')

const foto_do_filme = document.querySelector('#img')
const descricao_do_filme = document.querySelector('#descricao')
const duracao_do_filme = document.querySelector('#duracao')
const receita_do_filme = document.querySelector('#receita')
const orcamento_do_filme = document.querySelector('#orcamento')
const classificacao_do_filme = document.querySelector('#classificacao')
const nome_do_filme = document.querySelector('#nome')

const btn_details = document.querySelector('#btn-details')
const btn_assitir = document.querySelector('#btn-watch')
const buscarDados = document.querySelector('#buscarDados')

const resposta = document.querySelector('#resposta')
const pesquisar = document.querySelector('#pesquisa')

const assistir_filme = document.querySelector('#asssitir')

// GET id from URL
const urlSearchParams = new URLSearchParams(window.location.search)
const filmId = urlSearchParams.get('id') 

btnRemove.addEventListener('click', () => {

   if(btnRemove.classList.toggle('ativar')) {
      navBarMobile.style.display = 'block'
   } else {
      navBarMobile.style.display = 'none'
   }

})

window.addEventListener('scroll', () => {
   if(window.scrollY > 30) {
      headerContainer.classList.add('rolagem')
   } else {
      headerContainer.classList.remove('rolagem')
   }
})

function moveMenu() {
   if(window.innerWidth >= 768) {
      navBarMobile.style.display = 'none'
   } else {
      navBarMobile.style.display = 'block'
   }
}

const api_key = '1c566e3a12689ad9b244c813eea90e2f'

const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=pt-BR&page=5`;

async function getMovies() {

   try {
      
      const response = await fetch(url)

      const data = await response.json()

      const filmes = data.results

      filmes.forEach(filme => {

         const filmeItem = document.createElement('div');
         const film = document.createElement('div')
         const a = document.createElement('a')
         const ava = document.createElement('div')
         const span_star = document.createElement('span')
         const span_heart = document.createElement('span')
         const link_btn = document.createElement('a')

         a.setAttribute('href' , `backgroundFilm.html?id=${filme.id}`)
         link_btn.setAttribute('href', `detalhes.html?id=${filme.id}`)

         filmeItem.classList.add('film-container')
         film.classList.add('filme')
         ava.classList.add('ava')
         span_heart.classList.add('f2')
         span_star.classList.add('f1')
         link_btn.classList.add('link_btn')

         span_star.innerHTML = `<i class="fa-solid fa-star" style="color: #ee150e;"></i> ${filme.popularity.toFixed(1)}`
         span_heart.innerHTML = `<i class="fa-regular fa-heart" style="color: #ee150e;"></i>`
         link_btn.innerText = 'Detalhes'

         const titulo = document.createElement('h3');
         titulo.classList.add('meu_h')
         titulo.textContent = filme.title;

         const poster = document.createElement('img');
         poster.classList.add('poster')
         poster.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
         poster.alt = filme.title;

         a.appendChild(poster)
         film.appendChild(a)
         filmeItem.appendChild(film)
         filmeItem.appendChild(titulo);
         ava.appendChild(span_star)
         ava.appendChild(span_heart)
         filmeItem.appendChild(ava)
         filmeItem.appendChild(link_btn)
         films_container.appendChild(filmeItem);
         
      });



   } catch (error) {
      
      console.log(`Houve um erro em: ${error}`)

   }

}

async function buscarFilme(filme) {

   try {
      
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=pt-BR&query=${filme}`

      const response = await fetch(url)

      const data = await response.json()

      const film_do_usuario = data.results

      film_do_usuario.forEach(filme => {
         
         const filmeItem = document.createElement('div');
         const film = document.createElement('div')
         const a = document.createElement('a')
         const ava = document.createElement('div')
         const span_star = document.createElement('span')
         const span_heart = document.createElement('span')
         const link_btn = document.createElement('a')

         a.setAttribute('href' , `backgroundFilm.html?id=${filme.id}`)
         link_btn.setAttribute('href', `detalhes.html?id=${filme.id}`)

         filmeItem.classList.add('film-container')
         film.classList.add('filme')
         ava.classList.add('ava')
         span_heart.classList.add('f2')
         span_star.classList.add('f1')
         link_btn.classList.add('link_btn')

         span_star.innerHTML = `<i class="fa-solid fa-star" style="color: #ee150e;"></i> ${filme.popularity.toFixed(1)}`
         span_heart.innerHTML = `<i class="fa-regular fa-heart" style="color: #ee150e;"></i>`
         link_btn.innerText = 'Detalhes'

         const titulo = document.createElement('h3');
         titulo.classList.add('meu_h')
         titulo.textContent = filme.title;
         resposta.innerHTML = `Resultado de: <span style="color: #ee150e;">${filme.title}</span>`

         const poster = document.createElement('img');
         poster.classList.add('poster')
         poster.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
         poster.alt = filme.title;

         a.appendChild(poster)
         film.appendChild(a)
         filmeItem.appendChild(film)
         filmeItem.appendChild(titulo);
         ava.appendChild(span_star)
         ava.appendChild(span_heart)
         filmeItem.appendChild(ava)
         filmeItem.appendChild(link_btn)
         resultado_container.appendChild(filmeItem);

         console.log(filme)

      })

   } catch (error) {

      console.log(`Erro ao buscar filme: ${error}`)
      
   }


}

async function FilmName(id) {

   const url_filme = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=pt-BR`
    
   const res = await fetch(url_filme)

   const data = await res.json()

   img_background.style.backgroundImage =`linear-gradient(rgba(0, 0, 0, 0.767), rgba(0, 0, 0, 0.733)), url(https://image.tmdb.org/t/p/w500${data.poster_path})`
   title.textContent = data.title
   btn_details.setAttribute('href', `detalhes.html?id=${data.id}`)
   btn_assitir.setAttribute('href', `assistir.html?id=${data.id}`)

   getMovies()

}

async function detalhes_do_filme(id) {
   
   const url_filme = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=pt-BR`
    
   const res = await fetch(url_filme)

   const data = await res.json()

   const img = document.createElement('img')
   img.src = `https://image.tmdb.org/t/p/w500${data.poster_path}`
   img.alt = data.title

   foto_do_filme.appendChild(img)
   nome_do_filme.textContent = data.title
   classificacao_do_filme.innerHTML = `<i class="fa-solid fa-star"></i> ${data.popularity.toFixed(1)}`
   descricao_do_filme.textContent = data.overview
   receita_do_filme.textContent = `$${data.revenue}`
   orcamento_do_filme.textContent = `$${data.budget}`
   duracao_do_filme.textContent = `${data.runtime} minutos`
   
   console.log(data)

}

async function assistir(filme) {

   try {
      
      const url = `https://api.themoviedb.org/3/movie/${filme}/videos?api_key=${api_key}`

      const res = await fetch(url)

      const data = await res.json()

      const trailers = data.results.filter(video => video.type === 'Trailer')

   if(trailers.length > 0) {

      const video_key = trailers[0].key
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.youtube.com/embed/${video_key}`

      assistir_filme.appendChild(iframe)

      btn_assitir.setAttribute('href', `assistir.html?id=${data.id}`)

   } else {
      console.log('Nenhum trailer encontrado.')
   }

   } catch (error) {
      
      console.log(`Houve um erro em: ${error}`)

   }

}

if(!filmId) {

   getMovies()

} else {

   FilmName(filmId)
   assistir(filmId)
   detalhes_do_filme(filmId)

}

pesquisar.addEventListener('submit', (e) => {

   e.preventDefault()

   const buscar = document.querySelector('#buscar').value

   if(buscar !== '') {
      films_container.style.display = 'none'
   }
   
   return buscarFilme(buscar)

})

pesquisar.addEventListener('keyup', (e) => {

   if(e.key === 'Enter') {

      const buscar = document.querySelector('#buscar').value

      if(buscar !== '') {
         films_container.style.display = 'none'
      }
   
      return buscarFilme(buscar)

   }

})

/*

fetch(url)
  .then(response => response.json())
  .then(data => {
    const filmes = data.results;
    const listaFilmes = document.getElementById('lista-filmes');

    filmes.forEach(filme => {
      const filmeItem = document.createElement('div');
      filmeItem.classList.add('filme');

      const titulo = document.createElement('h2');
      titulo.textContent = filme.title;

      const poster = document.createElement('img');
      poster.src = `https://image.tmdb.org/t/p/w500${filme.poster_path}`;
      poster.alt = filme.title;

      filmeItem.appendChild(titulo);
      filmeItem.appendChild(poster);
      listaFilmes.appendChild(filmeItem);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar filmes:', error);
  });






  filme.forEach(pretendido => {
        
        img_background.style.backgroundImage =`linear-gradient(rgba(0, 0, 0, 0.767), rgba(0, 0, 0, 0.733)), url(https://image.tmdb.org/t/p/w500${pretendido.poster_path})`
        title.textContent = pretendido.title

    });

*/