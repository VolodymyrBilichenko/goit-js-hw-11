const search = document.querySelector(".search");
const input = document.querySelector(".search-inp");
const reset = document.querySelector(".reset");

input.addEventListener("click", () => {
  search.classList.add("active");
  input.focus();
});

reset.addEventListener("click", () => {
  search.classList.remove("active");
  input.value = "";
});
