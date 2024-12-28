// RTK QUERIES for testing purposes


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AccountapiSlice = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // Adjust the base URL as per your backend
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (accountData) => ({
        url: '/api/account',
        method: 'POST',
        body: accountData,
      }),
    }),
    deleteAccount: builder.mutation({
        query: (accountId) => ({
          url: `/api/account/${accountId}`,
          method: 'DELETE',
        }),
      }),
  }),
});



export const budgetApiSlice = createApi({
  reducerPath: 'budgetApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Replace with your backend URL
  endpoints: (builder) => ({
    createBudget: builder.mutation({
      query: (budgetData) => ({
        url: '/budget',
        method: 'POST',
        body: budgetData,
      }),
    }),
    deleteBudget: builder.mutation({
      query: (budgetId) => ({
        url: `/budget/${budgetId}`,
        method: 'DELETE',
      }),
    }),
  }),
});



// Create the transaction API slice
export const AcctransactionApiSlice = createApi({
  reducerPath: 'AcctransactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api', // Update with your backend URL
  }),
  endpoints: (builder) => ({
    // Create Transaction Mutation
    createTransaction: builder.mutation({
      query: (transactionData) => ({
        url: '/transaction',
        method: 'POST',
        body: transactionData,
      }),
    }),

    // Delete Transaction Mutation
    deleteTransaction: builder.mutation({
      query: (transactionId) => ({
        url: `/transaction/${transactionId}`,
        method: 'DELETE',
      }),
    }),
  }),
});


export const budgettransactionApiSlice = createApi({
  reducerPath: 'budgettransactionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api', // Replace with your API URL
  }),
  endpoints: (builder) => ({
    // 1. Create a Budget Transaction
    createBudgetTransaction: builder.mutation({
      query: (transactionData) => ({
        url: '/Btransaction',
        method: 'POST',
        body: transactionData,
      }),
    }),

    // 2. Delete a Budget Transaction
    deleteBudgetTransaction: builder.mutation({
      query: (transactionId) => ({
        url: `/Btransaction/${transactionId}`,
        method: 'DELETE',
      }),
    }),

   
  }),
});



export const getAccountsApiSlice = createApi({
  reducerPath: 'getAccountsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Replace '/api' with your backend's base URL
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: ({ uid, sortField = 'createdAt', sortOrder = 'asc', searchText = '' }) => {
        const params = new URLSearchParams({
          uid,
          sortField,
          sortOrder,
          searchText,
        }).toString();

        return `/accounts?${params}`;
      },
    }),
  }),
});



export const getBudgetsApiSlice = createApi({
  reducerPath: 'getBudgetsApi', // Unique key for the API slice
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Replace '/api' with your backend's base URL
  endpoints: (builder) => ({
    getBudgets: builder.query({
      query: ({ uid, sortField, sortOrder, searchText }) => {
        const params = new URLSearchParams({
          uid,
          ...(sortField && { sortField }), // Add if exists
          ...(sortOrder && { sortOrder }), // Add if exists
          ...(searchText && { searchText }), // Add if exists
        });
        return `/budgets?${params.toString()}`; // Endpoint URL with query parameters
      },
    }),
  }),
});


// Export hooks for use in components


export const getBudgetByIdApiSlice = createApi({
  reducerPath: 'getBudgetByIdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Replace '/api' with your backend's base URL
  endpoints: (builder) => ({
    getBudgetById: builder.query({
      query: (budgetId) => `budget/${budgetId}`,
    }),
  }),
});

export const getAccountByIdApiSlice = createApi({
  reducerPath: 'getAccountByIdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }), // Adjust the base URL accordingly
  endpoints: (builder) => ({
    getAccountById: builder.query({
      query: (accountId) => `account/${accountId}`,
    }),
  }),
});


export const getBudgetTransactionsApiSlice = createApi({
  reducerPath: 'getBudgetTransactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api/' }), // Adjust the base URL accordingly
  endpoints: (builder) => ({
    getBudgetTransactions: builder.query({
      query: ({ uid, searchText, sortField, sortOrder, BudgetId }) => {
        return {
          url: 'budget-transactions',
          params: { uid, searchText, sortField, sortOrder, BudgetId },
        };
      },
    }),
  }),
});


export const getAccountTransactionsApiSlice = createApi({
  reducerPath: 'getAccountTransactionsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Adjust the base URL accordingly
  endpoints: (builder) => ({
    getAccountTransactions: builder.query({
      query: ({ uid, searchText, sortField, sortOrder, typeFilter, AccountId }) => {
        // Construct query params
        const params = new URLSearchParams({
          uid,
          searchText: searchText || '',
          sortField: sortField || 'createdAt',
          sortOrder: sortOrder || 'asc',
          typeFilter: typeFilter || '',
          AccountId: AccountId || ''
        });

        return `/account-transactions?${params.toString()}`;
      },
      transformResponse: (response) => response, // Optionally transform the data
    }),
  }),
});

export const getBudgetTransactionByIdApiSlice = createApi({
  reducerPath: 'getBudgetTransactionByIdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Adjust the base URL accordingly
  endpoints: (builder) => ({
    getBudgetTransaction: builder.query({
      query: (transactionId) => `/budgetTransaction/${transactionId}`,
    }),
  }),
});



export const getAccountTransactionByIdApiSlice = createApi({
  reducerPath: 'getAccountTransactionByIdApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Adjust the base URL accordingly
  endpoints: (builder) => ({
    getAccountTransaction: builder.query({
      query: (transactionId) => `/Accounttransaction/${transactionId}`,
    }),
  }),
});

export const { useGetAccountTransactionQuery } = getAccountTransactionByIdApiSlice;

export const { useGetBudgetTransactionQuery } = getBudgetTransactionByIdApiSlice;

export const { useGetAccountTransactionsQuery } = getAccountTransactionsApiSlice;

export const { useGetBudgetTransactionsQuery } = getBudgetTransactionsApiSlice;

export const { useGetAccountByIdQuery } = getAccountByIdApiSlice;



export const { useGetBudgetByIdQuery } = getBudgetByIdApiSlice;


export const { useGetBudgetsQuery } = getBudgetsApiSlice;


export const { useGetAccountsQuery } = getAccountsApiSlice;






export const {useCreateBudgetTransactionMutation,useDeleteBudgetTransactionMutation} = budgettransactionApiSlice;


// Export auto-generated hooks
export const { useCreateTransactionMutation, useDeleteTransactionMutation } = AcctransactionApiSlice;


export const { useCreateBudgetMutation, useDeleteBudgetMutation } = budgetApiSlice;


export const { useCreateAccountMutation ,useDeleteAccountMutation} = AccountapiSlice;
