import axios from "axios";

export default class NewsApiService { // сервіс відповідає за запитом та за номером группи
    constructor() {
        this.article = '';
        this.page = 1;
    }

    async fetchArticles() { // метод забирає статті за посиланням з сервера 
        console.log(this);
        const MY_API_KEY = '37178508-b1640183771b73716106d46c3';
        const BASE_URL = 'https://pixabay.com/api/';

        const url = `${BASE_URL}?key=${MY_API_KEY}&q=${this.article}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`;

        return axios.get(url).then(res => {
            this.incrementPage();
            return res.data;
        });

        // return fetch(url) // повертаю результат 
        //     .then(response => response.json()) // відповідь від сервера форматую в json формат
        //     .then(({hits, totalHits}) => {
        //         console.log(hits);
        //         this.incrementPage();

        //         return {hits, totalHits}; // повертаю статті
        //     });
    }

    incrementPage() { // збільшує сторінку на один
        this.page += 1;
    }

    resetPage() { // скидує в вихідне положення
        this.page = 1;
    }

    get query() { // контролюю термін запиту (отримати\записати)
        return this.article
    }

    set query(newArticle) {
        this.article = newArticle;
    }
}