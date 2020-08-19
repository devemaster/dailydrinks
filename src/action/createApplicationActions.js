import * as types from './actionTypes';
import {logout} from '../helper/helper';
import CreateApplicationApi from '../api/createApplicationApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'

// request payload set
export function doCreateApplication(data) {
  return {
    type: types.CREATE_APPLICATION,
    data
  };
}

// request respnse set
export function doCreateApplicationRes(data) {
  return {
    type: types.CREATE_APPLICATION_RES,
    data
  };
}

// call api, action and response
export function submitCreateApplication(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      CreateApplicationApi.doCreateApplication(data).then(data => {
        dispatch(doCreateApplicationRes(data));
        dispatch(doCreateApplicationRes(null));
        if (data.success === true) {
          Swal.fire({
            title: 'Application created successfully',
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
