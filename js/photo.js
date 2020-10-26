'use strict';

(() => {

  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

  const fileChooser = document.querySelector(`#upload-file`);
  const preview = document.querySelector(`.img-upload__preview img`);

  let uploadPhoto = () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener(`load`, () => {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  window.photo = {
    uploadPhoto,
    fileChooser
  };


})();
