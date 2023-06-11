import './js/search'
import NewsApiService from './js/news-pixabay'
import NewsApiService from './js/news-pixabay';

const refs = {
    form: document.querySelector('.search-form'),
    // serchInp: document.querySelector('.search-inp'),
    // searchBtn: document.querySelector('.search-sub'),
    gallery: document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),
}
const newsApiService = new NewsApiService();

refs.form.addEventListener('submit', onSearchServ); // ставлю прослуховувача на кнопку і отримую данні з сервера
refs.moreBtn.addEventListener('click', onLoadMore); // ставлю прослуховувача на кнопку для загрузки контенту (більше)

function onSearchServ(evt) { // фун-я відправки запросу і отримання результату з сервера 
    evt.preventDefault();
    newsApiService.query = evt.currentTarget.elements.searchQuery.value;
    newsApiService.resetPage();
    newsApiService.fetchArticles().then(push);
}

function onLoadMore() {
    newsApiService.fetchArticles().then(push);
}

function appendArticle(hits) {
    return hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <h3 class="txt-title">Tag: ${tags}</h3>
                    <p class="info-item">
                    <b>Likes: ${likes}</b>
                    </p>
                    <p class="info-item">
                    <b>Views: ${views}</b>
                    </p>
                    <p class="info-item">
                    <b>Comments: ${comments}</b>
                    </p>
                    <p class="info-item">
                    <b>Downloads: ${downloads}</b>
                    </p>
                </div>
            </div>`

    }).join('');
};

function push(hits) { // виводимо на екран користувачу 
    const appendArticleCard = appendArticle(hits);
    refs.gallery.insertAdjacentHTML('beforeend', appendArticleCard);
}  