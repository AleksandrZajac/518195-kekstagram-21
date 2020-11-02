'use strict';

(() => {

  const URL = {
    POST: `https://21.javascript.pages.academy/kekstagram`,
    GET: `https://21.javascript.pages.academy/kekstagram/data`
  };

  const GET = `GET`;
  const POST = `POST`;

  const StatusCode = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 3000;

  window.http = (onSuccess, onError, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + ` мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    const method = data ? POST : GET;

    xhr.open(method, URL[method]); // Url - перечисление

    if (method === POST) {
      xhr.send(data);
    } else {
      xhr.send();
    }

  };

})();
