import './js/search'


const refs = {
    form: document.querySelector('.search-form'),
    serchInp: document.querySelector('.search-inp'),
    searchBtn: document.querySelector('.search-sub'),
    gallery: document.querySelector('.gallery'),
    moreBtn: document.querySelector('.load-more'),
}

const MY_API_KEY = '37178508-b1640183771b73716106d46c3';
const BASE_URL = 'https://pixabay.com/api/';

refs.form.addEventListener('submit', onSearchServ); // ставлю прослуховувача на кнопку і отримую данні з сервера

function onSearchServ(evt) { // фун-я відправки запросу і отримання результату з сервера 
    evt.preventDefault();
    const quantity = evt.currentTarget.elements.searchQuery.value;
    const url = `${BASE_URL}?key=${MY_API_KEY}&q=${quantity}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

    fetch(url)
        .then(response => response.json())
        .then(console.log);
}

