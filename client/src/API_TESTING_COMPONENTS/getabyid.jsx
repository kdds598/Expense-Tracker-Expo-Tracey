// components/AccountDetails.jsx
import React, { useState } from 'react';
import { useGetAccountByIdQuery } from '../../Store/RTKqueries.js';

const AccountDetails = () => {
  const [accountId, setAccountId] = useState('');
  const { data: account, error, isLoading } = useGetAccountByIdQuery(accountId, {
    skip: !accountId, // Skip the request if no accountId is provided
  });

  const handleFetchClick = () => {
    if (accountId.trim()) {
      // This will trigger the query when the account ID is provided
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Account Details</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
        />
        <button style={styles.button} onClick={handleFetchClick}>
          Fetch Account
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={styles.error}>Error: {error.message}</p>}
      {account && (
        <div style={styles.accountDetails}>
          <h2>Account Name: {account.accountName}</h2>
          <p>Balance: {account.availableBalance}</p>
          <p>Transactions: {account.AccountTransactions.length}</p>
          <ul>
            {account.AccountTransactions && account.AccountTransactions.map((transaction, index) => (
              <li key={index}>
                {transaction.note} - {transaction.amount}
              </li>
            ))}
          </ul>
          <p>Balance History:</p>
          <ul>
            {account.balanceHistory.balanceHistory && account.balanceHistory.balanceHistory.map((history, index) => (
              <li key={index}>
                {history.timestamp} - {history.balance}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
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
    width: '70%',
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
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
  accountDetails: {
    marginTop: '20px',
  },
};

export default AccountDetails;
