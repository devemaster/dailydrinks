import * as types from './actionTypes';
import {logout} from '../helper/helper';
import DeleteSubCategoryListApi from '../api/deleteSubCategoryListApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doDeleteApp(data) {
  return {
    type: types.DELETE_CATEGORYLIST,
    data
  };
}

export function doDeleteAppRes(data) {
  return {
    type: types.DELETE_CATEGORYLIST_RES,
    data
  };
}

export function deleteSubCategoryListRecord(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      DeleteSubCategoryListApi.doDeleteApp(data).then(data => {
        dispatch(doDeleteAppRes(data));
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
