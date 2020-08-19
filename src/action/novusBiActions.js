import * as types from './actionTypes';  
import novusBiApi from '../api/novusBiApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

// request payload set
export function getnovusBi() {

  return {
    type: types.FETCH_NOVUSBI,
  };
}

// request respnse set
export function getnovusBiRes(data) {  
  return {
    type: types.FETCH_NOVUSBI_RES, 
    data
  };
}

// call api, action and response
export function fetchnovusBi() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      novusBiApi.getnovusBi().then(data => {
        dispatch(getnovusBiRes(data));
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


