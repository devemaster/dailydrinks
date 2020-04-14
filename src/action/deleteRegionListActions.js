import * as types from './actionTypes';
import {logout} from '../helper/helper';
import DeleteRegionListApi from '../api/deleteRegionListApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doDeleteRegion(data) {
  return {
    type: types.DELETE_REGIONLIST,
    data
  };
}

export function doDeleteRegionRes(data) {
  return {
    type: types.DELETE_REGIONLIST_RES,
    data
  };
}

export function deleteRegionListRecord(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      DeleteRegionListApi.doDeleteRegion(data).then(data => {
        dispatch(doDeleteRegionRes(data));
        if(data.error){
          Swal.fire({
            title: data.message,
            type: 'error',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          })
        } else {
          Swal.fire({
            title: data.message,
            type: 'success',
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
