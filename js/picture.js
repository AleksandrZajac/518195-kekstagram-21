'use strict';

(() => {

  const bigPicture = document.querySelector(`.big-picture`);
  const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
  const likesCount = bigPicture.querySelector(`.likes-count`);
  const commentsCount = bigPicture.querySelector(`.comments-count`);
  const commentsUl = document.querySelector(`.social__comments`);
  const imgDimensions = {
    width: `35`,
    height: `35`
  };
  const { width, height } = imgDimensions;
  const fragment = document.createDocumentFragment();

  const commentsTemplate = document.querySelector(`#social__comment`)
    .content
    .querySelector(`.social__comment`);
  const description = document.querySelector(`.social__caption`);
  const socialCommentCount = document.querySelector(`.social__comment-count`);
  const commentsLoader = document.querySelector(`.comments-loader`);
  const commentsSection = (picturesNumber) => {
    const renderComments = (comments) => {
      const commentsElement = commentsTemplate.cloneNode(true);
      const image = commentsElement.querySelector(`.social__picture`);
      const socialText = commentsElement.querySelector(`.social__text`);
      image.src = `img/avatar-${comments.avatar}.svg`;
      image.alt = comments.name;
      image.width = width;
      image.height = height;
      socialText.textContent = comments.message;
      return commentsElement;
    };

    for (let i = 0; i < window.data.photos[picturesNumber].comments.length; i++) {
      fragment.append(renderComments(window.data.photos[picturesNumber].comments[i]));
    }
    commentsUl.append(fragment);
  };

  socialCommentCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);

  const closeUsersPopup = document.querySelector(`.big-picture__preview`);
  const pictures = document.querySelectorAll(`.picture`);

  const closePhoto = (elem) => {
    bigPicture.classList.add(`hidden`);
    elem.innerHTML = '';
  }

  let openUsersPopupHandler = (evt) => {
    if (evt.target.matches(`img`)) {
      bigPicture.classList.remove(`hidden`);
      bigPictureImg.src = evt.target.src;
      bigPictureImg.alt = evt.target.alt;
    }
  };

  for (let i = 0; i < pictures.length; i++) {
    pictures[i].addEventListener(`click`, (evt) => {
      openUsersPopupHandler(evt);
      likesCount.textContent = window.data.photos[i].likes;
      commentsCount.textContent = window.data.photos[i].comments.length;
      description.textContent = window.data.photos[i].description;
      commentsSection(i);
    });
  }

  closeUsersPopup.addEventListener(`click`, () => {
    closePhoto(commentsUl);
  });

  document.addEventListener(`keydown`, (evt) => {
    closePhoto(commentsUl);
  });

})();