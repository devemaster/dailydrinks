import * as types from './actionTypes';
import {logout} from '../helper/helper';
import UpdateRegionApi from '../api/updateRegionApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doUpdateRegion(data) {
  return {
    type: types.UPDATE_REGION,
    data
  };
}

export function doUpdateRegionRes(data) {
  return {
    type: types.UPDATE_REGION_RES,
    data
  };
}

export function submitUpdateRegion(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      UpdateRegionApi.doUpdateRegion(data).then(data => {
        dispatch(doUpdateRegionRes(data));
        if(data.success === true){
          Swal.fire({
              title: data.message,
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
