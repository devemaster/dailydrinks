import * as types from './actionTypes';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
import CreateBannerApi from '../api/createBannerApi';

// request payload set
export function doCreateBanner(data) {
  return {
    type: types.CREATE_BANNER,
    data
  };
}


// request respnse set
export function doCreateBannerRes(data) {
  return {
    type: types.CREATE_BANNER_RES,
    data
  };
}

// call api, action and response
export function submitCreateBanner(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      CreateBannerApi.doCreateBanner(data).then(data => {
        dispatch(doCreateBannerRes(data));
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
