import * as types from './actionTypes';  
import AverageListApi from '../api/gAverageApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function getaverageList() {

  return {
    type: types.GAVERAGE_LIST,
  };
}

export function getAverageListRes(data) {  
  return {
    type: types.GAVERAGE_LIST_RES, 
    data
  };
}

export function fetchAverageList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      AverageListApi.getAverageList().then(data => {
        dispatch(getAverageListRes(data));
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

export function doUpdateAverage(data) {
  return {
    type: types.UPDATE_AVERAGE,
    data
  };
}

export function doUpdateAverageRes(data) {
  return {
    type: types.UPDATE_AVERAGE_RES,
    data
  };
}

export function submitUpdateAverage(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      AverageListApi.doUpdateAverage(data).then(data => {
        dispatch(doUpdateAverageRes(data));
        if(data.success === true){
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



