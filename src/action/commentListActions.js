import * as types from './actionTypes';  
import commentListApi from '../api/commentListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

// request payload set
export function getcommentList() {

  return {
    type: types.FETCH_COMMENTLIST,
  };
}

// request respnse set
export function getcommentListRes(data) {  
  return {
    type: types.FETCH_COMMENTLIST_RES, 
    data
  };
}

// call api, action and response
export function fetchcommentList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      commentListApi.getcommentList().then(data => {
        dispatch(getcommentListRes(data));
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


