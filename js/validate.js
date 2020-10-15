'use strict';

(() => {

  const hashtagInput = document.querySelector(`.text__hashtags`);
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 20;
  const COMMENTS_MAX_LENGTH = 140;
  const MAX_HASHTAGS = 5;
  const comments = document.querySelector(`.text__description`);

  let arrHashtgsUnique = (arr) => {
    let result = [];
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
    return result;
  };

  let arrHashTags = () => {
    let strLowerCase = hashtagInput.value.toLowerCase();
    let arr = strLowerCase.split(` `);
    let arrTags = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== ``) {
        arrTags.push(arr[i]);
      }
    }
    return arrTags;
  };

  hashtagInput.addEventListener(`input`, () => {
    let regex = /^[\w\d]*$/;
    let arrHash = arrHashTags();
    let arrUnique = arrHashtgsUnique(arrHash);
    let regexCheck = [];

    for (let i = 0; i < arrHash.length; i++) {
      regexCheck[i] = arrHash[i];
      if (arrHash[i][0] === `#`) {
        let arrStr = regexCheck[i].split(``);
        arrStr.splice(0, 1);
        regexCheck[i] = arrStr.join(``);
      }
      switch (true) {
        case arrHash[i][0] !== `#`:
          hashtagInput.setCustomValidity(`хэш - тег начинается с символа #(решётка)`);
          break;
        case arrHash[i].length < MIN_NAME_LENGTH && arrHash[i][0] === `#` && arrHash.length <= 5:
          hashtagInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - arrHash[i].length) + ` симв.`);
          break;
        case regex.test(regexCheck.join(``)) === false:
          hashtagInput.setCustomValidity(`строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы`);
          break;
        case arrHash[i].length > MAX_NAME_LENGTH:
          hashtagInput.setCustomValidity(`Удалите лишние ` + (arrHash[i].length - MAX_NAME_LENGTH) + ` симв. одного хэштега`);
          break;
        case arrUnique.length < arrHash.length:
          hashtagInput.setCustomValidity(`Oдин и тот же хэш-тег не может быть использован дважды.`);
          break;
        case arrHash.length > MAX_HASHTAGS && arrHash[i][0] === `#`:
          hashtagInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов`);
          break;
        default:
          hashtagInput.setCustomValidity(` `);
          break;
      }
    }
    hashtagInput.reportValidity();
  });

  comments.addEventListener(`input`, () => {
    if (comments.value.length > COMMENTS_MAX_LENGTH) {
      comments.setCustomValidity(`Длина комментария не может быть больше 140 символов.`);
    }
    comments.reportValidity();
  });

})();
