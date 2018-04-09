class FormSubmit {
  // Submit the form
  submitForm(){
    const form = document.querySelector('#contactForm');
    const formData = {
      name: document.querySelector('#name').value,
      email: document.querySelector('#email').value,
      message: document.querySelector('#message').value
    }
    if(form.checkValidity()){
      fetch('https://www.enformed.io/38zlufb0/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          formSubmit.clearForm(form);
          formSubmit.showMessage();
        })
        .catch(err => console.log(err));
    }
  }

  // Clear the form inputs
  clearForm(form){
    document.querySelector('#name').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#message').value = '';
  }

  // Show thank you message
  showMessage(){
    const message = document.querySelector('#formThankYou');
    message.style.display = 'block';

    setTimeout(() => message.style.display = 'none', 5000);
  }
}

export const formSubmit = new FormSubmit();
