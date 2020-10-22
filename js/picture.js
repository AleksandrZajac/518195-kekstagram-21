'use strict';

(() => {

  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
  const likesCount = bigPicture.querySelector(`.likes-count`);
  const commentsUl = document.querySelector(`.social__comments`);
  const fragment = document.createDocumentFragment();
  const commentsTemplate = document.querySelector(`#social__comment`)
    .content
    .querySelector(`.social__comment`);
  const description = document.querySelector(`.social__caption`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);

  const renderComments = (itemsList, number) => {
    const commentsElement = commentsTemplate.cloneNode(true);
    const image = commentsElement.querySelector(`.social__picture`);
    const socialText = commentsElement.querySelector(`.social__text`);
    bigPictureImg.src = itemsList.url;
    description.textContent = itemsList.description;
    socialText.textContent = itemsList.comments[number].message;
    image.src = itemsList.comments[number].avatar;
    likesCount.textContent = itemsList.likes;
    return commentsElement;
  };

  let pictureItem = (itemsList) => {
    for (let i = 0; i < itemsList.comments.length; i++) {
      fragment.append(renderComments(itemsList, i));
    }
    commentsUl.append(fragment);
    bigPicture.classList.remove(`hidden`);
  };

  socialCommentCount.classList.add(`hidden`);
  const closeUsersPopup = document.querySelector(`.big-picture__preview`);

  const closePhoto = (elem) => {
    bigPicture.classList.add(`hidden`);
    elem.innerHTML = ``;
  };

  closeUsersPopup.addEventListener(`click`, () => {
    closePhoto(commentsUl);
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      closePhoto(commentsUl);
    }
  });

  let itemsList = [];

  const successHandler = function (data) {
    itemsList = data;
    window.gallery(itemsList);
  };

  window.picture = {
    comment: pictureItem,
  };

  window.load(successHandler);

})();
