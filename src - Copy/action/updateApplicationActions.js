import * as types from './actionTypes';
import {logout} from '../helper/helper';
import UpdateApplicationApi from '../api/updateApplicationApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doUpdateApp(data) {
  return {
    type: types.UPDATE_APPLICATION,
    data
  };
}

export function doUpdateAppRes(data) {
  return {
    type: types.UPDATE_APPLICATION_RES,
    data
  };
}

export function submitUpdateApplication(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      UpdateApplicationApi.doUpdateApp(data).then(data => {
        dispatch(doUpdateAppRes(data));
        dispatch(doUpdateAppRes(null));
        if(data.success === true){
          Swal.fire({
              title: 'Application updated successfully',
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
