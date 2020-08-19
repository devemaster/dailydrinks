import * as types from './actionTypes';
import {logout} from '../helper/helper';
import createAdminApi from '../api/createAdminApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

// request payload set
export function doCreateAdmin(data) {
  return {
    type: types.DO_CREATE_ADMIN,
    data
  };
}

// request respnse set
export function doCreateAdminRes(data) {
  return {
    type: types.DO_CREATE_ADMIN_RES,
    data
  };
}

// call api, action and response
export function create_admin(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      createAdminApi.doCreateAdmin(data).then(data => {
        dispatch(doCreateAdminRes(data));
        dispatch(doCreateAdminRes(null));
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
