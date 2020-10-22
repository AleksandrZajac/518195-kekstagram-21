'use strict';

(() => {

  const URL = `https://21.javascript.pages.academy/kekstagram/data`;

  window.load = function (onSuccess) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.open(`GET`, URL);

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.send();
  };

})();
