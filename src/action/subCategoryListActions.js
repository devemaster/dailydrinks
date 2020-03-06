import * as types from './actionTypes';  
import subCategoryListApi from '../api/subCategoryListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function getsubCategoryList() {

  return {
    type: types.FETCH_SUBCATEGORYLIST,
  };
}

export function getsubCategoryListRes(data) {  
  return {
    type: types.FETCH_SUBCATEGORYLIST_RES, 
    data
  };
}

export function fetchsubCategoryList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      subCategoryListApi.getsubCategoryList().then(data => {
        dispatch(getsubCategoryListRes(data));
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


