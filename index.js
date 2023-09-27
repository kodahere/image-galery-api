const accesKey = "yvG2mvbnRFZMnamQGIC64-0UIXfwK7Aq5khuRgaz5kI";
const input = document.getElementById("myInput");
const button = document.getElementById("myButton");
const imagesBox = document.getElementById("images-box");
const searchForm = document.getElementById("search-form");
const header = document.getElementById("myHeader");

const headerHeight = header.offsetHeight;

input.addEventListener("focus", () => {
  input.style.opacity = 1;
});
input.addEventListener("blur", () => {
  input.style.opacity = 0.5;
});

async function searchImages(value) {
  input.focus();
//   const url = `http://api.unsplash.com/search/photos?page=&query=${value}&client_id=${accesKey}&per_page=12`;
  const url = `https://api.unsplash.com/search/photos?query=${value}&client_id=${accesKey}&per_page=12`

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  // Удаляем старые изображения с их ссылками
  imagesBox.querySelectorAll("img, a").forEach((image) => {
    image.remove();
  });

  // Добавляем новые изображения
  results.forEach((result) => {
    const image = document.createElement("img");
    image.src = result.urls.regular;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.appendChild(image);
    imagesBox.appendChild(imageLink);
  });
}

searchImages("autumn");

button.addEventListener("click", (e) => {
  e.preventDefault();
  searchImages(input.value);
});
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchImages(input.value);
});
