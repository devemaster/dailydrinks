import * as types from './actionTypes';  
import userApprovedApi from '../api/userApprovedApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function doUserApproved(data) {

  return {
    type: types.DO_USER_APPROVED,
    data
  };
}

export function doUserApprovedRes(data) {  
  return {
    type: types.DO_USER_APPROVED_RES, 
    data
  };
}

export function updateUserStatus(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      userApprovedApi.doUserApproved(data).then(data => {
        dispatch(doUserApprovedRes(data));
        dispatch(doUserApprovedRes(null));
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

