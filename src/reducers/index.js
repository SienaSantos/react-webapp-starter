import { combineReducers } from 'redux';
import ListReducer from './ListReducer'

const rootReducer = combineReducers({
  list : ListReducer,
});

export default rootReducer;
