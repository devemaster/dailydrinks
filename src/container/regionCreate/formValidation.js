
export default function validate(values) {
  const errors = {};
  if (values.region_name === '') {
    errors.region_name = 'Please enter Region_name';
  }
  // if (values.selectedCountry === null) {
  //   errors.selectedCountry = 'Please select countries';
  // }
  // if (values.selectedUser === '') {
  //   errors.selectedUser = 'Please select Users';
  // }
  return errors;
}
