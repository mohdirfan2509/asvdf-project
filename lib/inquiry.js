/** Contact-form validation shared by the browser form and POST /api/contact. */

const LIMITS = {
  fullName: 120,
  companyName: 160,
  email: 200,
  service: 120,
  location: 160,
  message: 3000,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value, max) => String(value ?? '').trim().slice(0, max + 1);

/** Accepts 10–13 digits with an optional leading "+", ignoring spaces, dashes and brackets. */
export function isValidPhone(value) {
  return /^\+?\d{10,13}$/.test(String(value ?? '').replace(/[\s()-]/g, ''));
}

export function validateInquiry(input = {}) {
  const value = {
    fullName: clean(input.fullName, LIMITS.fullName),
    companyName: clean(input.companyName, LIMITS.companyName),
    email: clean(input.email, LIMITS.email).toLowerCase(),
    phone: clean(input.phone, 30),
    service: clean(input.service, LIMITS.service),
    location: clean(input.location, LIMITS.location),
    message: clean(input.message, LIMITS.message),
  };

  const errors = {};
  if (!value.fullName) errors.fullName = 'Please enter your full name.';
  else if (value.fullName.length > LIMITS.fullName) errors.fullName = 'Name is too long.';

  if (value.companyName.length > LIMITS.companyName) errors.companyName = 'Company name is too long.';

  if (!value.email) errors.email = 'Please enter your email address.';
  else if (value.email.length > LIMITS.email || !EMAIL_RE.test(value.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!value.phone) errors.phone = 'Please enter your phone number.';
  else if (!isValidPhone(value.phone)) errors.phone = 'Enter a valid phone number (10 digits, optionally with +91).';

  if (!value.service) errors.service = 'Please select a service.';
  else if (value.service.length > LIMITS.service) errors.service = 'Please select a service from the list.';

  if (value.location.length > LIMITS.location) errors.location = 'Location is too long.';

  if (!value.message) errors.message = 'Please tell us about your project.';
  else if (value.message.length < 10) errors.message = 'Please add a few more details (at least 10 characters).';
  else if (value.message.length > LIMITS.message) errors.message = 'Message is too long (3,000 characters maximum).';

  return { value, errors, valid: Object.keys(errors).length === 0 };
}
