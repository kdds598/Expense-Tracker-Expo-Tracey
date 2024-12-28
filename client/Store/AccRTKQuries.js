// src/services/accountsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ApliSlice = createApi({
  reducerPath: 'ApiInteraction',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_Backend_URL, // Your backend URL
    prepareHeaders: (headers, { getState, extra }) => {
      // You can keep the headers preparation here, but without adding 'Bearer'
      const token = extra?.authToken; // Get the token passed as part of the query argument

      if (token) {
        headers.set('Authorization', token); // Just add the token without 'Bearer'
      }

      return headers;
    },
  }),
  tagTypes: ['Accounts', 'AccountTransactions', 'Budgets', 'BudgetTransactions'],
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: ({ uid, sortField = 'createdAt', sortOrder = 'asc', searchText = '', token }) => {
        const params = new URLSearchParams({
          uid,
          sortField,
          sortOrder,
          searchText,
        }).toString();

        return {
          url: `/accounts?${params}`,
          headers: { Authorization: token }, // Pass token directly without 'Bearer'
        };
      },
      providesTags: ['Accounts'],
    }),

    getAccountById: builder.query({
      query: ({accountId, token}) => ({
        url: `account/${accountId}`,
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      providesTags: ['Accounts', 'AccountTransactions'],
    }),

    createAccount: builder.mutation({
      query: ({ newAccount, token }) => ({
        url: '/account',
        method: 'POST',
        body: newAccount,
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      invalidatesTags: ['Accounts'],
    }),

    deleteAccount: builder.mutation({
      query: ({accountId, token}) => ({
        url: `/account/${accountId}`,
        method: 'DELETE',
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      invalidatesTags: ['Accounts'],
    }),

    getAccountTransactions: builder.query({
      query: ({ uid, searchText, sortField, sortOrder, typeFilter, AccountId, token }) => {
        const params = new URLSearchParams({
          uid,
          searchText: searchText || '',
          sortField: sortField || 'createdAt',
          sortOrder: sortOrder || 'asc',
          typeFilter: typeFilter || '',
          AccountId: AccountId || '',
        }).toString();

        return {
          url: `/account-transactions?${params}`,
          headers: { Authorization: token }, // Pass token directly without 'Bearer'
        };
      },
      providesTags: ['AccountTransactions'],
    }),

    createTransaction: builder.mutation({
      query: ({ transaction, token }) => ({
        url: '/transaction',
        method: 'POST',
        body: transaction,
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      invalidatesTags: ['AccountTransactions'],
    }),

    deleteTransaction: builder.mutation({
      query: ({transactionId, token}) => ({
        url: `/transaction/${transactionId}`,
        method: 'DELETE',
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      invalidatesTags: ['AccountTransactions'],
    }),

    getBudgets: builder.query({
      query: ({ uid, sortField, sortOrder, searchText, token }) => {
        const params = new URLSearchParams({
          uid,
          ...(sortField && { sortField }),
          ...(sortOrder && { sortOrder }),
          ...(searchText && { searchText }),
        }).toString();

        return {
          url: `/budgets?${params}`,
          headers: { Authorization: token }, // Pass token directly without 'Bearer'
        };
      },
      providesTags: ['Budgets'],
    }),

    getBudgetById: builder.query({
      query: ({budgetId, token}) => ({
        url: `budget/${budgetId}`,
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      providesTags: ['Budgets', 'BudgetTransactions'],
    }),

    createBudget: builder.mutation({
      query: ({ newBudget, token }) => ({
        url: '/budget',
        method: 'POST',
        body: newBudget,
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      invalidatesTags: ['Budgets'],
    }),

    deleteBudget: builder.mutation({
      query: ({budgetId, token}) => ({
        url: `/budget/${budgetId}`,
        method: 'DELETE',
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      invalidatesTags: ['Budgets'],
    }),

    getBudgetTransactions: builder.query({
      query: ({ uid, searchText, sortField, sortOrder, BudgetId, token }) => {
        return {
          url: '/budget-transactions',
          params: { uid, searchText, sortField, sortOrder, BudgetId },
          headers: { Authorization: token }, // Pass token directly without 'Bearer'
        };
      },
      providesTags: ['BudgetTransactions'],
    }),

    createBTransaction: builder.mutation({
      query: ({ transaction, token }) => ({
        url: '/Btransaction',
        method: 'POST',
        body: transaction,
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      invalidatesTags: ['BudgetTransactions'],
    }),

    deleteBTransaction: builder.mutation({
      query: ({transactionId, token}) => ({
        url: `/Btransaction/${transactionId}`,
        method: 'DELETE',
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      invalidatesTags: ['BudgetTransactions'],
    }),

    getUserByUid: builder.query({
      query: ({uid, token}) => ({
        url: `/user-info/${uid}`,
        headers: { Authorization: token }, // Pass token directly without 'Bearer'
      }),
      providesTags: ['Accounts', 'Budgets'],
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
