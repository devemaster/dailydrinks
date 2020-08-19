import * as types from './actionTypes';  
import AllCategoryListApi from '../api/allCategoryListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

// request payload set
export function getallcategoryList() {

  return {
    type: types.FETCH_ALLCATEGORYLIST,
  };
}

// request respnse set
export function getallcategoryListRes(data) {  
  return {
    type: types.FETCH_ALLCATEGORYLIST_RES, 
    data
  };
}

// call api, action and response
export function fetchallcategoryList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      AllCategoryListApi.getAllcategoryList().then(data => {
        console.log(data)
        dispatch(getallcategoryListRes(data));
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


