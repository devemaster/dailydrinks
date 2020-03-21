import * as types from './actionTypes';
import {logout} from '../helper/helper';
import StatusContentListApi from '../api/statusContentListApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doStatusApp(data) {
  return {
    type: types.STATUS_CONTENTLIST,
    data
  };
}

export function doStatusContentRes(data) {
  return {
    type: types.STATUS_CONTENTLIST_RES, 
    data
  };
}

export function statusContentListRecord(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      StatusContentListApi.doStatusApp(data).then(data => {
        dispatch(doStatusContentRes(data));
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
