import * as types from './actionTypes';  
import bannerListApi from '../api/bannerListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function getbannerList() {

  return {
    type: types.BANNER_LIST,
  };
}

export function getBannerListRes(data) {  
  return {
    type: types.BANNER_LIST_RES, 
    data
  };
}

export function fetchBannerList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      bannerListApi.getbannerList().then(data => {
        dispatch(getBannerListRes(data));
        if(data.error){
          Swal.fire({
            title: data.message,
            type: 'error',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          });
        }
      }).catch(error => {
        return error
      });
    };
  }else{
    logout()
  }
}


