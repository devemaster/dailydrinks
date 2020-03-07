import * as types from './actionTypes';
import {logout} from '../helper/helper';
import DeleteContentListApi from '../api/deleteContentListApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doDeleteApp(data) {
  return {
    type: types.DELETE_CONTENTLIST,
    data
  };
}

export function doDeleteAppRes(data) {
  return {
    type: types.DELETE_CONTENTLIST_RES,
    data
  };
}

export function deleteContentListRecord(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      DeleteContentListApi.doDeleteApp(data).then(data => {
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
