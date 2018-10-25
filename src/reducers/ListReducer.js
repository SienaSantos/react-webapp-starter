import {
    GET_LIST ,
    GET_LIST_SUCCESS ,
    GET_LIST_FAILED

} from '../actions/types'

const INITIAL_STATE = {
  loading: false,
  data : {},
  error: '' ,
  success: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST:
      return { ...state ,data: action.payload, loading: true}
    case GET_LIST_SUCCESS:
      return { ...state ,data: action.payload, success: true, loading: false}
    case GET_LIST_FAILED:
      return { ...state ,data: action.payload, success: false, loading: false}

    default:
      return state
  }
};
