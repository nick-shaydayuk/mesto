const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function showInputError(formElement, inputElement, errorMessage) {
  console.log(errorMessage);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
}

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_error");
  errorElement.classList.remove("popup__input_error_active");
  errorElement.textContent = "";
}

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const toggleButtonState = (inputList, submitButton) => {
  if (hasInvalidInput(inputList)) {
    
    submitButton.classList.add("popup__submit-button_disabled");
    submitButton.setAttribute("disabled", "")
  } else {
    submitButton.classList.remove("popup__submit-button_disabled");
    submitButton.removeAttribute("disabled", "")
  }
};

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const submitButton = formElement.querySelector(".popup__submit-button")
  toggleButtonState(inputList, submitButton);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();


