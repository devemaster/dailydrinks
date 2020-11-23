import * as types from './actionTypes';
// import {logout} from '../helper/helper';

// request payload set
export function doHome(data) {

  return {
    type: types.DO_HOME, 
    data
  };
}

// request respnse set
export function doHomeRes(data) {  
  return {
    type: types.DO_HOME_RES,
    data
  };
}

// call api, action and response
export function submit_home(data) {
  return function(dispatch) {
        dispatch(doHomeRes(data));
        // dispatch(doHomeRes(null));
      
  };
}


