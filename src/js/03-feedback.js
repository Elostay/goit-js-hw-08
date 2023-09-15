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

let inputValue = {
  email: '',
  message: '',
};

function onSubmit(event) {
  event.preventDefault();
  refs.form.reset();
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedMessage) {
    inputValue = savedMessage;
  } else {
    inputValue = {
      email: '',
      message: '',
    };
  }
  localStorage.removeItem(STORAGE_KEY);
  console.log(inputValue);
}

function onInput(event) {
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
