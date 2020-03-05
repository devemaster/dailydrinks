import * as types from './actionTypes';
import loginApi from '../api/loginApi';
import Swal from 'sweetalert2';
import { setItem } from '../utils/localStore';
// import {logout} from '../helper/helper';

export function doLogin(data) {

  return {
    type: types.DO_LOGIN, 
    data
  };
}

export function doLoginRes(user) {  
  return {
    type: types.DO_LOGIN_RES,
    user
  };
}

export function submit_login(data) {
  return function(dispatch) {
    loginApi.doLogin(data).then(user => {
      if (user.success === true) {
        let token = `Bearer `+user.token
        setItem('auth_token', token);
        setItem('userName', user.data.fullname);
        setItem('userRoleId', user.data.role_id);
        if (user.data.application_data) {
          setItem('adminAppData', JSON.stringify(user.data.application_data));
          setItem('adminAppId', user.data.application_data.app_id);
          setItem('adminAppName', user.data.application_data.app_name);
        }
        dispatch(doLoginRes(user));
        dispatch(doLoginRes(null));
      } else {
        Swal.fire({
          title: user.message,
          type: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          timer: 3000
        })
      }

      if(user.error){
        Swal.fire({
          title: user.message,
          type: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false,
          timer: 3000
        })
      }
    }).catch(error => {
      console.log(error);
      return error
    });
  };
}