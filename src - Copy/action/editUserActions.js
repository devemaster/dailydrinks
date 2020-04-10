import * as types from './actionTypes';
import editUserApi from '../api/editUserApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function doEditUser(data) {
  return {
    type: types.DO_UPDATE_USER,
    data
  };
}

export function doEditUserRes(data) {
  return {
    type: types.DO_UPDATE_USER_RES,
    data
  };
}

export function submitUpdateUser(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      editUserApi.doEditUser(data).then(data => {
        dispatch(doEditUserRes(data));
        dispatch(doEditUserRes(null));
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