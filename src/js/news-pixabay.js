import axios from "axios";

const MY_API_KEY = '37178508-b1640183771b73716106d46c3';
const BASE_URL = 'https://pixabay.com/api/';

export default class NewsApiService { // сервіс відповідає за запитом та за номером группи
    constructor() {
        this.article = '';
        this.page = 1;
        this.perPage = 40;
    };
    
    async fetchArticles() { // метод забирає статті за посиланням з сервера 
        const url = BASE_URL;
        
        const params = {
            key: MY_API_KEY,
            q: this.article,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: this.perPage,
            page: this.page,
        };

        const res = await axios.get(url, {params});
        this.incrementPage();
        return res.data;
    };

    incrementPage() { // збільшує сторінку на один
        this.page += 1;
    };

    resetPage() { // скидує в вихідне положення
        this.page = 1;
    };

    get query() { // контролюю термін запиту (отримати\записати)
        return this.article
    };

    set query(newArticle) {
        this.article = newArticle;
    };
}



/*
    1. async - оголошує асинхронну ф-цію, a в свою чергу асинхронна ф-ція ЗАВЖДИ поверта проміс
    2. await - не можна використовувати за межами асинхроної ф-ції
    3. await - заморожує виконання асинхронної ф-ції поки проміс не перейде у стан Fullfilled або Rejected
    4. await - повертає данні з промісу, а не сам проміс
    5. async/await - потрібні для того щоб зробити імітацію синхронності в середині асинхронного коду 
*/