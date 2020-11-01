'use strict';

(() => {

  let uploadNumber = 0;
  const UPLOAD_COUNT = 5;
  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
  const likesCount = bigPicture.querySelector(`.likes-count`);
  const commentsUl = document.querySelector(`.social__comments`);
  const fragment = document.createDocumentFragment();
  const commentsLoader = document.querySelector(`.comments-loader`);
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

  let createComments = (items, length, number) => {
    if (items.comments.length > length) {
      for (let i = number; i < length; i++) {
        fragment.append(renderComments(items, i));
        commentsLoader.classList.remove(`hidden`);
      }
    } else {
      for (let i = number; i < items.comments.length; i++) {
        fragment.append(renderComments(items, i));
        commentsLoader.classList.add(`hidden`);
      }
    }
    commentsUl.append(fragment);
    bigPicture.classList.remove(`hidden`);
  };

  const showComments = (itemsList) => {
    removeItems(itemsList);
    createComments(itemsList, UPLOAD_COUNT, uploadNumber);
  };

  let uploadComments = (itemsList) => {
    commentsUl.innerHTML = ``;
    uploadNumber = uploadNumber + UPLOAD_COUNT;
    let uploadLength = uploadNumber + UPLOAD_COUNT;
    createComments(itemsList, uploadLength, uploadNumber);
  };

  let removeItems = (param) => {
    commentsLoader.addEventListener(`click`, () => {
      if (param !== null) {
        uploadComments(param);
      }
    });

    closeUsersPopup.addEventListener(`click`, () => {
      closePhoto(commentsUl);
      param = null;
      uploadNumber = 0;
    });
  };

  socialCommentCount.classList.add(`hidden`);
  const closeUsersPopup = document.querySelector(`.big-picture__cancel`);

  const closePhoto = (elem) => {
    bigPicture.classList.add(`hidden`);
    elem.innerHTML = ``;
  };

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      closePhoto(commentsUl);
    }
  });

  window.picture = {
    showComments,
    uploadComments
  };

})();
