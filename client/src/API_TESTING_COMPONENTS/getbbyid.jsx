import React, { useState } from 'react';
import { useGetBudgetByIdQuery } from '../../Store/RTKqueries.js';

const BudgetDetails = () => {
  const [budgetId, setBudgetId] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);

  const { data: budget, error, isLoading } = useGetBudgetByIdQuery(budgetId, {
    skip: !triggerFetch,
  });

  const handleFetchClick = () => {
    if (budgetId.trim()) {
      setTriggerFetch(true);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Budget Details</h1>
      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          type="text"
          placeholder="Enter Budget ID"
          value={budgetId}
          onChange={(e) => {
            setBudgetId(e.target.value);
            setTriggerFetch(false);
          }}
        />
        <button style={styles.button} onClick={handleFetchClick}>
          Fetch Budget
        </button>
      </div>
      {isLoading && <p style={styles.message}>Loading...</p>}
      {error && <p style={styles.error}>Error: {error?.data?.message || 'An error occurred'}</p>}
      {budget && (
        <div style={styles.budgetDetails}>
          <h2 style={styles.budgetName}>{budget.budgetName}</h2>
          <p>
            Total Budget: <span style={styles.highlight}>{budget.totalBudget}</span>
          </p>
          <p>
            Available Budget: <span style={styles.highlight}>{budget.availableBudget}</span>
          </p>
          <div style={styles.section}>
            <h3>Transactions:</h3>
            <ul style={styles.list}>
              {budget.transactions?.map((transaction) => (
                <li key={transaction._id} style={styles.listItem}>
                  <p>{transaction.note}</p>
                  <p>Amount: {transaction.amount}</p>
                  <p>Date: {new Date(transaction.date).toLocaleDateString()}</p>
                </li>
              )) || <p>No transactions found.</p>}
            </ul>
          </div>
          <div style={styles.section}>
            <h3>Balance History:</h3>
            <ul style={styles.list}>
              {Array.isArray(budget.balanceHistory.balanceHistory)
                ? budget.balanceHistory.balanceHistory.map((history) => (
                    <li key={history.timestamp} style={styles.listItem}>
                      <p>Balance: {history.balance}</p>
                      <p>Date: {new Date(history.timestamp).toLocaleDateString()}</p>
                    </li>
                  ))
                : <p>No balance history available.</p>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  inputContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  input: {
    width: '60%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    textAlign: 'center',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  budgetDetails: {
    borderTop: '1px solid #ddd',
    paddingTop: '20px',
  },
  budgetName: {
    color: '#007bff',
    marginBottom: '10px',
  },
  section: {
    marginTop: '20px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
};

export default BudgetDetails;
