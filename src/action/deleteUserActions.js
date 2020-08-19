import * as types from './actionTypes';  
import deleteUserApi from '../api/deleteUserApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'


// request payload set
export function deleteUser(data) {
  return {
    type: types.DO_DELETE_USER, 
    data
  };
}


// request respnse set
export function doDeleteUserRes(data) {
  return {
    type: types.DO_DELETE_USER_RES, 
    data
  };
}

// call api, action and response
export function deleteUserDetails(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      deleteUserApi.deleteUser(data).then(data => {
        dispatch(doDeleteUserRes(data));
        dispatch(doDeleteUserRes(null));
        // if(data.error){
        //   Swal.fire({
        //     title: data.message,
        //     type: 'error',
        //     confirmButtonText: 'OK',
        //     allowOutsideClick: false,
        //     timer: 3000
        //   })
        // }
        if(data.success === true){
          Swal.fire({
            title: data.message,
            type: 'success',
            icon: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          })
        } else {
          Swal.fire({
            title: data.message,
            type: 'error',
            icon: 'error',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          })
        }
      }).catch(error => {
        return error
      });
    };
  }else{
    logout()
  }
}