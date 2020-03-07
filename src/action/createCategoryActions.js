import * as types from './actionTypes';
import {logout} from '../helper/helper';
import CreateCategoryApi from '../api/createCategoryApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function doCreateCategory(data) {
  return {
    type: types.CREATE_CATEGORY,
    data
  };
}

export function doCreateCategoryRes(data) {
  return {
    type: types.CREATE_CATEGORY_RES,
    data
  };
}

export function submitCreateCategory(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      CreateCategoryApi.doCreateCategory(data).then(data => {
        dispatch(doCreateCategoryRes(data));
        dispatch(doCreateCategoryRes(null));
        if (data.success === true) {
          Swal.fire({
            title: 'Category created successfully',
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
