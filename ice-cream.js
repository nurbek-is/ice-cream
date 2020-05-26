alert('hi')
function addError(field) {
  if (field.previousElementSibling &&
    field.previousElementSibling.className === 'error') {
    // error message already showing
    return;
  }
  const error = document.createElement('div');
  error.innerHTML = '&#x26A1; '
    + field.dataset.errorMsg;
  error.className = 'error';
  field.parentNode.insertBefore(error, field);
}

function removeError(field) {
  if (field.previousElementSibling &&
    field.previousElementSibling.className === 'error') {
    field.previousElementSibling.remove();
  }
}

function checkField(field) {
  if (!field.checkValidity()) {
    addError(field);
  } else {
    removeError(field);
  }
}

function checkSelect(field) {
  if ( field.selectedIndex === 0 ) {
    field.setCustomValidity('Invalid');
    addError(field);
  } else {
    field.setCustomValidity('');
    removeError(field);
  }
}

window.addEventListener('load', function(e) {

  const form  = document.getElementById('ice-cream-form');
/*
    Add validation for the following fields:
     * username
     * email
     * phone
     * container
     * flavor
     * requests
     * terms

    Each field should be validated when its value is changed.
    All fields should be validated when form is submitted.
    Be sure to prevent the form from submitting if any field
     is invalid.
  */

});
