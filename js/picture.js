"use strict";

const COMMENT_LIMIT_COUNT = 5;
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture
    .querySelector(`.big-picture__img`)
    .querySelector(`img`);
const likesCount = bigPicture.querySelector(`.likes-count`);
const commentsContainer = document.querySelector(`.social__comments`);
const fragment = document.createDocumentFragment();
const commentsLoader = document.querySelector(`.comments-loader`);
const commentsTemplate = document
    .querySelector(`#social__comment`)
    .content.querySelector(`.social__comment`);
const postDescription = document.querySelector(`.social__caption`);
const socialCommentCount = document.querySelector(`.social__comment-count`);

const removeCommentsControl = () => {
  commentsLoader.removeEventListener(`click`, showNextCommentsBlock);
  closeUsersPopup.removeEventListener(`click`, closePhoto);
};

const addCommentsControl = () => {
  commentsLoader.addEventListener(`click`, showNextCommentsBlock);
  closeUsersPopup.addEventListener(`click`, closePhoto);
};

const clearCommentsContainer = () => {
  commentsContainer.innerHTML = null;
};

const renderPhoto = ({url, description, likes}) => {
  bigPictureImg.src = url;
  postDescription.textContent = description;
  likesCount.textContent = likes;
  bigPicture.classList.remove(`hidden`);
};

const renderComments = (comment) => {
  const commentsElement = commentsTemplate.cloneNode(true);
  const image = commentsElement.querySelector(`.social__picture`);
  const socialText = commentsElement.querySelector(`.social__text`);

  socialText.textContent = comment.message;
  image.src = comment.avatar;
  return commentsElement;
};

const showComments = ({comments}, limitComments) => {
  clearCommentsContainer();

  for (let i = 0; i < limitComments; i++) {
    fragment.append(renderComments(comments[i]));
    commentsLoader.classList.remove(`hidden`);
  }

  commentsContainer.append(fragment);
};

let nextCommentIndex = 0;
let currentPostItem = null;

const show = (postItem) => {
  nextCommentIndex = 0;
  currentPostItem = postItem;
  addCommentsControl();
  renderPhoto(postItem);
  showNextCommentsButton();
  showNextCommentsBlock();
};

const closePhoto = () => {
  bigPicture.classList.add(`hidden`);
  clearCommentsContainer();
  removeCommentsControl();
};

const hiddenNextCommentsButton = () => {
  commentsLoader.classList.add(`hidden`);
};

const showNextCommentsButton = () => {
  commentsLoader.classList.remove(`hidden`);
};

const showNextCommentsBlock = () => {
  const {
    comments: {length},
  } = currentPostItem;

  const limitComments =
      nextCommentIndex + COMMENT_LIMIT_COUNT > length
        ? length
        : nextCommentIndex + COMMENT_LIMIT_COUNT;
  showComments(currentPostItem, limitComments);
  nextCommentIndex = limitComments;
  if (nextCommentIndex === length) {
    hiddenNextCommentsButton();
  }
};

socialCommentCount.classList.add(`hidden`);
const closeUsersPopup = document.querySelector(`.big-picture__cancel`);

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Escape`) {
    closePhoto();
  }
});

window.picture = {
  show,
};
