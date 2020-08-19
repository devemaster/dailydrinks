import * as types from './actionTypes';
import {logout} from '../helper/helper';
import DeleteBannerListApi from '../api/deleteBannerListApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'


// request payload set
export function doDeleteBanner(data) {
  return {
    type: types.DELETE_BANNERLIST,
    data
  };
}

// request respnse set
export function doDeleteBannerRes(data) {
  return {
    type: types.DELETE_BANNERLIST_RES,
    data
  };
}

// call api, action and response
export function deleteBannerListRecord(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      DeleteBannerListApi.doDeleteBanner(data).then(data => {
        dispatch(doDeleteBannerRes(data));
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
