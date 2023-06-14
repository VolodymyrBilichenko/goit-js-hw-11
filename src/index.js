import NewsApiService from './js/news-pixabay';
import NewsApiService from './js/news-pixabay';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),
}

const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearchServ); // ставлю прослуховувача на кнопку і отримую данні з сервера
refs.moreBtn.addEventListener('click', onLoadMoreBtn); // ставлю прослуховувача на кнопку для загрузки контенту (більше)

function onSearchServ(evt) { // фун-я відправки запросу і отримання результату з сервера 
    evt.preventDefault();
    
    newsApiService.query = evt.currentTarget.elements.searchQuery.value;

    if (newsApiService.query.trim() === '') {
        Notiflix.Report.warning('заполни поле');
        return;
    }
    Notiflix.Loading.pulse();
    newsApiService.resetPage();
    clearAppendArticle();
    createMarkup();
};

async function createMarkup() { // фун-я для створення контенту при сабміті
    try { 
        const { hits, totalHits } = await newsApiService.fetchArticles();
        Notiflix.Loading.remove();
        refs.moreBtn.style.display = 'block';
        if (hits.length === 0) {
            Notiflix.Report.warning("Sorry, there are no images matching your search query. Please try again.");
            refs.moreBtn.style.display = 'none';
            return;
        } appendArticle(hits);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    } catch (error) {
        Notiflix.Loading.remove();
        Notiflix.Report.failure('error');
        throw new error;
    }
};

async function onLoadMoreBtn() { // фун-я для підгрузки сторінок
    Notiflix.Loading.pulse();
    refs.moreBtn.style.display = 'none';
    try {
        const { hits, totalHits } = await newsApiService.fetchArticles();
        refs.moreBtn.style.display = 'block';
        Notiflix.Loading.remove();
        totalHitsPage({hits, totalHits});
    } catch (error) {
        Notiflix.Loading.remove();
        Notiflix.Report.failure('error');
        throw new error;
    }
};

function totalHitsPage({hits, totalHits}) { // фун-я для перевірки карток на сторінці та кінець контенту
    const nextPage = newsApiService.page;
    const maxPage = Math.ceil(totalHits / 5);
    
    if (nextPage > maxPage) {
        appendArticle(hits);
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    } else {
        appendArticle(hits);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    }
}

function appendArticle(hits) { // формуємо картку та заповнюємо контентом
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