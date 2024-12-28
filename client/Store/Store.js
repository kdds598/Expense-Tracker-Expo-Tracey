import { configureStore, createSlice } from "@reduxjs/toolkit";

import { 
  // accountsApi, 
  ApliSlice, 
  // budgetApi, 
  // userinfoSlice 
} from "./AccRTKQuries.js";


export const expoStore = configureStore({
  reducer: {
        [ApliSlice.reducerPath]:ApliSlice.reducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(ApliSlice.middleware)
    
});
