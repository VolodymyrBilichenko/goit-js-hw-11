import PixabayApiService from './js/pixabayAPI';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { appendArticle } from './js/createGallery';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 300,
});

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),
    searchInp: document.querySelector('.search-inp'),
};

const pixabayApiService = new PixabayApiService();

refs.form.addEventListener('submit', onSearchServ); // ставлю прослуховувача на кнопку і отримую данні з сервера
refs.moreBtn.addEventListener('click', onLoadMoreBtn); // ставлю прослуховувача на кнопку для загрузки контенту (більше)
refs.form.addEventListener("keydown", onEnter); // ставлю прослуховувача на форму та прослуховую клавішу ентре


function onSearchServ(evt) { // фун-я відправки запросу і отримання результату з сервера 
    evt.preventDefault();
    
    pixabayApiService.query = evt.currentTarget.elements.searchQuery.value.trim();
    
    refs.moreBtn.style.display = 'none';

    if (pixabayApiService.query === '') {
        Notiflix.Report.warning("Oooops...","Your field is completely empty, please fill me in and press search");
        return;
    }
    Notiflix.Loading.pulse();
    pixabayApiService.resetPage();
    clearAppendArticle();
    createMarkup();
};

async function createMarkup() { // фун-я для створення контенту при сабміті
    try { 
        const { hits, totalHits } = await pixabayApiService.fetchArticles();
        Notiflix.Loading.remove();
        refs.moreBtn.style.display = 'block';
        if (hits.length === 0) {
            Notiflix.Report.warning("What is this?", "Sorry, there are no images matching your search query. Please try again.");
            refs.moreBtn.style.display = 'none';
            return;
        } appendMarkup(hits);
        onePageLoadBtn(totalHits);
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    } catch (error) {
        catchErr(error);
    }
};

async function onLoadMoreBtn() { // фун-я для підгрузки сторінок
    Notiflix.Loading.pulse();
    refs.moreBtn.style.display = 'none';
    try {
        const { hits, totalHits } = await pixabayApiService.fetchArticles();
        refs.moreBtn.style.display = 'block';
        Notiflix.Loading.remove();
        totalHitsPage({ hits, totalHits });
    } catch (error) {
        catchErr(error);
    }
};

function totalHitsPage({hits, totalHits}) { // фун-я для перевірки карток на сторінці та кінець контенту
    const nextPage = pixabayApiService.page;
    const perPage = pixabayApiService.perPage;
    const maxPage = Math.ceil(totalHits / perPage);
    
    if (nextPage > maxPage) {
        appendMarkup(hits);
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        refs.moreBtn.style.display = 'none';
        Notiflix.Report.warning("Sorry", "We're sorry, but you've reached the end of search results.");
    } else {
        appendMarkup(hits);
    }
};

function appendMarkup(hits) {
    const articleApp = appendArticle(hits);
    refs.gallery.insertAdjacentHTML('beforeend', articleApp);
    lightbox.refresh();
};

function clearAppendArticle() { // ф-ція для очищення галереї при новому запиті
    refs.gallery.innerHTML = '';
};

function onEnter(evt) { // ф-ція для пошуку за ентером
    if (evt.code === 'Enter') {
        onSearchServ(evt);
    }
}

function onePageLoadBtn(totalHits) { // ф-ція яка перевіряє скільки сторінок з картками ми отримали і ящко тільки 1ст то LoadMoreBtn не відображається
    const perPage = pixabayApiService.perPage;
    if (totalHits < perPage) {
        refs.moreBtn.style.display = 'none';
        return;
    }
}

function catchErr(error) { // ф-ція визивається в місцях коли ловимо помилки
    Notiflix.Loading.remove();
    Notiflix.Report.failure("Error", error.message);
    throw error;
};