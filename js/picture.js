'use strict';

(() => {

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

  let num = 0;
  const show = (itemsList) => {
    const uploadCount = 5;
    if (itemsList.comments.length > uploadCount) {
      for (let i = 0; i < uploadCount; i++) {
        fragment.append(renderComments(itemsList, i));
        commentsLoader.classList.remove(`hidden`);
      }
    } else {
      for (let i = 0; i < itemsList.comments.length; i++) {
        fragment.append(renderComments(itemsList, i));
        commentsLoader.classList.add(`hidden`);
      }
    }
    commentsUl.append(fragment);
    bigPicture.classList.remove(`hidden`);
  };

  let uploadComments = (itemsList) => {
    commentsUl.innerHTML = ``;
    const uploadCount = 5;
    // console.log(uploadCount);
    num = num + uploadCount;
    let uploadLength = num + uploadCount;
    if (itemsList.comments.length > uploadLength) {
      for (let i = num; i < uploadLength; i++) {
        fragment.append(renderComments(itemsList, i));
        commentsLoader.classList.remove(`hidden`);
      }
    } else {
      for (let i = num; i < itemsList.comments.length; i++) {
        fragment.append(renderComments(itemsList, i));
        commentsLoader.classList.add(`hidden`);
      }
    }
    commentsUl.append(fragment);
    bigPicture.classList.remove(`hidden`);
  };

  socialCommentCount.classList.add(`hidden`);
  const closeUsersPopup = document.querySelector(`.big-picture__cancel`);

  const closePhoto = (elem) => {
    bigPicture.classList.add(`hidden`);
    elem.innerHTML = ``;
    num = 0;
    // console.log(num);
  };

  closeUsersPopup.addEventListener(`click`, () => {
    closePhoto(commentsUl);
  });

  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      closePhoto(commentsUl);
    }
  });

  window.picture = {
    show,
    uploadComments
  };

})();
