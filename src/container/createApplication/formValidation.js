// form validdation for create application form
export default function validate(values) {
  const errors = {};
  if (values.applicationName === '') {
    errors.applicationName = 'Please enter application name';
  }
  if (values.icon === '') {
    errors.icon = 'Please choose application icon';
  }
  if (values.selectedCountry === null) {
    errors.selectedCountry = 'Please select countries';
  }
  // if (values.selectedUser === '') {
  //   errors.selectedUser = 'Please select Users';
  // }
  return errors;
}
