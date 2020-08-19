import * as types from './actionTypes';  
import userApproveAppApi from '../api/userApproveAppApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

// request payload set
export function doUserApproveApp(data) {

  return {
    type: types.DO_USER_APPROVE_APP,
    data
  };
}

// request respnse set
export function doUserApproveAppRes(data) {  
  return {
    type: types.DO_USER_APPROVE_APP_RES, 
    data
  };
}

// call api, action and response
export function approveAppUser(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      userApproveAppApi.doUserApproveApp(data).then(data => {
        dispatch(doUserApproveAppRes(data));
        if(data.error){
          Swal.fire({
            title: data.message,
            type: 'error',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          });
        }
        dispatch(doUserApproveAppRes(null));
      }).catch(error => {
        return error
      });
    };
  }else{
    logout()
  }
}

