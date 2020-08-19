import * as types from './actionTypes';
import {logout} from '../helper/helper';
import createUserApi from '../api/createUserApi';
import { getItem } from '../utils/localStore';
import Swal from 'sweetalert2'

// request payload set
export function doCreateUser(data) {
  return {
    type: types.DO_CREATE_USER,
    data
  };
}

// request respnse set
export function doCreateUserRes(data) {
  return {
    type: types.DO_CREATE_USER_RES,
    data
  };
}

// call api, action and response
export function submitCreateUser(data) {
  const TOKEN = getItem('auth_token');

  if(TOKEN){
    return function(dispatch) {
      createUserApi.doCreateUser(data).then(data => {
        
        dispatch(doCreateUserRes(data));
        dispatch(doCreateUserRes(null));
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
      createUserApi.fetchAllCountry().then(data => {
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
      createUserApi.fetchAllState(data).then(data => {
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
      createUserApi.fetchAllCity(data).then(data => {
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