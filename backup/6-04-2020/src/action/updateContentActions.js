import * as types from './actionTypes';
import {logout} from '../helper/helper';
import UpdateContentApi from '../api/updateContentApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doUpdateApp(data) {
  return {
    type: types.UPDATE_CONTENT,
    data
  };
}

export function doUpdateAppRes(data) {
  return {
    type: types.UPDATE_CONTENT_RES,
    data
  };
}

export function submitUpdateContent(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      UpdateContentApi.doUpdateApp(data).then(data => {
        dispatch(doUpdateAppRes(data));
        dispatch(doUpdateAppRes(null));
        if(data.success === true){
          Swal.fire({
              title: 'Content updated successfully',
              type: 'success',
              confirmButtonText: 'OK',
              allowOutsideClick: false,
              timer: 3000
          })
        }
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
