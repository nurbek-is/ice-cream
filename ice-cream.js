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
window.addEventListener('load', function(e) {
  const form  = document.getElementById('ice-cream-form');
  const userName=form.username;
  userName.dataset.errorMsg='Your input should be between  ' + userName.minLength + ' and ' + userName.maxLength + ' characters '
  const answer = form.container[0];
  answer.dataset.errorMsg = "please select one of the options";
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
  cb.dataset.errorMsg = 'You need to check this checkbox';
  cb.addEventListener('input',function(e){
    checkField(cb)
  })

function checkTopping() {
    const sprinkles = document.getElementById('sprinkles')
    const nuts = document.getElementById('nuts')
    const whip = document.getElementById('whip')
    const toppings = [form.sprinkles,form.nuts,form.whip]
    for(i=0;i<toppings.length;i++) {
      toppings[i].addEventListener ('click',function (e) {
        checkField(sprinkles)
        checkField(nuts)
        checkField(whip)
        })
      if(toppings[i].checked) {
        removeError(sprinkles)
        return;
        }  
      toppings[0].dataset.errorMsg = 'please select a topping';
      addError(sprinkles)
    }
  }
  selectFlavor.addEventListener('change',function (e) {
    checkSelect(selectFlavor)
            })
  for (let button of form.container) {
    button.addEventListener('click', function(e) {
      checkField(answer)
      });
  }
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
    e.preventDefault();
    checkField(userName);
    checkField(userEmail);
    checkField(userPhone);
    checkField(answer);
    checkSelect(selectFlavor);
    checkField(textArea);
    checkField(cb);
    checkTopping(sprinkles);
    
    if(!form.checkValidity()) {
      e.preventDefault();
      alert('please fix form errors')
       }
    })
  })
