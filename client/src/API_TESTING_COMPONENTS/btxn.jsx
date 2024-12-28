// components/BudgetTransactions.jsx
import React, { useState } from 'react';
import { useGetBudgetTransactionsQuery } from '../../Store/RTKqueries.js';


const BudgetTransactions = () => {
  const [uid, setUid] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');
  const [BudgetId, setBudgetId] = useState('');

  const { data: transactions, error, isLoading } = useGetBudgetTransactionsQuery({
    uid,
    searchText,
    sortField,
    sortOrder,
    BudgetId,
  });

  const handleFetchClick = () => {
    if (!uid.trim()) {
      alert('Please enter a valid UID');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Budget Transactions</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter UID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
        />
        <button style={styles.button} onClick={handleFetchClick}>
          Fetch Transactions
        </button>
      </div>

      <div style={styles.filters}>
        <input
          style={styles.input}
          type="text"
          placeholder="Search text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Budget ID"
          value={BudgetId}
          onChange={(e) => setBudgetId(e.target.value)}
        />
        <select
          style={styles.select}
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="createdAt">Created At</option>
          <option value="updatedAt">Updated At</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
          <option value="note">Note</option>
        </select>
        <select
          style={styles.select}
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={styles.error}>Error: {error.message}</p>}
      {transactions && (
        <div style={styles.transactionsList}>
          {transactions.map((txn, index) => (
            <div key={index} style={styles.transactionItem}>
              <p><strong>Amount:</strong> {txn.amount}</p>
              <p><strong>Category:</strong> {txn.category}</p>
              <p><strong>Note:</strong> {txn.note}</p>
              <p><strong>Created At:</strong> {txn.createdAt}</p>
              <p><strong>Updated At:</strong> {txn.updatedAt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  input: {
    width: '60%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  select: {
    width: '20%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  transactionsList: {
    marginTop: '20px',
  },
  transactionItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
  },
};

export default BudgetTransactions;
