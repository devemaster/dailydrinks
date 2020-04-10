
export default function validate(values) {
  const errors = {};
  if (values.groupValue === '') {
    errors.groupValue = 'Please select group';
  }
  if (values.groupValue === 'user') {
    if (values.selectedUser === null) {
      errors.selectedUser = 'Please select users';
    }
  }
  if (values.title === '') {
    errors.title = 'Please enter title';
  }
  if (values.body === '') {
    errors.body = 'Please enter message';
  }
  // if (values.icon === '') {
  //   errors.icon = 'Please choose application icon';
  // }
  // if (values.selectedCountry === '') {
  //   errors.selectedCountry = 'Please select countries';
  // }
  // if (values.selectedUser === '') {
  //   errors.selectedUser = 'Please select Users';
  // }
  return errors;
}
