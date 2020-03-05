
export default function validate(values) {
  const errors = {};
  if (values.email === '') {
    errors.email = 'Please enter email';
  }
  if (values.fullname === '') {
    errors.fullname = 'Please enter fullname';
  }
  if (values.company === '') {
    errors.company = 'Please enter company';
  }
  if (values.address1 === '') {
    errors.address1 = 'Please enter address 1';
  }
  if (values.address2 === '') {
    errors.address2 = 'Please enter address 2';
  }
  if (values.country === '') {
    errors.country = 'Please select country';
  }
  if (values.state === '') {
    errors.state = 'Please select state';
  }
  if (values.city === '') {
    errors.city = 'Please select city';
  }
  if (values.zipcode === '') {
    errors.zipcode = 'Please enter zip code';
  }
  return errors;
}
