import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import userReducer from '../slices/user';
import counterReducer, {changeTo} from '../slices/counter';

const reducer = {
   user: userReducer,
   counter: counterReducer
}

const store = configureStore({
   reducer: reducer,
   middleware: [...getDefaultMiddleware()]
});

export default store;


store.subscribe(()=>{
   console.log('from subscribe')
   console.log(store.getState())
})

window.changeTo = (to)=>{
   store.dispatch(changeTo(to));
}