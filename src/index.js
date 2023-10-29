import { instrumentItems } from './js/instrument-items.js';
import * as basicLightbox from 'basiclightbox';
import '~node_modules/basicLightbox/dist/basicLightbox.min.css';

import { common } from './js/common.js';
import { createMarkup } from './js/helpers/createMarkup.js';

//  {
//     id: 1,
//     image:
//       'https://static.dnipro-m.ua/origin/description/5096/design/bh-40.jpg',
//     name: 'Перфоратор бочковий',
//     price: 15999,
//     description:
//       "Перфоратор бочковий Dnipro-M BH-40 використовується для комфортного і швидкого буріння отворів буром діаметром до 52 мм в твердих і м'яких матеріалах, демонтажу та інших видів будівельних і ремонтних робіт: бучардування, трамбування, забивання.",
//   }

const instrumentList = document.querySelector('.js-instruments-list');
const favoriteArr = JSON.parse(localStorage.getItem(common.KEY_FAVORITE)) ?? [];
const basketArr = JSON.parse(localStorage.getItem(common.KEY_BASKET)) ?? [];
createMarkup(instrumentItems, instrumentList);

instrumentList.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();
  if (event.target.classList.contains('js-info')) {
    const { name, image, price, description } = findInsrtument(event.target);
    const instance = basicLightbox.create(`
    <div class="modal">
      <img src="${image}" alt="${name}" width="300" />
      <h2>${name}</h2>
      <h3>${price} грн.</h3>
      <p>${description}</p>
      <div>
        <button class="js-favorite">Add to favorite</button>
        <button class="js-basket">Add to basket</button>
      </div>
    </div>
`);
    instance.show();
  }
  if (event.target.classList.contains('js-favorite')) {
    const product = findInsrtument(event.target);
    const inStorage = favoriteArr.some(({ id }) => id === product.id);

    if (inStorage) {
      return;
    }

    favoriteArr.push(product);
    localStorage.setItem(common.KEY_FAVORITE, JSON.stringify(favoriteArr));
  }
  if (event.target.classList.contains('js-basket')) {
    const product = findInsrtument(event.target);
    basketArr.push(product);
    localStorage.setItem(common.KEY_BASKET, JSON.stringify(basketArr));
  }
}

function findInsrtument(element) {
  const instrumentId = Number(element.closest('.js-card').dataset.id);
  return instrumentItems.find(({ id }) => id === instrumentId);
}
