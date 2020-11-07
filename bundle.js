/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/http.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const Url = {
  POST: `https://21.javascript.pages.academy/kekstagram`,
  GET: `https://21.javascript.pages.academy/kekstagram/data`
};

const GET = `GET`;
const POST = `POST`;

const StatusCode = {
  OK: 200
};

const TIMEOUT_IN_MS = 3000;

window.http = (successHandler, errorHandler, data) => {
  const method = data ? POST : GET;
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;
  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      successHandler(xhr.response);
    } else {
      errorHandler(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, () => {
    errorHandler(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, () => {
    errorHandler(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(method, Url[method]);

  if (method === POST) {
    xhr.send(data);
  } else {
    xhr.send();
  }
};

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500;

window.debounce = (cb) => {
  let lastTimeout = null;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

})();

(() => {
/*!***********************!*\
  !*** ./js/gallery.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const picturesSection = document.querySelector(`.pictures`);
const sectionHeading = picturesSection.querySelector(`.pictures__title`);
const fragment = document.createDocumentFragment();
const picturePhotoTemplate = document.querySelector(`#picture`)
    .content
    .querySelector(`.picture`);
sectionHeading.classList.remove(`visually-hidden`);

const renderPhoto = (photo) => {
  const photoElement = picturePhotoTemplate.cloneNode(true);
  const image = photoElement.querySelector(`.picture__img`);
  const comments = photoElement.querySelector(`.picture__comments`);
  const like = photoElement.querySelector(`.picture__likes`);

  image.src = photo.url;
  image.alt = `Photo`;
  comments.textContent = photo.comments.length;
  like.textContent = photo.like;
  return photoElement;
};

const removePictures = () => {
  const pictures = picturesSection.querySelectorAll(`.picture`);
  for (let i = 0; i < pictures.length; i++) {
    picturesSection.removeChild(pictures[i]);
  }
};

const createGallery = (items, length) => {
  removePictures();
  let itemsLength = items.length;
  if (length) {
    itemsLength = length;
  }
  for (let i = 0; i < itemsLength; i++) {
    const photo = renderPhoto(items[i]);
    photo.addEventListener(`click`, () => {
      window.picture.show(items[i]);
    });
    fragment.append(photo);
  }
  picturesSection.append(fragment);
};

window.gallery = {
  createGallery
};

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const RANDOM_LENGTH = 10;

const imgFilters = document.querySelector(`.img-filters`);
const defaultButton = document.querySelector(`#filter-default`);
const randomButton = document.querySelector(`#filter-random`);
const discussedButton = document.querySelector(`#filter-discussed`);
const filterButtons = document.querySelectorAll(`.img-filters__button`);

const arrayShuffle = (arr) => {
  const shuffle = arr.sort(() => Math.round(Math.random() * 100) - 50);
  return shuffle;
};

const showDefaultGallery = window.debounce((itemsGallery) => {
  window.gallery.createGallery(itemsGallery);
  if (itemsGallery) {
    imgFilters.classList.remove(`img-filters--inactive`);
  }
});

const showRandomGallery = window.debounce((itemsGallery) => {
  const clon = itemsGallery.slice();
  const random = arrayShuffle(clon);
  window.gallery.createGallery(random, RANDOM_LENGTH);
});

const showDiscussedGallery = window.debounce((itemsGallery) => {
  const clonArr = itemsGallery.slice();
  clonArr.sort((a, b) => b.comments.length - a.comments.length);
  window.gallery.createGallery(clonArr);
});

const clearButtonActive = () => {
  for (let i = 0; i < filterButtons.length; i++) {
    if (filterButtons[i].classList.contains(`img-filters__button--active`)) {
      filterButtons[i].classList.remove(`img-filters__button--active`);
    }
  }
};

const successHandler = (itemsList) => {
  showDefaultGallery(itemsList);

  defaultButton.addEventListener(`click`, () => {
    showDefaultGallery(itemsList);
    clearButtonActive();
    defaultButton.classList.add(`img-filters__button--active`);
  });

  randomButton.addEventListener(`click`, () => {
    showRandomGallery(itemsList);
    clearButtonActive();
    randomButton.classList.add(`img-filters__button--active`);
  });

  discussedButton.addEventListener(`click`, () => {
    showDiscussedGallery(itemsList);
    clearButtonActive();
    discussedButton.classList.add(`img-filters__button--active`);
  });
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

(() => {
/*!***********************!*\
  !*** ./js/picture.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const UPLOAD_COUNT = 5;

const bigPicture = document.querySelector(`.big-picture`);
const bigPictureImg = bigPicture.querySelector(`.big-picture__img`).querySelector(`img`);
const likesCount = bigPicture.querySelector(`.likes-count`);
const commentList = document.querySelector(`.social__comments`);
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

const createComments = (items, length, number) => {
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
  commentList.append(fragment);
  bigPicture.classList.remove(`hidden`);
};

const show = (itemsList) => {
  removeItems(itemsList);
  createComments(itemsList, UPLOAD_COUNT, uploadNumber);
};

let uploadNumber = 0;

const uploadComments = (itemsList) => {
  commentList.innerHTML = ``;
  uploadNumber = uploadNumber + UPLOAD_COUNT;
  const uploadLength = uploadNumber + UPLOAD_COUNT;
  createComments(itemsList, uploadLength, uploadNumber);
};

const removeItems = (param) => {
  commentsLoader.addEventListener(`click`, () => {
    if (param !== null) {
      uploadComments(param);
    }
  });

  closeUsersPopup.addEventListener(`click`, () => {
    closePhoto(commentList);
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
    closePhoto(commentList);
  }
});

window.picture = {
  show,
  uploadComments
};


})();

(() => {
/*!*********************!*\
  !*** ./js/photo.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileChooser = document.querySelector(`#upload-file`);
const preview = document.querySelector(`.img-upload__preview img`);
const effectsPreview = document.querySelectorAll(`.effects__preview`);

const upload = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, () => {
      preview.src = reader.result;
      for (let i = 0; i < effectsPreview.length; i++) {
        effectsPreview[i].style.backgroundImage = `url(${reader.result})`;
      }
    });
    reader.readAsDataURL(file);
  }
};

window.photo = {
  upload,
  fileChooser
};

})();

(() => {
/*!************************!*\
  !*** ./js/validate.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 20;
const COMMENTS_MAX_LENGTH = 140;
const MAX_HASHTAGS = 5;

const hashtagInput = document.querySelector(`.text__hashtags`);
const comment = document.querySelector(`.text__description`);

const checkForUniqueness = (hastags) => {
  return [...new Set(hastags)];
};

const changeToLowerCase = () => {
  const tags = hashtagInput.value.toLowerCase().split(` `).filter((hashtag) => hashtag !== ``);
  return tags;
};

hashtagInput.addEventListener(`input`, () => {
  const regex = /^[\w\d]*$/;
  const hashtags = changeToLowerCase();
  const hashtagsUnique = checkForUniqueness(hashtags);
  const regexCheck = [];

  for (let i = 0; i < hashtags.length; i++) {
    regexCheck[i] = hashtags[i];

    if (hashtags[i][0] === `#`) {
      const arrStr = regexCheck[i].split(``);
      arrStr.splice(0, 1);
      regexCheck[i] = arrStr.join(``);
    }

    switch (true) {
      case hashtags[i][0] !== `#`:
        hashtagInput.setCustomValidity(`хэш - тег начинается с символа #(решётка)`);
        break;
      case hashtags[i].length < MIN_NAME_LENGTH && hashtags[i][0] === `#` && hashtags.length <= 5:
        hashtagInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - hashtags[i].length) + ` симв.`);
        break;
      case regex.test(regexCheck.join(``)) === false:
        hashtagInput.setCustomValidity(`строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы`);
        break;
      case hashtags[i].length > MAX_NAME_LENGTH:
        hashtagInput.setCustomValidity(`Удалите лишние ` + (hashtags[i].length - MAX_NAME_LENGTH) + ` симв. одного хэштега`);
        break;
      case hashtagsUnique.length < hashtags.length:
        hashtagInput.setCustomValidity(`Oдин и тот же хэш-тег не может быть использован дважды.`);
        break;
      case hashtags.length > MAX_HASHTAGS && hashtags[i][0] === `#`:
        hashtagInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов`);
        break;
      default:
        hashtagInput.setCustomValidity(``);
        break;
    }
  }
  hashtagInput.reportValidity();
});

comment.addEventListener(`input`, () => {
  if (comment.value.length > COMMENTS_MAX_LENGTH) {
    comment.setCustomValidity(`Длина комментария не может быть больше 140 символов.`);
  } else {
    comment.setCustomValidity(``);
  }
  comment.reportValidity();
});

window.validate = {
  hashtagInput,
  comment
};

})();

(() => {
/*!***********************!*\
  !*** ./js/preview.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const {body} = document;
const imgUploadOverlay = body.querySelector(`.img-upload__overlay`);
const uploadCancel = body.querySelector(`#upload-cancel`);
const viewEffectLevel = body.querySelector(`.img-upload__effect-level`);
const imgUploadScale = body.querySelector(`.img-upload__scale`);
const scaleControlSmaller = imgUploadScale.querySelector(`.scale__control--smaller`);
const scaleControlBigger = imgUploadScale.querySelector(`.scale__control--bigger`);
const scaleControlValue = imgUploadScale.querySelector(`.scale__control--value`);
const imgUloadPreview = body.querySelector(`.img-upload__preview`);
const imgEffectLevel = body.querySelector(`.effect-level__line`);
const effectLevelPin = imgEffectLevel.querySelector(`.effect-level__pin`);
const effectLevelDepth = imgEffectLevel.querySelector(`.effect-level__depth`);
const effectLevelValue = body.querySelector(`.effect-level__value`);
const defaultValues = {
  slider: () => {
    effectLevelPin.style.left = `450px`;
    effectLevelDepth.style.width = `100%`;
  },
  zoom: () => {
    scaleControlValue.value = `100%`;
    scaleControlValue.value = `100%`;
    imgUloadPreview.style.transform = `scale(1)`;
  }
};
const effectList = body.querySelector(`.effects__list`);
const imgUploadPreview = body.querySelector(`.img-upload__preview img`);
let startCoords = {};
const pinLevel = 450;
const target = {
  value: ``
};

const openPopup = () => {
  window.photo.upload();
  imgUploadOverlay.classList.remove(`hidden`);
  viewEffectLevel.classList.add(`hidden`);
  imgUploadPreview.style.filter = `none`;
  defaultValues.slider();
  defaultValues.zoom();
};

const closePopup = () => {
  imgUploadOverlay.classList.add(`hidden`);
  body.classList.remove(`modal-open`);
};

const escapePopup = (escapeEvt) => {
  const isEscape = escapeEvt.key === `Escape`;
  const isNotHashtag = !escapeEvt.target.matches(`input[class="text__hashtags"]`);
  const isNotDescription = !escapeEvt.target.matches(`textarea[class="text__description"]`);

  if (isEscape && isNotHashtag && isNotDescription) {
    escapeEvt.preventDefault();
    closePopup();
  }
};

const changeScale = (parameter) => {
  scaleControlValue.value = `${parameter}%`;
  imgUloadPreview.style.transform = `scale(${parameter / 100})`;
};

const scaleSmaller = () => {
  if (+scaleControlValue.value.slice(0, scaleControlValue.value.length - 1) > 25) {
    const step = Number(scaleControlValue.value.slice(0, scaleControlValue.value.length - 1)) - 25;
    changeScale(step);
  }
};

const scaleBigger = () => {
  if (+scaleControlValue.value.slice(0, scaleControlValue.value.length - 1) < 100) {
    const step = Number(scaleControlValue.value.slice(0, scaleControlValue.value.length - 1)) + 25;
    changeScale(step);
  }
};

scaleControlSmaller.addEventListener(`click`, () => {
  scaleSmaller();
});

scaleControlBigger.addEventListener(`click`, () => {
  scaleBigger();
});

window.photo.fileChooser.addEventListener(`change`, () => {
  openPopup();
});

uploadCancel.addEventListener(`click`, () => {
  closePopup();
});

document.addEventListener(`keydown`, (evt) => {
  escapePopup(evt);
});

const filtersTypes = {
  none: () => {
    imgUploadPreview.removeAttribute(`class`);
    imgUploadPreview.style.filter = `none`;
  },
  chrome: (param) => {
    imgUploadPreview.ClassName = `effects__preview--chrome`;
    imgUploadPreview.style.filter = `grayscale(${(effectLevelPin.offsetLeft + param) / 450})`;
  },
  sepia: (param) => {
    imgUploadPreview.ClassName = `effects__preview--sepia`;
    imgUploadPreview.style.filter = `sepia(${(effectLevelPin.offsetLeft + param) / 450})`;
  },
  marvin: (param) => {
    imgUploadPreview.ClassName = `effects__preview--marvin`;
    imgUploadPreview.style.filter = `invert(${(effectLevelPin.offsetLeft + param) / 4.5}%)`;
  },
  phobos: (param) => {
    imgUploadPreview.classList = `effects__preview--phobos`;
    imgUploadPreview.style.filter = `blur(${(effectLevelPin.offsetLeft + param) / 150}px)`;
  },
  heat: (param) => {
    imgUploadPreview.ClassName = `effects__preview--heat`;
    imgUploadPreview.style.filter = `brightness(${1 + (effectLevelPin.offsetLeft + param) / 225})`;
  }
};

const previewHandler = (evt) => {
  filtersTypes[evt.target.value](pinLevel);
  target.value = evt.target.value;
  defaultValues.slider();
  if (evt.target.value !== `none`) {
    viewEffectLevel.classList.remove(`hidden`);
  } else {
    viewEffectLevel.classList.add(`hidden`);
  }
};

effectList.addEventListener(`change`, (evt) => {
  previewHandler(evt);
});

effectLevelPin.addEventListener(`mousedown`, (evt) => {
  startCoords = {
    x: evt.clientX,
  };
  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
});

const mouseMoveHandler = (evt) => {
  const shift = {
    x: startCoords.x - evt.clientX,
  };

  startCoords = {
    x: evt.clientX,
  };

  if (effectLevelPin.offsetLeft - shift.x > 0 && effectLevelPin.offsetLeft - shift.x < 450) {
    effectLevelPin.style.left = `${effectLevelPin.offsetLeft - shift.x}px`;
    effectLevelDepth.style.width = `${(effectLevelPin.offsetLeft - shift.x) / 4.5}%`;
    const valueCount = effectLevelPin.style.left.length - 2;
    const pinValue = effectLevelPin.style.left.substring(0, valueCount);
    effectLevelValue.value = pinValue;
    filtersTypes[target.value](-shift.x);
  }
};

const mouseUpHandler = () => {
  document.removeEventListener(`mousemove`, mouseMoveHandler);
  document.removeEventListener(`mouseup`, mouseUpHandler);
};

window.preview = {
  closePopup
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const main = document.querySelector(`main`);
const errorStyles = [`#error`, `.error`];
const successStyles = [`#success`, `.success`];

const clearForm = () => {
  window.photo.fileChooser.value = ``;
  window.validate.hashtagInput.value = ``;
  window.validate.comment.value = ``;
};

const createTemplate = (id, className) => {
  const template = document.querySelector(id)
      .content.
      querySelector(className);
  const element = template.cloneNode(true);
  main.append(element);
  const error = document.querySelector(className);
  error.classList.add(`hidden`);
};

createTemplate(errorStyles[0], errorStyles[1]);
createTemplate(successStyles[0], successStyles[1]);

const error = document.querySelector(`.error`);
const errorButtonClose = document.querySelector(`.error__button`);
const success = document.querySelector(`.success`);
const successButtonClose = document.querySelector(`.success__button`);
const successInner = document.querySelector(`.success__inner`);
const errorInner = document.querySelector(`.error__inner`);

const successMessage = () => {
  success.classList.remove(`hidden`);
};

const errorMessage = () => {
  error.classList.remove(`hidden`);
};

const closeSuccessMessage = () => {
  success.classList.add(`hidden`);
};

const closeErrorMessage = () => {
  error.classList.add(`hidden`);
};

const form = document.querySelector(`.img-upload__form`);

const successHandler = () => {
  window.preview.closePopup();
  clearForm();
  successMessage();
  successButtonClose.addEventListener(`click`, () => {
    closeSuccessMessage();
  });
  success.addEventListener(`click`, (evtSuccess) => {
    if (evtSuccess.target !== successInner) {
      closeSuccessMessage();
    }
  });
};

const errorHandler = (errors) => {
  const errorTitle = document.querySelector(`.error__title`);
  errorTitle.textContent = errors;
  window.preview.closePopup();
  clearForm();
  errorMessage();
  errorButtonClose.addEventListener(`click`, () => {
    closeErrorMessage();
  });
  error.addEventListener(`click`, (evtError) => {
    if (evtError.target !== errorInner) {
      closeErrorMessage();
    }
  });
};

form.addEventListener(`submit`, (evt) => {
  window.http(successHandler, errorHandler, new FormData(form));
  evt.preventDefault();
});

})();

/******/ })()
;