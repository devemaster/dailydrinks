
export default function validate(values) {
  const errors = {};
  if (values.region_name === '') {
    errors.region_name = 'Please enter Region Name';
  }
  return errors;
}
