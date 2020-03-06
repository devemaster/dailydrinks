import * as types from './actionTypes';  
import trashListApi from '../api/trashListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function gettrashList() {

  return {
    type: types.FETCH_TRASHLIST,
  };
}

export function gettrashListRes(data) {  
  return {
    type: types.FETCH_TRASHLIST_RES, 
    data
  };
}

export function fetchtrashList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      trashListApi.gettrashList().then(data => {
        dispatch(gettrashListRes(data));
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


