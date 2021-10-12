import {combineReducers, createStore} from 'redux';
import drillsReducer from './reducers/drillsReducer';
import teamsReducer from './reducers/teamsReducer';

const rootReducer = combineReducers({
  drills: drillsReducer,
  teams: teamsReducer,
});

const store = createStore(rootReducer);

export default store;
