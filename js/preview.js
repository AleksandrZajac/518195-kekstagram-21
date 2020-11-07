'use strict';

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
