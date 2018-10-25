import {
  GET_LIST,
  GET_LIST_SUCCESS,
  GET_LIST_FAILED
} from './types'

import axios from 'axios'
var api = require('../../api/api.js').url;

export const getLoanFees = (params) => {
  return (dispatch) => {
    dispatch({ type: GET_LIST })
    var url = api + 'getList' //api here
    axios.post(url, {params})
    .then(res => {
      dispatch({
        type: GET_LIST_SUCCESS,
        payload: res.data.getListResult
      })
    })
    .catch(err => {
      dispatch({
        type: GET_LIST_FAILED,
        payload: err
      })
    })
  }
}
