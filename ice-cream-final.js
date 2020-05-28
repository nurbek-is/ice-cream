function addError(field) {
  if (field.previousElementSibling &&
    field.previousElementSibling.className === 'error') {
    // error message already showing
    return;
  }
  const error = document.createElement('div');
  error.innerHTML = '&#x26A1;'
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
function getSelectedRadio (radioArray) {
  for(btn of radioArray) {
    if(btn.checked) {
      return btn;
    }
  }
  return null
}

function checkWhip(whip) {
  const radioArray = document.querySelectorAll('input[name="container"]');
  const selectedContainer = getSelectedRadio(radioArray);
  if(!selectedContainer) {
    return true; // container not selected, there is no error
  }
  if(whip.checked && selectedContainer.value !=='cup') {
    addError(whip);
    return false;
  } else {
    removeError(whip)
  }
  return true;
}

window.addEventListener('load', function(e) {
  const form  = document.getElementById('ice-cream-form');
  const userName=form.username;
  userName.dataset.errorMsg='Your input should be between  ' + userName.minLength + ' and ' + userName.maxLength + ' characters '
  const radioAnswer = form.container[0];
  radioAnswer.dataset.errorMsg = "please select one of the options";
  const userEmail = form.email;
  userEmail.dataset.errorMsg = 'please type in a valid email';
  const userPhone = form.phone;
  userPhone.dataset.errorMsg = 'please type in a valid format as xxx-xxx-xxxx';
  const selectFlavor=form.flavor;
  selectFlavor.dataset.errorMsg = 'please select a flavor';
  const textArea = form.requests;
  textArea.dataset.errorMsg = 'your comment should be between' + textArea.minLength + ' and ' + textArea.maxLength + ' characters ';
  const cb = form.terms;
  cb.dataset.errorMsg = 'You must accept the terms';
  const whip = form.whip; 
  whip.dataset.errorMsg = "You cannot have whippped cream on a cone";

  //get input and text area fields
  const inputFields = document.querySelectorAll('input, textarea');
  console.log(inputFields);
  //Loop through the input fields, marking them all 'untouched'

  for(field of inputFields) {
    field.dataset.status='untouched'
  }

  //when user change the value of text-liek input or textarea, 
  //make the field 'touched'
  //validate the field
  userName.addEventListener('change',function (e){
    userName.dataset.status = 'touched';
    checkField(userName);
  })

  // When a user inputs data into a text-like input or textarea
  //  that has been touched, validate the field
  userName.addEventListener('input',function (e){
    if(userName.dataset.status==='touched') {
      checkField(userName);
    }
  })
  userEmail.addEventListener('change',function (e){
    userName.dataset.status = 'touched';
    checkField(userEmail);
  })
  userEmail.addEventListener('input',function (e){
    if(userEmail.dataset.status==='touched') {
      checkField(userEmail);
    }
  })

  userPhone.addEventListener('change',function (e){
    userPhone.dataset.status = 'touched';
    checkField(ususerPhoneerEmail);
  })
  userPhone.addEventListener('input',function (e){
    if(userPhone.dataset.status==='touched') {
      checkField(userPhone);
    }
  })

  userPhone.addEventListener('change',function (e){
    userPhone.dataset.status = 'touched';
    checkField(userPhone);
  })
  userPhone.addEventListener('input',function (e){
    if(userPhone.dataset.status==='touched') {
      checkField(userPhone);
    }
  })

  textArea.addEventListener('change',function (e){
    textArea.dataset.status = 'touched';
    checkField(textArea);
  })

  textArea.addEventListener('input',function (e){
    if(textArea.dataset.status==='touched') {
      checkField(textArea);
    }
  })

  for (let radioBtn of form.container) {
    radioBtn.addEventListener('click', function(e) {
      checkField(radioAnswer);
      checkWhip(whip);
      });
  }

  selectFlavor.addEventListener('change',function (e) {
    checkSelect(selectFlavor)
            })
  cb.addEventListener('input',function(e){
    checkField(cb)
  })
  whip.addEventListener('click',function (e) {
    checkWhip('whip')
  })

  form.addEventListener('submit',function(e){
    //mark all field touched 
    for(field of inputFields) {
      field.dataset.status='touched'
    }
    //check errors 
    checkField(userName);
    checkField(userEmail);
    checkField(userPhone);
    checkField(radioAnswer);
    checkSelect(selectFlavor);
    checkField(textArea);
    checkField(cb);
    checkWhip(whip);
 // if form is invalid, prevent submission 
    if(!form.checkValidity() ||!whipValid) {
       e.preventDefault();
      alert('please fix form errors')
       }
    })
  })