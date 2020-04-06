import * as types from './actionTypes';
import {logout} from '../helper/helper';
import UpdateSubCategoryApi from '../api/updateSubCategoryApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doUpdateSubApp(data) {
  return {
    type: types.UPDATE_SUBCATEGORY,
    data
  };
}

export function doUpdateSubAppRes(data) {
  return {
    type: types.UPDATE_SUBCATEGORY_RES,
    data
  };
}

export function submitUpdateSubCategory(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      UpdateSubCategoryApi.doUpdateApp(data).then(data => {
        dispatch(doUpdateSubAppRes(data));
        if(data.success === true){
          Swal.fire({
              title: 'Sub Category updated successfully',
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
