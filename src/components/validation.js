const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add(inputErrorClass)
    errorElement.textContent = errorMessage
    errorElement.classList.add(errorClass)
}

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass ) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.remove(inputErrorClass)
    errorElement.textContent = ''
    errorElement.classList.remove(errorClass)
}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        showInputError(formElement, inputElement, inputElement.dataset.patternError, inputErrorClass, errorClass)
    } else if (inputElement.validity.tooShort) {
        showInputError(formElement, inputElement, inputElement.dataset.lengthError, inputErrorClass, errorClass)
    } else if (inputElement.validity.valueMissing) {
        showInputError(formElement, inputElement, inputElement.dataset.missError, inputErrorClass, errorClass)
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass)
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid
    })
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true
        buttonElement.classList.add(inactiveButtonClass)
    } else {
        buttonElement.disabled = false
        buttonElement.classList.remove(inactiveButtonClass)
    }
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const buttonElement = formElement.querySelector(submitButtonSelector)

    toggleButtonState(inputList, buttonElement)

    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass)
            toggleButtonState(inputList, buttonElement, inactiveButtonClass)
        })
    })
}


export const enableValidation = (validationConfig) => {
    const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = validationConfig

    const formList = Array.from(document.querySelectorAll(formSelector))

    formList.forEach(formElement => {
        setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
    })
}

export const clearValidation = (modalElement, validationConfig) => {
    const { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = validationConfig

    const formElement = modalElement.querySelector(formSelector)

    const inputList = Array.from(formElement.querySelectorAll(inputSelector))
    const buttonElement = formElement.querySelector(submitButtonSelector)

    toggleButtonState(inputList, buttonElement, inactiveButtonClass)

    inputList.forEach(inputElement => {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass)
    })
}