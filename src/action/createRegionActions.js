import * as types from './actionTypes';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
import CreateRegionApi from '../api/createRegionApi';
export function doCreateRegion(data) {
  return {
    type: types.CREATE_REGION,
    data
  };
}

export function doCreateRegionRes(data) {
  return {
    type: types.CREATE_REGION_RES,
    data
  };
}

export function submitCreateRegion(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      CreateRegionApi.doCreateRegion(data).then(data => {
        dispatch(doCreateRegionRes(data));
        if (data.success === true) {
          Swal.fire({
            title: data.message,
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
      }).catch(error => {
        return error
      });
    };
  }else{
    logout()
  }
}
