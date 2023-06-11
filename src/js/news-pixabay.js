export default class NewsApiService {
    constructor() {
        this.article = '';
        this.page = 1;
    }

    fetchArticles() {
        console.log(this);
        const MY_API_KEY = '37178508-b1640183771b73716106d46c3';
        const BASE_URL = 'https://pixabay.com/api/';

        const url = `${BASE_URL}?key=${MY_API_KEY}&q=${this.article}&image_type=photo&orientation=horizontal&safesearch=true&per_page=5&page=${this.page}`;

        return fetch(url) // стукаюсь до сервера з запитом 
            .then(response => response.json()) // відповідь від сервера форматую в json формат
            .then(data => {
                console.log(data);
                this.incrementPage();

                return data.hits;
            });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() { // роблю глобальну змінну для значення
        return this.article
    }

    set query(newArticle) {
        this.article = newArticle;
    }
}