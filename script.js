document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#contactForm');
  if (!form) return;

  const fields = [
    {
      input: document.querySelector('#fullName'),
      error: document.querySelector('#fullNameError'),
      message: 'Please enter your full name.'
    },
    {
      input: document.querySelector('#email'),
      error: document.querySelector('#emailError'),
      message: 'Please enter a valid email address.'
    },
    {
      input: document.querySelector('#country'),
      error: document.querySelector('#countryError'),
      message: 'Please enter your country.'
    },
    {
      input: document.querySelector('#comments'),
      error: document.querySelector('#commentsError'),
      message: 'Please write your comments.'
    }
  ];

  const clearFieldError = (field) => {
    field.input.classList.remove('input-error');
    field.input.removeAttribute('aria-invalid');
    field.error.textContent = '';
  };

  fields.forEach((field) => {
    field.input.addEventListener('input', () => clearFieldError(field));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    fields.forEach((field) => {
      clearFieldError(field);
      const value = field.input.value.trim();
      const invalidEmail = field.input.type === 'email' && !field.input.validity.valid;

      if (!value || invalidEmail) {
        isValid = false;
        field.input.classList.add('input-error');
        field.input.setAttribute('aria-invalid', 'true');
        field.error.textContent = field.message;
      }
    });

    if (!isValid) {
      const firstInvalid = fields.find((field) => field.input.classList.contains('input-error'));
      firstInvalid.input.focus();
      return;
    }

    alert('Your message has been submitted successfully!');
    form.reset();
  });
});
