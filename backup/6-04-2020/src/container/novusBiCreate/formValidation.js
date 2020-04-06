
export default function validate(values) {
  const errors = {};
  if (values.category_name === '') {
    errors.category_name = 'Please enter category name';
  }
  if (values.icon === '') {
    errors.icon = 'Please choose category icon';
  }
  // if (values.selectedCountry === null) {
  //   errors.selectedCountry = 'Please select countries';
  // }
  // if (values.selectedUser === '') {
  //   errors.selectedUser = 'Please select Users';
  // }
  return errors;
}
