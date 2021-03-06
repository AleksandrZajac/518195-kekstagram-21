'use strict';

const RANDOM_LENGTH = 10;

const imgFilters = document.querySelector(`.img-filters`);
const defaultButton = document.querySelector(`#filter-default`);
const randomButton = document.querySelector(`#filter-random`);
const discussedButton = document.querySelector(`#filter-discussed`);
const filterButtons = document.querySelectorAll(`.img-filters__button`);

const arrayShuffle = (items) => {
  return items.sort(() => Math.round(Math.random() * 100) - 50);
};

const showDefaultGallery = window.debounce((itemsGallery) => {
  window.gallery.create(itemsGallery);
  if (itemsGallery) {
    imgFilters.classList.remove(`img-filters--inactive`);
  }
});

const showRandomGallery = window.debounce((itemsGallery) => {
  const items = itemsGallery.slice();
  window.gallery.create(arrayShuffle(items), RANDOM_LENGTH);
});

const showDiscussedGallery = window.debounce((itemsGallery) => {
  const items = itemsGallery.slice();
  items.sort((a, b) => b.comments.length - a.comments.length);
  window.gallery.create(items);
});

const clearButtonActive = () => {
  filterButtons.forEach((button) => {
    button.classList.remove(`img-filters__button--active`);
  });
};

const successHandler = (itemsList) => {
  showDefaultGallery(itemsList);

  defaultButton.addEventListener(`click`, () => {
    showDefaultGallery(itemsList);
    clearButtonActive();
    defaultButton.classList.add(`img-filters__button--active`);
  });

  randomButton.addEventListener(`click`, () => {
    showRandomGallery(itemsList);
    clearButtonActive();
    randomButton.classList.add(`img-filters__button--active`);
  });

  discussedButton.addEventListener(`click`, () => {
    showDiscussedGallery(itemsList);
    clearButtonActive();
    discussedButton.classList.add(`img-filters__button--active`);
  });
};

const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; padding: 20px; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `30px`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

window.http(successHandler, errorHandler);

