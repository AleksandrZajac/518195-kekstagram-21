'use strict';

(() => {

  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 20;
  const COMMENTS_MAX_LENGTH = 140;
  const MAX_HASHTAGS = 5;
  const hashtagInput = document.querySelector(`.text__hashtags`);
  const comment = document.querySelector(`.text__description`);

  const checkForUniqueness = (arr) => {
    return Array.from(new Set(arr));
  };

  const changeToLowerCase = () => {
    const tags = hashtagInput.value.toLowerCase().split(` `).filter((hashtag) => hashtag !== ``);
    return tags;
  };

  hashtagInput.addEventListener(`input`, () => {
    const regex = /^[\w\d]*$/;
    const hashtags = changeToLowerCase();
    const hashtagsUnique = checkForUniqueness(hashtags);
    const regexCheck = [];

    for (let i = 0; i < hashtags.length; i++) {
      regexCheck[i] = hashtags[i];
      if (hashtags[i][0] === `#`) {
        const arrStr = regexCheck[i].split(``);
        arrStr.splice(0, 1);
        regexCheck[i] = arrStr.join(``);
      }
      switch (true) {
        case hashtags[i][0] !== `#`:
          hashtagInput.setCustomValidity(`хэш - тег начинается с символа #(решётка)`);
          break;
        case hashtags[i].length < MIN_NAME_LENGTH && hashtags[i][0] === `#` && hashtags.length <= 5:
          hashtagInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - hashtags[i].length) + ` симв.`);
          break;
        case regex.test(regexCheck.join(``)) === false:
          hashtagInput.setCustomValidity(`строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы`);
          break;
        case hashtags[i].length > MAX_NAME_LENGTH:
          hashtagInput.setCustomValidity(`Удалите лишние ` + (hashtags[i].length - MAX_NAME_LENGTH) + ` симв. одного хэштега`);
          break;
        case hashtagsUnique.length < hashtags.length:
          hashtagInput.setCustomValidity(`Oдин и тот же хэш-тег не может быть использован дважды.`);
          break;
        case hashtags.length > MAX_HASHTAGS && hashtags[i][0] === `#`:
          hashtagInput.setCustomValidity(`Нельзя указать больше пяти хэш-тегов`);
          break;
        default:
          hashtagInput.setCustomValidity(``);
          break;
      }
    }
    hashtagInput.reportValidity();
  });

  comment.addEventListener(`input`, () => {
    if (comment.value.length > COMMENTS_MAX_LENGTH) {
      comment.setCustomValidity(`Длина комментария не может быть больше 140 символов.`);
    } else {
      comment.setCustomValidity(``);
    }
    comment.reportValidity();
  });

  window.validate = {
    hashtagInput,
    comment
  };

})();
