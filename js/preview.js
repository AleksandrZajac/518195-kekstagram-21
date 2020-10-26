'use strict';

(() => {

  const body = document.querySelector(`body`);
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
  const main = document.querySelector(`main`);
  const template = document.querySelector(`#success`)
.content.
querySelector(`.success`);
  const element = template.cloneNode(true);
  main.append(element);
  const success = document.querySelector(`.success`);
  success.classList.add(`hidden`);
  const successButtonClose = document.querySelector(`.success__button`);

  const openPopup = () => {
    window.photo.uploadPhoto();
    imgUploadOverlay.classList.remove(`hidden`);
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
      success.classList.add(`hidden`);
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
      effectTypes = {
        color: `none`
      };
    },
    chrome: () => {
      imgUploadPreview.ClassName = `effects__preview--chrome`;
      imgUploadPreview.style.filter = `grayscale(1)`;
      effectTypes = {
        color: (shift) => {
          imgUploadPreview.style.filter = `grayscale(${(effectLevelPin.offsetLeft - shift) / 450})`;
        }
      };
    },
    sepia: () => {
      imgUploadPreview.ClassName = `effects__preview--sepia`;
      imgUploadPreview.style.filter = `sepia(1)`;
      effectTypes = {
        color: (shift) => {
          imgUploadPreview.style.filter = `sepia(${(effectLevelPin.offsetLeft - shift) / 450})`;
        }
      };
    },
    marvin: () => {
      imgUploadPreview.ClassName = `effects__preview--marvin`;
      imgUploadPreview.style.filter = `invert(100%)`;
      effectTypes = {
        color: (shift) => {
          imgUploadPreview.style.filter = `invert(${(effectLevelPin.offsetLeft - shift) / 4.5}%)`;
        }
      };
    },
    phobos: () => {
      imgUploadPreview.classList = `effects__preview--phobos`;
      imgUploadPreview.style.filter = `blur(3px)`;
      effectTypes = {
        color: (shift) => {
          imgUploadPreview.style.filter = `blur(${(effectLevelPin.offsetLeft - shift) / 150}px)`;
        }
      };
    },
    heat: () => {
      imgUploadPreview.ClassName = `effects__preview--heat`;
      imgUploadPreview.style.filter = `brightness(3)`;
      effectTypes = {
        color: (shift) => {
          imgUploadPreview.style.filter = `brightness(${1 + (effectLevelPin.offsetLeft - shift) / 225})`;
        }
      };
    }
  };

  let previewHandler = (evt) => {
    filtersTypes[evt.target.value]();
    defaultValues.slider();
    if (effectTypes.color !== `none`) {
      viewEffectLevel.classList.remove(`hidden`);
    } else {
      viewEffectLevel.classList.add(`hidden`);
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

  const onMouseMove = (moveEvt) => {
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
      const valueCount = effectLevelPin.style.left.length - 2;
      const pinValue = effectLevelPin.style.left.substring(0, valueCount);
      effectLevelValue.value = pinValue;
      effectTypes.color(shift.x);
    }
  };

  let onMouseUp = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  let clearForm = () => {
    window.photo.fileChooser.value = ``;
    window.validate.hashtagInput.value = ``;
    window.validate.comments.value = ``;
  };

  const successMessage = () => {
    success.classList.remove(`hidden`);
  };

  const closeSuccessMessage = () => {
    success.classList.add(`hidden`);
  };

  let form = document.querySelector(`.img-upload__form`);
  form.addEventListener(`submit`, (evt) => {
    window.upload(new FormData(form), () => {
      closePopup();
      clearForm();
      successMessage();
      successButtonClose.addEventListener(`click`, () => {
        closeSuccessMessage();
      });
    });
    evt.preventDefault();
  });

})();
