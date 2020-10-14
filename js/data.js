'use strict';

(() => {

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

  const randomMinMaxRange = (arrMinMaxNumber) => {
    let rand = arrMinMaxNumber[0] + Math.random() * (arrMinMaxNumber[1] + 1 - arrMinMaxNumber[0]);
    return Math.floor(rand);
  };

  const arrayShuffle = (arr) => {
    const shuffle = arr.sort(() => Math.round(Math.random() * 100) - 50);
    return shuffle[0];
  };

  const arrayShuffleMessages = (arrCommentsMessage, number) => {
    if (number <= arrCommentsMessage.length) {
      const clonArrCommentsMessage = arrCommentsMessage.slice();
      const shuffle = clonArrCommentsMessage.sort(() => Math.round(Math.random() * 100) - 50);
      const randomInteger = randomMinMaxRange([1, number]);
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

  window.data = {
    photos: createArrPhotos(PHOTOS_URL_RANGE, PHOTOS_DESCRIPTION, PHOTOS_LIKES_RANGE)
  };

})();
