'use strict';

const PHOTOS_URL_RANGE = [1, 25];
const PHOTOS_DESCRIPTION = `Фото`;
const PHOTOS_LIKES_RANGE = [15, 200];
const COMMENTS_AVATAR_RANGE = [1, 6];
const COMMENTS_NAMES = [`Иван`, `Василий`, `Юра`, `Миша`, `Маша`, `Оля`];
const COMMENTS_RANDOM_RANGE = [1, 20];
const COMMENTS_MESSAGES_RANDOM_COUNT = 2;
const COMMENTS_MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];
const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
const likesCount = bigPicture.querySelector(`.likes-count`);
const commentsCount = bigPicture.querySelector(`.comments-count`);
const commentsUl = document.querySelector(`.social__comments`);
const imgDimensions = {
  width: `35`,
  height: `35`
};
const {width, height} = imgDimensions;
const commentsTemplate = document.querySelector(`#social__comment`)
  .content
  .querySelector(`.social__comment`);
const description = document.querySelector(`.social__caption`);
const socialCommentCount = document.querySelector(`.social__comment-count`);
const commentsLoader = document.querySelector(`.comments-loader`);
const picturesSection = document.querySelector(`.pictures`);
const sectionHeading = picturesSection.querySelector(`.pictures__title`);

const randomMinMaxRange = (arrMinMaxNumber) => {
  let rand = arrMinMaxNumber[0] + Math.random() * (arrMinMaxNumber[1] + 1 - arrMinMaxNumber[0]);
  return Math.floor(rand);
};

const arrayShuffle = (arr) => {
  const shuffle = arr.sort(() => Math.round(Math.random() * 100) - 50);
  return shuffle[0];
};

const arrayShuffleMessages = (arrCommentsMessage, n) => {
  if (n <= arrCommentsMessage.length) {
    const clonArrCommentsMessage = arrCommentsMessage.slice();
    const shuffle = clonArrCommentsMessage.sort(() => Math.round(Math.random() * 100) - 50);
    const randomInteger = randomMinMaxRange([1, n]);
    let arr = ``;
    for (let i = 0; i < randomInteger; i++) {
      arr = arr + shuffle[i] + ` `;
    }
    return arr;
  } else {
    return `Число n не может быть больше длины массива arr`;
  }
};

const createArrRandomComments = (commentsAvatarRange, commentsMessages, commentsNames, commentsRandomRange) => {
  const arrComments = [];
  for (let i = 0; i < randomMinMaxRange(commentsRandomRange); i++) {
    const objComments = {};
    objComments.avatar = randomMinMaxRange(commentsAvatarRange);
    objComments.message = arrayShuffleMessages(commentsMessages, COMMENTS_MESSAGES_RANDOM_COUNT);
    objComments.name = arrayShuffle(commentsNames);
    arrComments[i] = objComments;
  }
  return arrComments;
};

const createArrPhotos = (photosNumber, photosDescription, photoLikesRandomNumber) => {
  const arrPhoto = [];
  for (let i = 0; i < photosNumber[1]; i++) {
    const objPhotoItem = {};
    objPhotoItem.url = `photos/${i + 1}.jpg`;
    objPhotoItem.description = photosDescription;
    objPhotoItem.likes = randomMinMaxRange(photoLikesRandomNumber);
    const arrComments = createArrRandomComments(COMMENTS_AVATAR_RANGE, COMMENTS_MESSAGES, COMMENTS_NAMES, COMMENTS_RANDOM_RANGE);
    objPhotoItem.comments = arrComments;
    arrPhoto[i] = objPhotoItem;
  }
  return arrPhoto;
};

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

const photos = createArrPhotos(PHOTOS_URL_RANGE, PHOTOS_DESCRIPTION, PHOTOS_LIKES_RANGE);

const fragment = document.createDocumentFragment();
for (let i = 0; i < photos.length; i++) {
  fragment.append(renderPhoto(photos[i]));
}
picturesSection.append(fragment);

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

  for (let i = 0; i < photos[picturesNumber].comments.length; i++) {
    fragment.append(renderComments(photos[picturesNumber].comments[i]));
  }
  commentsUl.append(fragment);
};


socialCommentCount.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);

const closeUsersPopup = document.querySelector(`.big-picture__preview`);
const pictures = document.querySelectorAll(`.picture`);

const closePhoto = (elem) => {
  bigPicture.classList.add(`hidden`);
  elem.innerHTML = ``;
};

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
    likesCount.textContent = photos[i].likes;
    commentsCount.textContent = photos[i].comments.length;
    description.textContent = photos[i].description;
    commentsSection(i);
  });
}

closeUsersPopup.addEventListener(`click`, () => {
  closePhoto(commentsUl);
});

document.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Escape`) {
    closePhoto(commentsUl);
  }
});
