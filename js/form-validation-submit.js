import { closeImageUploadForm} from './form-close';
import { showErrorAlert, showSuccessAlert } from './form-validation-alerts';
import { sendDataToServer } from './server_api';
import {blockSubmitButton, imageUploadForm, transformStringToArray, unblockSubmitButton } from './util';

const MAX_HASHTAG_NUMBER = 5;
const HASHTAG_REG_EXP_VALIDATION = /^#[a-zа-яё0-9]{1,19}$/i;
const HASHTAG_ERROR_TEXT = {
  INVALID_PATTERN: 'Хэштег введён неверно',
  NOT_UNIQUE: 'Хэштеги не должны повторяться',
};

const hashtagField = imageUploadForm.querySelector('.text__hashtags');

const hasValidPattern = (inputValue) => transformStringToArray(inputValue).every((hashtag) => HASHTAG_REG_EXP_VALIDATION.test(hashtag));
const hasValidNumber = (inputValue) => transformStringToArray(inputValue).length <= MAX_HASHTAG_NUMBER;
const hasUniqueTags = (inputValue) => {
  const lowerCaseArray = transformStringToArray(inputValue).map((tag) => tag.toLowerCase());
  return lowerCaseArray.length === new Set(lowerCaseArray).size;
};

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'

});

pristine.addValidator(hashtagField, hasValidPattern, HASHTAG_ERROR_TEXT.INVALID_PATTERN, 3, false);
pristine.addValidator(hashtagField, hasValidNumber, HASHTAG_ERROR_TEXT.TOO_MANY_HASHTAGS, 2, false);
pristine.addValidator(hashtagField, hasUniqueTags, HASHTAG_ERROR_TEXT.NOT_UNIQUE, 1 , false);

const setFormSubmit = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendDataToServer(() => {
        closeImageUploadForm();
        showSuccessAlert();
      },
      () => {
        showErrorAlert();
      },
      new FormData(evt.target));
    }
    unblockSubmitButton();
  });
};

export {setFormSubmit, pristine};
