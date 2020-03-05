import * as types from './actionTypes';  
import deleteUserApi from '../api/deleteUserApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'

export function deleteUser(data) {
  return {
    type: types.DO_DELETE_USER, 
    data
  };
}

export function doDeleteUserRes(data) {
  return {
    type: types.DO_DELETE_USER_RES, 
    data
  };
}

export function deleteUserDetails(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      deleteUserApi.deleteUser(data).then(data => {
        dispatch(doDeleteUserRes(data));
        dispatch(doDeleteUserRes(null));
        if(data.error){
          Swal.fire({
            title: data.message,
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
  }else{
    logout()
  }
}