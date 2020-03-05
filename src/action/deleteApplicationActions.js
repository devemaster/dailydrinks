import * as types from './actionTypes';
import {logout} from '../helper/helper';
import DeleteApplicationApi from '../api/deleteApplicationApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doDeleteApp(data) {
  return {
    type: types.DELETE_APPLICATION,
    data
  };
}

export function doDeleteAppRes(data) {
  return {
    type: types.DELETE_APPLICATION_RES,
    data
  };
}

export function deleteApplicationRecord(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      DeleteApplicationApi.doDeleteApp(data).then(data => {
        dispatch(doDeleteAppRes(data));
        dispatch(doDeleteAppRes(null));
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
