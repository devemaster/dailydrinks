import * as types from './actionTypes';
import {logout} from '../helper/helper';
import novusBiArticleApi from '../api/novusBiArticleApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'


// request payload set
export function donovusBiArticle(data) {
  return {
    type: types.DO_NOVUSBI_ARTICLE,
    data
  };
}

// request respnse set
export function donovusBiArticleRes(data) {
  return {
    type: types.DO_NOVUSBI_ARTICLE_RES,
    data
  };
}

// call api, action and response
export function submitnovusBiArticle(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      novusBiArticleApi.donovusBiArticle(data).then(data => {
        
        dispatch(donovusBiArticleRes(data));
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

export function fetchAllCountry() {
  return {
    type: types.FETCH_All_COUNTRY,
  };
}

export function doAllCountryRes(data) {
  return {
    type: types.FETCH_All_COUNTRY_RES,
    data
  };
}

export function getAllCountry() {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      novusBiArticleApi.fetchAllCountry().then(data => {
        dispatch(doAllCountryRes(data));
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

export function fetchAllState(data) {
  return {
    type: types.FETCH_All_STATE,
    data
  };
}

export function doAllStateRes(data) {
  return {
    type: types.FETCH_All_STATE_RES,
    data
  };
}

export function getAllState(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      novusBiArticleApi.fetchAllState(data).then(data => {
        dispatch(doAllStateRes(data));
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

export function fetchAllCity(data) {
  return {
    type: types.FETCH_All_CITY,
    data
  };
}

export function doAllCityRes(data) {
  return {
    type: types.FETCH_All_CITY_RES,
    data
  };
}

export function getAllCity(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      novusBiArticleApi.fetchAllCity(data).then(data => {
        dispatch(doAllCityRes(data));
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