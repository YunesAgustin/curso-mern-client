// Todas las funciones para validar los formularios las ponemos aqui
// de esta manera las desacoplamos de los componentes y los hacemos reutilizables

export function minLengthValidation(inputData, minLength) {
  const { value } = inputData;

  removeClassErrorSucces(inputData);

  if (value.length >= minLength) {
    inputData.classList.add('succes');
    return true;
  } else {
    inputData.classList.add('error');
    return false;
  }
}

export function emailValidation(inputData) {
  // eslint-disable-next-line
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const { value } = inputData;

  removeClassErrorSucces(inputData);

  const resultValidation = emailValid.test(value);
  if (resultValidation) {
    inputData.classList.add('succes');
    return true;
  } else {
    inputData.classList.add('error');
    return false;
  }
}

function removeClassErrorSucces(inputData) {
  inputData.classList.remove('succes');
  inputData.classList.remove('error');
}
