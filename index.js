const form = document.querySelector('form');
const EMAIL_RE = /^[^\s@]+@[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i;

function validate(input) {
  const value = input.value.trim();
  let message = '';

  if (value === '') {
    message = `${input.labels[0].textContent} cannot be empty`;
  } else if (input.type === 'email' && !EMAIL_RE.test(value)) {
    message = 'Looks like this is not an email';
  }

  document.getElementById(input.getAttribute('aria-describedby')).textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  return message === '';
}

form.addEventListener('submit', (e) => {
  const inputs = [...form.querySelectorAll('input')];
  const results = inputs.map(validate);

  if (results.includes(false)) {
    e.preventDefault();
    inputs[results.indexOf(false)].focus();
  }
});
