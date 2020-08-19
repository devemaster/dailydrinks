import * as types from './actionTypes';  
import usersSearchApi from '../api/userSearchApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

// request payload set
export function doUserSearchAll(data) {

  return {
    type: types.DO_ALL_SEARCH_USERS,
    data
  };
}

// request respnse set
export function doUserAllSearchRes(data) {  
  return {
    type: types.DO_ALL_SEARCH_USERS_RES, 
    data
  };
}

// call api, action and response
export function getAllSearchUsers(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      usersSearchApi.doUserSearchAll(data).then(data => {
        dispatch(doUserAllSearchRes(data));
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


