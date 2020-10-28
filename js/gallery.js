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

  const successHandler = (itemsList) => {
    for (let i = 0; i < itemsList.length; i++) {
      const photo = renderPhoto(itemsList[i]);
      photo.addEventListener(`click`, () => {
        window.picture.show(itemsList[i]);
      });
      fragment.append(photo);
    }
    picturesSection.append(fragment);
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
