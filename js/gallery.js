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

  const removePictures = () => {
    const pictures = picturesSection.querySelectorAll(`.picture`);
    for (let i = 0; i < pictures.length; i++) {
      picturesSection.removeChild(pictures[i]);
    }
  };

  const createGallery = (items, length) => {
    removePictures();
    let itemsLength = items.length;
    if (length) {
      itemsLength = length;
    }
    for (let i = 0; i < itemsLength; i++) {
      const photo = renderPhoto(items[i]);
      photo.addEventListener(`click`, () => {
        window.picture.show(items[i]);
      });
      fragment.append(photo);
    }
    picturesSection.append(fragment);
  };

  window.gallery = {
    createGallery
  };

})();
