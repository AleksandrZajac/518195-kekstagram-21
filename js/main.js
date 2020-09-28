'use strict';

const PHOTOS_URL_RANGE = [1, 25];
const PHOTOS_DESCRIPTION = `Фото`;
const PHOTOS_LIKES_RANGE = [15, 200];
const COMMENTS_AVATAR_RANGE = [1, 6];
const COMMENTS_NAMES = [`Иван`, `Василий`, `Юра`, `Миша`, `Маша`, `Оля`];
const COMMENTS_RANDOM_RANGE = [1, 7];
const COMMENTS_MESSAGES_RANDOM_COUNT = 2;
const COMMENTS_MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];

const randomMinMaxRange = (arrMinMaxNumber) => {
  const randomNumber = arrMinMaxNumber[0] + Math.floor(Math.random() * arrMinMaxNumber[1]);
  return randomNumber;
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
  for (let i = 0; i < arrayShuffle(commentsRandomRange); i++) {
    const objComments = {};
    objComments.avatar = arrayShuffle(commentsAvatarRange);
    objComments.message = arrayShuffleMessages(commentsMessages, COMMENTS_MESSAGES_RANDOM_COUNT);
    objComments.name = arrayShuffle(commentsNames);
    arrComments[i] = objComments;
  }
  return arrComments;
};

const createArrPhotos = (photosNumber, photosDescription, photoLikesRandomNumber, arrRandomComments) => {
  const arrPhoto = [];
  for (let i = 0; i < photosNumber[1]; i++) {
    const objPhotoItem = {};
    objPhotoItem.url = `photos/${i + 1}.jpg`;
    objPhotoItem.description = photosDescription;
    objPhotoItem.likes = randomMinMaxRange(photoLikesRandomNumber);
    objPhotoItem.comments = [];
    const arrComments = arrRandomComments(COMMENTS_AVATAR_RANGE, COMMENTS_MESSAGES, COMMENTS_NAMES, COMMENTS_RANDOM_RANGE);
    objPhotoItem.comments[arrComments.length] = arrComments;
    arrPhoto[i] = objPhotoItem;
  }
  return arrPhoto;
};

const picturesSection = document.querySelector(`.pictures`);
const sectionHeading = picturesSection.querySelector(`.pictures__title`);
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

const photos = createArrPhotos(PHOTOS_URL_RANGE, PHOTOS_DESCRIPTION, PHOTOS_LIKES_RANGE, createArrRandomComments);

const fragment = document.createDocumentFragment();
for (let i = 0; i < photos.length; i++) {
  fragment.append(renderPhoto(photos[i]));
}
picturesSection.append(fragment);
