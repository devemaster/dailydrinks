import * as types from './actionTypes';  
import contentListApi from '../api/contentListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function getcontentList() {

  return {
    type: types.FETCH_CONTENTLIST,
  };
}

export function getcontentListRes(data) {  
  return {
    type: types.FETCH_CONTENTLIST_RES, 
    data
  };
}

export function fetchcontentList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      contentListApi.getcontentList().then(data => {
        dispatch(getcontentListRes(data));
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


