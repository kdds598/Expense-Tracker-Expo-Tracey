import React, { useState } from 'react';
import { useGetBudgetTransactionQuery } from '../../Store/RTKqueries.js';

const BudgetTransactionDetails = () => {
  const [transactionId, setTransactionId] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false); // State to trigger the fetch action

  // Using RTK Query to fetch data
  const { data, error, isLoading } = useGetBudgetTransactionQuery(transactionId, {
    skip: !triggerFetch, // Skip the query if the fetch hasn't been triggered
  });

  const handleInputChange = (e) => {
    setTransactionId(e.target.value); // Update the transactionId state
  };

  const handleFetchClick = () => {
    if (transactionId) {
      setTriggerFetch(true); // Trigger the fetch
    }
  };

  return (
    <div style={styles.container}>
      <h2>Fetch Budget Transaction</h2>
      
      {/* Input for Transaction ID */}
      <input
        type="text"
        value={transactionId}
        onChange={handleInputChange}
        placeholder="Enter Transaction ID"
        style={styles.input}
      />
      
      {/* Button to fetch the transaction */}
      <button onClick={handleFetchClick} style={styles.button}>
        Fetch Transaction
      </button>

      {/* Loading, error, and data handling */}
      {isLoading && <p>Loading...</p>}
      {error && <p style={styles.error}>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>Transaction Details:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: '8px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default BudgetTransactionDetails;
