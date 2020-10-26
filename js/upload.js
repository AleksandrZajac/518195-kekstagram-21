'use strict';

(() => {

  const URL = `https://21.javascript.pages.academy/kekstagram`;

  window.upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      onSuccess(xhr.response);
    });

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

})();
