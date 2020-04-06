import * as types from './actionTypes';  
import UsersApi from '../api/userApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function doUserAll() {

  return {
    type: types.DO_ALL_USERS,
  };
}

export function doUserAllRes(data) {  
  return {
    type: types.DO_ALL_USERS_RES, 
    data
  };
}

export function getAllUsers() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      UsersApi.doUserAll().then(data => {
        dispatch(doUserAllRes(data));
        if(data.error){
          Swal.fire({
            title: data.message,
            type: 'error',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          });
        }
      }).catch(error => {
        return error
      });
    };
  }else{
    logout()
  }
}


