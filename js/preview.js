'use strict';

(() => {

  const body = document.querySelector(`body`);
  const uploadOpen = document.querySelector(`#upload-file`);
  const imgUploadOverlay = body.querySelector(`.img-upload__overlay`);
  const uploadCancel = body.querySelector(`#upload-cancel`);
  const viewEffectLevel = body.querySelector(`.img-upload__effect-level`);
  const imgUploadScale = body.querySelector(`.img-upload__scale`);
  const scaleControlSmaller = imgUploadScale.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = imgUploadScale.querySelector(`.scale__control--bigger`);
  const scaleControlValue = imgUploadScale.querySelector(`.scale__control--value`);
  const imgUloadPreview = body.querySelector(`.img-upload__preview`);
  const imgEffectLevel = document.querySelector(`.effect-level__line`);
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
  let effectTypes = {};

  let openPopup = (evt) => {
    evt.preventDefault();
    imgUploadOverlay.classList.remove(`hidden`);
    body.classList.add(`modal-open`);
    viewEffectLevel.classList.add(`hidden`);
    imgUploadPreview.style.filter = `none`;
    defaultValues.slider();
    defaultValues.zoom();
  };

  let closePopup = () => {
    imgUploadOverlay.classList.add(`hidden`);
    body.classList.remove(`modal-open`);
  };

  let escapePopup = (escapeEvt) => {
    const isEscape = escapeEvt.key === `Escape`;
    const isNotHashtag = !escapeEvt.target.matches(`input[class="text__hashtags"]`);
    const isNotDescription = !escapeEvt.target.matches(`textarea[class="text__description"]`);

    if (isEscape && isNotHashtag && isNotDescription) {
      escapeEvt.preventDefault();
      imgUploadOverlay.classList.add(`hidden`);
      body.classList.remove(`modal-open`);
    }
  };

  scaleControlSmaller.addEventListener(`click`, () => {
    if (+scaleControlValue.value.slice(0, scaleControlValue.value.length - 1) > 25) {
      const step = +scaleControlValue.value.slice(0, scaleControlValue.value.length - 1) - 25;
      scaleControlValue.value = `${step}%`;
      imgUloadPreview.style.transform = `scale(${step / 100})`;
    }
  });

  scaleControlBigger.addEventListener(`click`, () => {
    if (+scaleControlValue.value.slice(0, scaleControlValue.value.length - 1) < 100) {
      const step = +scaleControlValue.value.slice(0, scaleControlValue.value.length - 1) + 25;
      scaleControlValue.value = `${step}%`;
      imgUloadPreview.style.transform = `scale(${step / 100})`;
    }
  });

  uploadOpen.addEventListener(`click`, (evt) => {
    openPopup(evt);
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
      effectTypes = {
        color: `none`
      };
    },
    chrome: {
      default: () => {
        imgUploadPreview.ClassName = `effects__preview--chrome`;
        imgUploadPreview.style.filter = `grayscale(1)`;
        effectTypes = {
          color: `chrome`
        };
      },
      effect: (shift) => {
        imgUploadPreview.style.filter = `grayscale(${(effectLevelPin.offsetLeft - shift) / 450})`;
      }
    },
    sepia: {
      default: () => {
        imgUploadPreview.ClassName = `effects__preview--sepia`;
        imgUploadPreview.style.filter = `sepia(1)`;
        effectTypes = {
          color: `sepia`
        };
      },
      effect: (shift) => {
        imgUploadPreview.style.filter = `invert(${(effectLevelPin.offsetLeft - shift) / 4.5}%)`;
      }
    },
    marvin: {
      default: () => {
        imgUploadPreview.ClassName = `effects__preview--marvin`;
        imgUploadPreview.style.filter = `invert(100%)`;
        effectTypes = {
          color: `marvin`
        };
      },
      effect: (shift) => {
        imgUploadPreview.style.filter = `invert(${(effectLevelPin.offsetLeft - shift) / 4.5}%)`;
      }
    },
    phobos: {
      default: () => {
        imgUploadPreview.ClassName = `effects__preview--phobos`;
        imgUploadPreview.style.filter = `blur(3px)`;
        effectTypes = {
          color: `phobos`
        };
      },
      effect: (shift) => {
        imgUploadPreview.style.filter = `blur(${(effectLevelPin.offsetLeft - shift) / 150}px)`;
      }
    },
    heat: {
      default: () => {
        imgUploadPreview.ClassName = `effects__preview--heat`;
        imgUploadPreview.style.filter = `brightness(3)`;
        effectTypes = {
          color: `heat`
        };
      },
      effect: (shift) => {
        imgUploadPreview.style.filter = `brightness(${1 + (effectLevelPin.offsetLeft - shift.x) / 225})`;
      }
    },
  };

  let previewHandler = (evt) => {
    if (filtersTypes[evt.target.value]) {
      // filtersTypes[evt.target.value]();
      defaultValues.slider();
      if (effectTypes.color !== `none`) {
        viewEffectLevel.classList.remove(`hidden`);
      }
      if (effectTypes.color === `none`) {
        viewEffectLevel.classList.add(`hidden`);
      }
    }
  };

  effectList.addEventListener(`change`, (pinEvt) => {
    previewHandler(pinEvt);
  });

  let startCoords = {};

  effectLevelPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    startCoords = {
      x: evt.clientX,
    };
    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  const onMouseMove = (moveEvt, effect) => {
    moveEvt.preventDefault();
    const shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };

    if (effectLevelPin.offsetLeft - shift.x > 0 && effectLevelPin.offsetLeft - shift.x < 450) {
      effectLevelPin.style.left = `${effectLevelPin.offsetLeft - shift.x}px`;
      effectLevelDepth.style.width = `${(effectLevelPin.offsetLeft - shift.x) / 4.5}%`;
      effectLevelValue.value = effectLevelPin.style.left;

      // filtersTypes.chrome.imgUploadPreview.style.filter = `grayscale(${(effectLevelPin.offsetLeft - shift.x) / 450})`;
      console.log(effect(shift.x));
      // if (effectTypes.color === `sepia`) {
      //   imgUploadPreview.style.filter = `sepia(${(effectLevelPin.offsetLeft - shift.x) / 450})`;
      // }
      // if (effectTypes.color === `marvin`) {
      //   imgUploadPreview.style.filter = `invert(${(effectLevelPin.offsetLeft - shift.x) / 4.5}%)`;
      // }
      // if (effectTypes.color === `phobos`) {
      //   imgUploadPreview.style.filter = `blur(${(effectLevelPin.offsetLeft - shift.x) / 150}px)`;
      // }
      // if (effectTypes.color === `heat`) {
      //   imgUploadPreview.style.filter = `brightness(${1 + (effectLevelPin.offsetLeft - shift.x) / 225})`;
      // }
    }
  };

  let onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

})();
