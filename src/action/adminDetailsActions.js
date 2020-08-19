import * as types from './actionTypes';  
import AdminApi from '../api/adminDetailsApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';


// request payload set
export function doAppAdmin(data) {
  return {
    type: types.DO_APP_ADMIN,
    data
  };
}


// request respnse set
export function doAppAdminRes(data) {  
  return {
    type: types.DO_APP_ADMIN_RES, 
    data
  };
}


// call api, action and response
export function get_app_admin(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      AdminApi.doAppAdmin(data).then(data => {
        dispatch(doAppAdminRes(data));
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


