import * as types from './actionTypes';
import {logout} from '../helper/helper';
import DeleteCategoryListApi from '../api/deleteCategoryListApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';


// request payload set
export function doDeleteApp(data) {
  return {
    type: types.DELETE_CATEGORYLIST,
    data
  };
}

// request respnse set
export function doDeleteAppRes(data) {
  return {
    type: types.DELETE_CATEGORYLIST_RES,
    data
  };
}


// call api, action and response
export function deleteCategoryListRecord(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      DeleteCategoryListApi.doDeleteApp(data).then(data => {
        dispatch(doDeleteAppRes(data));
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
