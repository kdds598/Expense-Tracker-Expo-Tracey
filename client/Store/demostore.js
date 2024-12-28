import { configureStore, createSlice } from "@reduxjs/toolkit";
import { AccountapiSlice, AcctransactionApiSlice, budgetApiSlice, budgettransactionApiSlice, getAccountByIdApiSlice, getAccountsApiSlice, getAccountTransactionByIdApiSlice, getAccountTransactionsApiSlice, getBudgetByIdApiSlice, getBudgetsApiSlice, getBudgetTransactionByIdApiSlice, getBudgetTransactionsApiSlice } from './RTKqueries.js';
import { getAccountTransaction } from "../../Expo_Tracey/server/controllers/getAccountTransaction.Controller.js";
import { getBudgetTransaction } from "../../Expo_Tracey/server/controllers/getBudgetTransaction.Controller.js";
import { accountsApi, ApliSlice, budgetApi, userinfoSlice } from "./AccRTKQuries.js";


//demo slice
const demoslice = createSlice({
  name: "stylesReducer",
  initialState: {
    counter : 0
   },
  reducers: {
    display: (state, action) => {
      console.log(state, action);
    },
  },
});



// Testing Api content
// export const expoStore = configureStore({
//   reducer: {
//     fslice: demoslice.reducer,
//     [getAccountTransactionByIdApiSlice.reducerPath]:getAccountTransactionByIdApiSlice.reducer,
//     [getBudgetTransactionByIdApiSlice.reducerPath]:getBudgetTransactionByIdApiSlice.reducer,
//     [getAccountTransactionsApiSlice.reducerPath]:getAccountTransactionsApiSlice.reducer,
//     [getAccountByIdApiSlice.reducerPath]:getAccountByIdApiSlice.reducer,
//     [getBudgetTransactionsApiSlice.reducerPath]:getBudgetTransactionsApiSlice.reducer,
//     [getBudgetsApiSlice.reducerPath]:getBudgetsApiSlice.reducer,
//     [getAccountsApiSlice.reducerPath]:getAccountsApiSlice.reducer,
//     [AccountapiSlice.reducerPath]: AccountapiSlice.reducer,
//     [budgetApiSlice.reducerPath]:budgetApiSlice.reducer,
//     [budgettransactionApiSlice.reducerPath]:budgettransactionApiSlice.reducer,
//     [AcctransactionApiSlice.reducerPath]:AcctransactionApiSlice.reducer,
//     [getBudgetByIdApiSlice.reducerPath]:getBudgetByIdApiSlice.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(AccountapiSlice.middleware)
//   .concat(budgetApiSlice.middleware)
//   .concat(AcctransactionApiSlice.middleware)
//   .concat(budgettransactionApiSlice.middleware)
//   .concat(getAccountsApiSlice.middleware)
//   .concat(getBudgetsApiSlice.middleware)
//   .concat(getBudgetByIdApiSlice.middleware)
//   .concat(getAccountByIdApiSlice.middleware)
//   .concat(getBudgetTransactionsApiSlice.middleware)
//   .concat(getAccountTransactionsApiSlice.middleware)
//   .concat(getBudgetTransactionByIdApiSlice.middleware)
//   .concat(getAccountTransactionByIdApiSlice.middleware),
// });


// export const expoStore = configureStore({
//   reducer: {
//         [demoslice.reducerPath] : demoslice.reducer,
//         [userinfoSlice.reducerPath]:userinfoSlice.reducer,
//         [accountsApi.reducerPath]:accountsApi.reducer,
//         [budgetApi.reducerPath]:budgetApi.reducer,

//   },
//   middleware:(getDefaultMiddleware)=>
//     getDefaultMiddleware().concat(accountsApi.middleware)
//     .concat(budgetApi.middleware)
//     .concat(userinfoSlice.middleware)
  

// });

export const expoStore = configureStore({
  reducer: {
        [demoslice.reducerPath] : demoslice.reducer,
        [ApliSlice.reducerPath]:ApliSlice.reducer,
        

  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(ApliSlice.middleware)
    
  

});

export const fsliceActions = demoslice.actions;
