import * as types from './actionTypes';
import resetPasswordApi from '../api/resetPasswordApi';
import Swal from 'sweetalert2'

// request payload set
export function doResetpassword(data) {
  return {
    type: types.DO_RESETPASSWORD,
    data
  };
}

// request respnse set
export function doResetpasswordRes(user) {
  return {
    type: types.DO_RESETPASSWORD_RES,
    user
  };
}

// call api, action and response
export function reset_password(data) {
    return function(dispatch) {
      resetPasswordApi.doResetpassword(data).then(user => {
        dispatch(doResetpasswordRes(user));
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
