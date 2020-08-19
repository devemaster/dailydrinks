import * as types from './actionTypes';  
import checkUserApi from '../api/checkUserApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

// request payload set
export function doCheckUser(data) {

  return {
    type: types.DO_CHECK_USER,
    data
  };
}

// request respnse set
export function doCheckUserRes(data) {  
  return {
    type: types.DO_CHECK_USER_RES, 
    data
  };
}

// call api, action and response
export function checkUserName(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      checkUserApi.doCheckUser(data).then(data => {
        dispatch(doCheckUserRes(data));
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


