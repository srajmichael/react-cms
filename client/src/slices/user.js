import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers:{
      logOutUser(state){
         state = null;
      },
      logInUser(state, action){
         state = action.payload;
      }
   }
})

export const { logInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;