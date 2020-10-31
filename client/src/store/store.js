import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import userReducer from '../slices/user';

const reducer = {
   user: userReducer
}

const store = configureStore({
   reducer: reducer,
   middleware: [...getDefaultMiddleware()]
});

export default store;


store.subscribe(()=>{
   console.log(store.getState())
})