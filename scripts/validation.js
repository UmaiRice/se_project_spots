const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_type_disable",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorMessageEl.textContent = errorMessage;
};

const hideInputError = (formEl, inputEl, config) => {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorMessageEl.textContent = "";
};

const checkInputValidity = (formEl, inputEl, config) => {
  console.log(inputEl.validationMessage);
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config);
  } else {
    buttonEl.disabled = false;
    if (config.inactiveButtonClass) {
      buttonEl.classList.remove(config.inactiveButtonClass);
    }
  }
};

//OPTIONAL (c)
const resetValidation = (formEl, inputList, buttonEl, config) => {
  inputList.forEach((input) => {
    hideInputError(formEl, input, config);
  });
  toggleButtonState(inputList, buttonEl, config);
};

const disableButton = (buttonEl, config) => {
  buttonEl.disabled = true;
  if (config.inactiveButtonClass) {
    buttonEl.classList.add(config.inactiveButtonClass);
  }
  //get the disbaled feature to work/ maybe think about using ids
  //buttonEl.classList.add("modal__submit-btn_type_disable");
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  //TODO - handle initial states
  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", function () {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

const enable = (config) => {
  console.log(config.formSelector);
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};

enableValidation(settings);
