// =========================================================
// AnotaVision — Contact form handler
// Emails are delivered to waziralihaideri105@gmail.com via
// FormSubmit.co (no backend server required).
// =========================================================
//
// One-time setup: the very first submission through this form will
// make FormSubmit send a confirmation link to waziralihaideri105@gmail.com
// ("Confirm your email to activate this form" / "AJAX Form Activation").
// Open that email and click confirm — after that, every future
// submission goes straight into the inbox automatically, with no
// popup, no redirect, no page reload.

document.addEventListener('DOMContentLoaded', function () {

  var FORM_ENDPOINT = 'https://formsubmit.co/ajax/waziralihaideri105@gmail.com';

  var contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  var formSuccess = document.getElementById('form-success');
  var formError = document.getElementById('form-error');
  var submitBtn = document.getElementById('submitBtn');
  var submitBtnText = document.getElementById('submitBtnText');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (formError) formError.hidden = true;
    if (formSuccess) formSuccess.classList.remove('show');

    var requiredFields = contactForm.querySelectorAll('[required]');
    var valid = true;
    requiredFields.forEach(function (field) {
      if (!field.value.trim()) valid = false;
    });
    if (!valid) return;

    var formData = new FormData(contactForm);
    formData.append('_subject', 'New enquiry from AnotaVision website');

    if (submitBtn) submitBtn.disabled = true;
    if (submitBtnText) submitBtnText.textContent = 'Sending...';

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: formData
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Request failed');
        return response.json();
      })
      .then(function () {
        if (formSuccess) formSuccess.classList.add('show');
        contactForm.reset();
        window.scrollTo({ top: contactForm.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
      })
      .catch(function () {
        if (formError) formError.hidden = false;
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
        if (submitBtnText) submitBtnText.textContent = 'Send Message';
      });
  });

});