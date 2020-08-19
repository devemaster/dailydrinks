

// validation function used to banner create
export default function validate(values) {
  const errors = {};
  if (values.title === '') {
    errors.title = 'Please enter Title';
  }
  if (values.icon === '') {
    errors.icon = 'Please choose Banner Image';
  }
  if (values.description === '') {
    errors.description = 'Please enter Description';
  }
  // if (values.selectedCountry === null) {
  //   errors.selectedCountry = 'Please select countries';
  // }
  // if (values.selectedUser === '') {
  //   errors.selectedUser = 'Please select Users';
  // }
  return errors;
}
