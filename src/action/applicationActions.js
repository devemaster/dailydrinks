import * as types from './actionTypes';  
import ApplicationApi from '../api/applicationApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

// request payload set
export function getAllApplication() {

  return {
    type: types.FETCH_All_APPLICATION,
  };
}

// request respnse set
export function getAllApplicationRes(data) {  
  return {
    type: types.FETCH_All_APPLICATION_RES, 
    data
  };
}

// call api, action and response
export function fetchAllApplication() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      ApplicationApi.getAllApplication().then(data => {
        dispatch(getAllApplicationRes(data));
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


