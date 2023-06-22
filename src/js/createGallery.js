
export function appendArticle(hits) { // формуємо картку та заповнюємо контентом
    return hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
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
};
