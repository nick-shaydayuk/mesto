const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
  console.log(errorMessage);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

function checkInputValidity(evt, formElement, inputElement, inputErrorClass, errorClass) {
  if (!evt.target.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass);
  }
}

const toggleButtonState = (inputList, submitButton, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute("disabled", "")
  } else {
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute("disabled", "")
  }
};

function setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector)
  toggleButtonState(inputList, submitButton, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", (evt) => {
      checkInputValidity(evt, formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, submitButton, inactiveButtonClass);
    });
  });
}

function enableValidation(options) {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options.inputSelector, options.submitButtonSelector,
      options.inactiveButtonClass, options.inputErrorClass, options.errorClass);
  });
}

enableValidation({
  formSelector: '.popup__form', //форма
  inputSelector: '.popup__input', //input формы
  submitButtonSelector: '.popup__submit-button', //кнопка формы
  inactiveButtonClass: 'popup__submit-button_disabled', //кнопка неактивна
  inputErrorClass: 'popup__input_error', //стиль input при ошибке
  errorClass: 'form__input-error_active' //отображение ошибки
});


