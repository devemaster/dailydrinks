import * as types from './actionTypes';
import {logout} from '../helper/helper';
import CreateNotificationApi from '../api/createNotificationApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doCreateNotification(data) {
  return {
    type: types.CREATE_NOTIFICATION,
    data
  };
}

export function doCreateNotificationRes(data) {
  return {
    type: types.CREATE_NOTIFICATION_RES,
    data
  };
}

export function submitCreateNotification(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      CreateNotificationApi.doCreateNotification(data).then(data => {
        dispatch(doCreateNotificationRes(data));
        if (data.success === true) {
          Swal.fire({
            title: 'Notification send successfully',
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          })
        }
        if (data.success === false) {
          Swal.fire({
            title: data.message,
            type: 'error',
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
        dispatch(doCreateNotificationRes(null));
      }).catch(error => {
        return error
      });
    };
  }else{
    logout()
  }
}
