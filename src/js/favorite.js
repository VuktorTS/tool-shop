import { common } from './common';
import { createMarkup } from './helpers/createMarkup';

const list = document.querySelector('.js-list');
const favorite = JSON.parse(localStorage.getItem(common.KEY_FAVORITE)) ?? [];

createMarkup(favorite, list);
