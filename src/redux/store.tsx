import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

let store = createStore(rootReducer, applyMiddleware(thunk));

//window.store = store;

export default store;
