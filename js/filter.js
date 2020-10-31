'use strict';

(() => {

  const imgFilters = document.querySelector(`.img-filters`);
  const defaultButton = document.querySelector(`#filter-default`);
  const randomButton = document.querySelector(`#filter-random`);
  const discussedButton = document.querySelector(`#filter-discussed`);
  const filterButtons = document.querySelectorAll(`.img-filters__button`);
  const arrayRandomLength = 10;

  const arrayShuffle = (arr) => {
    const shuffle = arr.sort(() => Math.round(Math.random() * 100) - 50);
    return shuffle;
  };

  const showDefaultGallery = window.debounce((itemsGallery) => {
    window.gallery.createGallery(itemsGallery);
    if (itemsGallery) {
      imgFilters.classList.remove(`img-filters--inactive`);
    }
  });

  const showRandomGallery = window.debounce((itemsGallery) => {
    const clonArr = itemsGallery.slice();
    const arrRandom = arrayShuffle(clonArr);
    window.gallery.createGallery(arrRandom, arrayRandomLength);
  });

  const showDiscussedGallery = window.debounce((itemsGallery) => {
    const clonArr = itemsGallery.slice();
    clonArr.sort((a, b) => b.comments.length - a.comments.length);
    window.gallery.createGallery(clonArr);
  });

  const clearButtonActive = () => {
    for (let i = 0; i < filterButtons.length; i++) {
      if (filterButtons[i].classList.contains(`img-filters__button--active`)) {
        filterButtons[i].classList.remove(`img-filters__button--active`);
      }
    }
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

})();
