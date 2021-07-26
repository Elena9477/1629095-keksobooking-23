const createModalSuccess = () => {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#success').content;
  const element = template.cloneNode(true);
  fragment.appendChild(element);
  document.body.appendChild(fragment);
  document.querySelector('.success').classList.add('hidden');
};

const createModalError = () => {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#error').content;
  const element = template.cloneNode(true);
  fragment.appendChild(element);
  document.body.appendChild(fragment);
  document.querySelector('.error').classList.add('hidden');
};

const onModalSuccessEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    document.querySelector('.success').classList.add('hidden');
    document.removeEventListener('keydown', onModalSuccessEscKeydown);
  }
};

const onModalErrorEscKeydown = (evt) => {
  if (evt.keyCode === 27) {
    document.querySelector('.error').classList.add('hidden');
    document.removeEventListener('keydown', onModalErrorEscKeydown);
  }
};

const onModalErrorButtonClick = (evt) => {
  evt.preventDefault();
  document.querySelector('.error').classList.add('hidden');
};

const onModalSuccessButtonClick = () => {
  document.querySelector('.success').classList.add('hidden');
  document.removeEventListener('click', onModalSuccessButtonClick);
};

const showModalSuccess = () => {
  document.querySelector('.success').classList.remove('hidden');
  document.addEventListener('keydown', onModalSuccessEscKeydown);
  document.addEventListener('click', onModalSuccessButtonClick);
};

const showModalError = () => {
  document.querySelector('.error').classList.remove('hidden');
  document.addEventListener('keydown', onModalErrorEscKeydown);
  document.querySelector('.error__button').addEventListener('click', onModalErrorButtonClick);
};

export { showModalSuccess, showModalError, createModalError, createModalSuccess };
