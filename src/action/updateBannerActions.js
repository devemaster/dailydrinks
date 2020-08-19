import * as types from './actionTypes';
import {logout} from '../helper/helper';
import UpdateBannerApi from '../api/updateBannerApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'


// request payload set
export function doUpdateBanner(data) {
  return {
    type: types.UPDATE_BANNER,
    data
  };
}

// request respnse set
export function doUpdateBannerRes(data) {
  return {
    type: types.UPDATE_BANNER_RES,
    data
  };
}

// call api, action and response
export function submitUpdateBanner(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      UpdateBannerApi.doUpdateBanner(data).then(data => {
        dispatch(doUpdateBannerRes(data));
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
