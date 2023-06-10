const refs = {
    search: document.querySelector(".search"),
    input:  document.querySelector(".search-inp"),
    reset: document.querySelector(".reset"),
    searchBtn: document.querySelector('.search-sub')
}

refs.searchBtn.addEventListener('click', () => {
    event.preventDefault();
})

refs.input.addEventListener("click", () => {
    refs.search.classList.add("active");
    refs.input.focus();
    
    setTimeout(() => {
        refs.searchBtn.style.display = 'block';
    }, 350);
});

refs.reset.addEventListener("click", () => {
    event.preventDefault();
    
    refs.searchBtn.style.display = 'none';
    refs.search.classList.remove("active");
    refs.input.value = "";
});
