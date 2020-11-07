'use strict';

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

  const method = data ? POST : GET;

  xhr.open(method, Url[method]);

  if (method === POST) {
    xhr.send(data);
  } else {
    xhr.send();
  }

};


