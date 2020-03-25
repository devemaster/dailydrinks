import * as types from './actionTypes';
import {logout} from '../helper/helper';
import UploadAppIconApi from '../api/uploadAppIconApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doUploadAppIcon(data) {
  return {
    type: types.UPLOAD_APPLICATION_ICON,
    data
  };
}

export function doUploadAppIconRes(data) {
  return {
    type: types.UPLOAD_APPLICATION_ICON_RES,
    data
  };
}

export function uploadAppIcon(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      UploadAppIconApi.doUploadAppIcon(data).then(data => {
        dispatch(doUploadAppIconRes(data));
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
