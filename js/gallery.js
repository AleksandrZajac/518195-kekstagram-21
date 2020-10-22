'use strict';

(() => {

  const picturesSection = document.querySelector(`.pictures`);
  const sectionHeading = picturesSection.querySelector(`.pictures__title`);
  const fragment = document.createDocumentFragment();
  sectionHeading.classList.remove(`visually-hidden`);

  const picturePhotoTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const renderPhoto = (photo) => {
    const photoElement = picturePhotoTemplate.cloneNode(true);
    const image = photoElement.querySelector(`.picture__img`);
    const comments = photoElement.querySelector(`.picture__comments`);
    const likes = photoElement.querySelector(`.picture__likes`);

    image.src = photo.url;
    image.alt = `Photo`;
    comments.textContent = photo.comments.length;
    likes.textContent = photo.likes;
    return photoElement;
  };

  const gallery = (itemsList) => {
    for (let i = 0; i < itemsList.length; i++) {
      const photo = renderPhoto(itemsList[i]);
      photo.addEventListener(`click`, () => {
        window.picture.comment(itemsList[i]);
      });
      fragment.append(photo);
    }
    picturesSection.append(fragment);
  };

  let itemsList = [];

  const successHandler = (data) => {
    itemsList = data;
    gallery(itemsList);
  };

  window.gallery = {
    elements: gallery,
  };

  window.load(successHandler);

})();
