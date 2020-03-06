import * as types from './actionTypes';  
import categoryListApi from '../api/categoryListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function getcategoryList() {

  return {
    type: types.FETCH_CATEGORYLIST,
  };
}

export function getcategoryListRes(data) {  
  return {
    type: types.FETCH_CATEGORYLIST_RES, 
    data
  };
}

export function fetchcategoryList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      categoryListApi.getcategoryList().then(data => {
        dispatch(getcategoryListRes(data));
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


