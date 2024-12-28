// src/services/accountsApi.js
import { ApiProvider, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ApliSlice = createApi({
  reducerPath: 'ApiInteraction',

  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }), // Adjust the base URL as per your backend
  tagTypes: ['Accounts', 'AccountTransactions','Budgets', 'BudgetTransactions'],
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
      providesTags: ['Accounts'],
    }),
    
    getAccountById: builder.query({
        query: (accountId) => `account/${accountId}`,
        providesTags:['Accounts','AccountTransactions'],
        
    }),
  
    createAccount: builder.mutation({
      query: (newAccount) => ({
        url: '/account',
        method: 'POST',
        body: newAccount,
      }),
      invalidatesTags: ['Accounts'],
    }),

    deleteAccount: builder.mutation({
      query: (accountId) => ({
        url: `/account/${accountId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Accounts'],
    }),

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
      providesTags: ['AccountTransactions'],

    }),
    
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: '/transaction',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['AccountTransactions'],
    }),
    deleteTransaction: builder.mutation({
      query: (transactionId) => ({
        url: `/transaction/${transactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AccountTransactions'],
    }),   

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
      providesTags: ['Budgets'],

    }),

    getBudgetById: builder.query({
      query: (budgetId) => `budget/${budgetId}`,
      providesTags:['Budgets','BudgetTransactions'],

    }),
    
    createBudget: builder.mutation({
      query: (newBudget) => ({
        url: '/budget',
        method: 'POST',
        body: newBudget,
      }),
      invalidatesTags: ['Budgets'],
    }),
    deleteBudget: builder.mutation({
      query: (budgetId) => ({
        url: `/budget/${budgetId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Budgets'],
    }),
   
    getBudgetTransactions: builder.query({
      query: ({ uid, searchText, sortField, sortOrder, BudgetId }) => {
        return {
          url: '/budget-transactions',
          params: { uid, searchText, sortField, sortOrder, BudgetId },
        };
      },
      providesTags: ['BudgetTransactions'],
    }),
    createBTransaction: builder.mutation({
      query: (transaction) => ({
        url: '/Btransaction',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['BudgetTransactions'],
    }),
    deleteBTransaction: builder.mutation({
      query: (transactionId) => ({
        url: `/Btransaction/${transactionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['BudgetTransactions'],
    }),
    getUserByUid: builder.query({
      query: (uid) => `/user-info/${uid}`, // Endpoint to fetch the user by UID
      providesTags:['Accounts','Budgets'],
    }),


  }),
  });

  export const {
    useGetAccountByIdQuery,
    useGetAccountsQuery,
    useCreateAccountMutation,
    useDeleteAccountMutation,
    useGetAccountTransactionsQuery,
    useCreateTransactionMutation,
    useDeleteTransactionMutation,
    useGetBudgetsQuery,
    useGetBudgetByIdQuery,
    useCreateBudgetMutation,
    useDeleteBudgetMutation,
    useGetBudgetTransactionsQuery,
    useCreateBTransactionMutation,
    useDeleteBTransactionMutation,
    useGetUserByUidQuery,
  } = ApliSlice;