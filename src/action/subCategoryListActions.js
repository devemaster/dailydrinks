import * as types from './actionTypes';  
import subCategoryListApi from '../api/subCategoryListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';


// request payload set
import Swal from 'sweetalert2';

export function getsubCategoryList() {

  return {
    type: types.FETCH_SUBCATEGORYLIST,
  };
}

// request respnse set
export function getsubCategoryListRes(data) {  
  return {
    type: types.FETCH_SUBCATEGORYLIST_RES, 
    data
  };
}

// call api, action and response
export function fetchsubCategoryList(data) {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      subCategoryListApi.getsubCategoryList(data).then(data => {
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


