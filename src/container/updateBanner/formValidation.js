
export default function validate(values) {
  const errors = {};
  if (values.title === '') {
    errors.title = 'Please enter Title';
  }
  if (values.icon === '') {
    errors.icon = 'Please choose Banner image';
  }
  if (values.descripiton === '') {
    errors.description = 'Please enter description';
  }
  return errors;
}
