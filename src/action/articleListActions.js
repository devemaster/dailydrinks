import * as types from './actionTypes';  
import articleListApi from '../api/articleListApi';
import {logout} from '../helper/helper';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2';

export function getarticleList() {

  return {
    type: types.FETCH_ARTICLELIST,
  };
}

export function getarticleListRes(data) {  
  return {
    type: types.FETCH_ARTICLELIST_RES, 
    data
  };
}

export function fetcharticleList() {
  const TOKEN = getItem('auth_token');
  if(TOKEN){
    return function(dispatch) {
      articleListApi.getarticleList().then(data => {
        dispatch(getarticleListRes(data));
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


