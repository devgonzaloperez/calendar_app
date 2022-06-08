import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; //Sirve para utilizar las dev tools en Google.

export const store = createStore(
    rootReducer, //Reducer que contiene todos los reducers.
    composeEnhancers(applyMiddleware(thunk)) //Thunk para asincronismo.
);
