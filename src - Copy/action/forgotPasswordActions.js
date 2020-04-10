import * as types from './actionTypes';
import forgotPasswordApi from '../api/forgotPasswordApi';
import Swal from 'sweetalert2'

export function doForgotpassword(data) {
  return {
    type: types.DO_FORGOTPASSWORD,
    data
  };
}

export function doForgotpasswordRes(user) {
  return {
    type: types.DO_FORGOTPASSWORD_RES,
    user
  };
}

export function submitForgotpassword(data) {
  return function(dispatch) {
    forgotPasswordApi.doForgotpassword(data).then(user => {
      dispatch(doForgotpasswordRes(user));
      if(user.error){
        Swal.fire({
          title: user.message,
          type: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          timer: 3000
        })
      }
    }).catch(error => {
      return error
    });
  };
}