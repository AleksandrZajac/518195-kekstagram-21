'use strict';

(() => {

  const main = document.querySelector(`main`);
  const errorMes = [`#error`, `.error`];
  const successMes = [`#success`, `.success`];

  const clearForm = () => {
    window.photo.fileChooser.value = ``;
    window.validate.hashtagInput.value = ``;
    window.validate.comments.value = ``;
  };

  const createTemplate = (id, className) => {
    const template = document.querySelector(id)
      .content.
      querySelector(className);
    const element = template.cloneNode(true);
    main.append(element);
    const error = document.querySelector(className);
    error.classList.add(`hidden`);
    return error;
  };
  createTemplate(errorMes[0], errorMes[1]);
  createTemplate(successMes[0], successMes[1]);

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

  let errorHandler = (errors) => {
    const errorTitle = document.querySelector(`.error__title`);
    errorTitle.textContent = errors;
    window.preview.closePopup();
    clearForm();
    errorMessage();
    errorButtonClose.addEventListener(`click`, () => {
      closeErrorMessage();
    });
    error.addEventListener(`click`, (evtSuccess) => {
      if (evtSuccess.target !== errorInner) {
        closeErrorMessage();
      }
    });
  };

  form.addEventListener(`submit`, (evt) => {
    window.http(successHandler, errorHandler, new FormData(form));
    evt.preventDefault();
  });

})();
