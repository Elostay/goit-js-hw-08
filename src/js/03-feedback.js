import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';

refs.form.addEventListener('submit', onSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

populateTextarea();

let inputValue = {};

function onSubmit(event) {
  event.preventDefault();

  savedMessage();

  const formElements = event.currentTarget.elements;

  const email = formElements.email.value;

  const message = formElements.message.value;

  if (!email && !message) return;
  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();
  console.log(inputValue);
  inputValue = { email: '', message: '' };
}

function onInput(event) {
  savedMessage();
  inputValue[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputValue));
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    refs.input.value = savedMessage.email;
    refs.textarea.value = savedMessage.message;
  }
}

function savedMessage() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    inputValue = savedMessage;
  }
}
