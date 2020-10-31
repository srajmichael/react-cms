import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
   name: 'counter',
   initialState: 5,
   reducers: {
      changeTo(state, action){
         console.log(state, action)
         return action.payload
      }
   }
})


export const { changeTo } = counterSlice.actions;
export default counterSlice.reducer;