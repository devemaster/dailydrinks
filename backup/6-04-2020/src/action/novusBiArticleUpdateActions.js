import * as types from './actionTypes';
import {logout} from '../helper/helper';
import novusBiUpdateArticleApi from '../api/novusBiArticleUpdateApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'
export function donovusBiUpdateArticle(data) {
  return {
    type: types.DO_NOVUSBI_ARTICLE_UPDATE,
    data
  };
}

export function donovusBiUpdateArticleRes(data) {
  return {
    type: types.DO_NOVUSBI_ARTICLE_UPDATE_RES,
    data
  };
}

export function submitnovusBiUpdateArticle(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      novusBiUpdateArticleApi.donovusBiUpdateArticle(data).then(data => {
        
        dispatch(donovusBiUpdateArticleRes(data));
        if(data.success === true){
          Swal.fire({
            title: data.message,
            type: 'success',
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            timer: 3000
          })
        } 
        if(data.success === false){
          Swal.fire({
            title: data.message,
            type: 'error',
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

