import { Notify } from 'notiflix';
import { fetchPhotos } from './fetch';

const input = document.querySelector('input[type=text]');
const form = document.querySelector('form');
const btnLoad = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
btnLoad.setAttribute('hidden', 'hidden');
let page = 1;

function createGallery(data) {
  btnLoad.removeAttribute('hidden');
  data.hits.forEach(hits =>
    gallery.insertAdjacentHTML(
      'afterbegin',
      `<div class="photo-card">
  <img src="${hits.webformatURL}" style="width: 420px; height: 420px" alt="${hits.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${hits.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${hits.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${hits.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${hits.downloads}</b>
    </p>
  </div>
</div>`
    )
  );
  if (page === 1) {
    Notify.success(`"Hooray! We found ${data.total} images`);
  }
}

function clearGallery() {
  gallery.innerHTML = '';
  page = 1;
}

form.addEventListener('submit', e => {
  e.preventDefault();
  async function asyncCreate() {
    try {
      const response = await fetchPhotos();
      createGallery(response.data);
    } catch (error) {
      concole.log(error);
    }
  }
  asyncCreate();
  if (gallery.childNodes.length > 0) {
    clearGallery();
  }
});

btnLoad.addEventListener('click', () => {
  page += 1;
  fetchPhotos().then(response => {
    if (gallery.childNodes.length === response.data.total) {
      Notify.failure(
        `We're sorry, but you've reached the end of search results.`
      );
    }
    createGallery(response.data);
  });
});

export { input, page };
