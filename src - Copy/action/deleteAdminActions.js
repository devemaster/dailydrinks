import * as types from './actionTypes';
import {logout} from '../helper/helper';
import DeleteAdminApi from '../api/deleteAdminApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function doDeleteAdmin(data) {
  return {
    type: types.DELETE_ADMIN,
    data
  };
}

export function doDeleteAdminRes(data) {
  return {
    type: types.DELETE_ADMIN_RES,
    data
  };
}

export function delete_admin(data) {

  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      DeleteAdminApi.doDeleteAdmin(data).then(data => {
        dispatch(doDeleteAdminRes(data));
        dispatch(doDeleteAdminRes(null));
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
