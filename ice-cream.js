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
  const whip = form.whip; 
  whip.dataset.errorMsg = "You cannot have whippped cream on a cone"

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
  textArea.addEventListener('input', function(e) {
    checkField(textArea)
  })
  const cb = form.terms;
  cb.dataset.errorMsg = 'You must accept the terms';
  cb.addEventListener('input',function(e){
    checkField(cb)
  })

  selectFlavor.addEventListener('change',function (e) {
    checkSelect(selectFlavor)
            })
  for (let radioBtn of form.container) {
    radioBtn.addEventListener('click', function(e) {
      checkField(radioAnswer);
      checkWhip(whip);
      });
  }
  whip.addEventListener('click',function (e) {
    checkWhip('whip')
  })

  userEmail.addEventListener('input',function(e) {
    checkField(userEmail)
  }) 
  userName.addEventListener('input',function(e) {
    checkField(userName)
  }) 
  userPhone.addEventListener('input',function(e) {
    checkField(userPhone)
  });
  form.addEventListener('submit',function(e){
    checkField(userName);
    checkField(userEmail);
    checkField(userPhone);
    checkField(radioAnswer);
    checkSelect(selectFlavor);
    checkField(textArea);
    checkField(cb);
    // checkTopping(sprinkles);
    const whipValid = checkWhip(whip)

    
    if(!form.checkValidity() ||!whipValid) {
       e.preventDefault();
      alert('please fix form errors')
       }
    })
  })