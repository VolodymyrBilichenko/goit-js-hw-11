import './js/search'
import NewsApiService from './js/news-pixabay'
import NewsApiService from './js/news-pixabay';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),
}
const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearchServ); // ставлю прослуховувача на кнопку і отримую данні з сервера
refs.moreBtn.addEventListener('click', onLoadMore); // ставлю прослуховувача на кнопку для загрузки контенту (більше)

function onSearchServ(evt) { // фун-я відправки запросу і отримання результату з сервера 
    evt.preventDefault();

    clearAppendArticle();
    newsApiService.query = evt.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(appendArticle);
}

function onLoadMore() {
    newsApiService.fetchArticles().then(appendArticle);
}

function appendArticle(hits) {
  const photoCards = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
      <div class="photo-card">
        <a class="photo-lightbox" href="${largeImageURL}">
          <img class="photo-card-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="info">
          <h3 class="txt-title">Tag: ${tags}</h3>
          <p class="info-item"><b>Likes: ${likes}</b></p>
          <p class="info-item"><b>Views: ${views}</b></p>
          <p class="info-item"><b>Comments: ${comments}</b></p>
          <p class="info-item"><b>Downloads: ${downloads}</b></p>
        </div>
      </div>
    `;
  }).join('');
  
  refs.gallery.insertAdjacentHTML('beforeend', photoCards);
  
    const lightBoxImg = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionsDelay: 300,
    });
}

function clearAppendArticle() { // фун-я для очищення галереї при новому запиті
    refs.gallery.innerHTML = '';
}
