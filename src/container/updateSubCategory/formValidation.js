// form validateion for sub category update
export default function validate(values) {
  const errors = {};
  if (values.applicationName === '') {
    errors.applicationName = 'Please enter application name';
  }
  if (values.icon === '') {
    errors.icon = 'Please choose application icon';
  }
  if (values.selectedCountry === '') {
    errors.selectedCountry = 'Please select countries';
  }
  if (values.selectedUser === '') {
    errors.selectedUser = 'Please select Users';
  }
  return errors;
}
