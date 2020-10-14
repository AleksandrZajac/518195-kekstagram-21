'use strict';

(() => {

  const picturesSection = document.querySelector(`.pictures`);
  const sectionHeading = picturesSection.querySelector(`.pictures__title`);
  const fragment = document.createDocumentFragment();
  sectionHeading.classList.remove(`visually-hidden`);

  const picturePhotoTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);

  const addPhoto = () => {
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

    for (let i = 0; i < window.data.photos.length; i++) {
      fragment.append(renderPhoto(window.data.photos[i]));
    }
    picturesSection.append(fragment);
  };

  addPhoto();

})();
