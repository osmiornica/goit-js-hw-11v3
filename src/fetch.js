import { Notify } from 'notiflix';
import { input, page } from './index';
const axios = require('../node_modules/axios/dist/axios/');
const URL = 'https://pixabay.com/api/?';

async function fetchPhotos(value) {
  value = input.value;
  const searchParams = new URLSearchParams({
    key: '31330363-f29d133ba98b401b1d430c1d5',
    q: value,
    safesearch: true,
    orientation: 'horizontal',
    image_type: 'photo',
    page: page,
    per_page: 10,
  });
  try {
    const response = await axios.get(URL + searchParams);
    if (response.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { fetchPhotos };
