import * as types from './actionTypes';
import {logout} from '../helper/helper';
import UpdateCategoryApi from '../api/updateCategoryApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'


// request payload set
export function doUpdateApp(data) {
  return {
    type: types.UPDATE_CATEGORY,
    data
  };
}

// request respnse set

export function doUpdateAppRes(data) {
  return {
    type: types.UPDATE_CATEGORY_RES,
    data
  };
}

// call api, action and response
export function submitUpdateCategory(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      UpdateCategoryApi.doUpdateApp(data).then(data => {
        dispatch(doUpdateAppRes(data));
        dispatch(doUpdateAppRes(null));
        if(data.success === true){
          Swal.fire({
              title: 'Category updated successfully',
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
