import * as types from '../action/actionTypes'; 
import initialState from './initialState';

export default function (state = initialState.data, action) {
  switch(action.type) {
    case types.DO_HOME_RES:
      return action.data
    default:
      return state
  }
}
