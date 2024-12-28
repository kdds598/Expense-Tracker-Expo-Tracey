import React, { useState } from 'react';
import { useGetAccountsQuery } from '../../Store/RTKqueries.js';

const AccountsSearch = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    uid: '',
    sortField: 'createdAt',
    sortOrder: 'asc',
    searchText: '',
  });
  const [fetchData, setFetchData] = useState(false);

  // Extract fields from state
  const { uid, sortField, sortOrder, searchText } = formData;

  // Fetch data using RTK Query
  const { data: accounts, error, isLoading } = useGetAccountsQuery(formData, {
    skip: !fetchData || !uid, // Fetch only when UID is provided and button is clicked
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch button click
  const handleFetch = () => {
    if (!uid) {
      alert('Please provide a UID to fetch accounts.');
      return;
    }
    setFetchData(true);
  };

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    form: {
      marginBottom: '20px',
      border: '1px solid #ccc',
      padding: '15px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    label: {
      display: 'block',
      marginBottom: '10px',
      fontWeight: 'bold',
    },
    input: {
      marginLeft: '10px',
      padding: '5px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    select: {
      marginLeft: '10px',
      padding: '5px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      display: 'block',
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    buttonDisabled: {
      backgroundColor: '#aaa',
      cursor: 'not-allowed',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      padding: '10px',
      marginBottom: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#fff',
    },
    error: {
      color: 'red',
    },
  };

  return (
    <div style={styles.container}>
      <h1>Search Accounts</h1>

      {/* Form for input fields */}
      <form style={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div>
          <label style={styles.label}>
            UID:
            <input
              type="text"
              name="uid"
              value={uid}
              onChange={handleInputChange}
              placeholder="Enter User UID"
              style={styles.input}
              required
            />
          </label>
        </div>

        <div>
          <label style={styles.label}>
            Sort Field:
            <select
              name="sortField"
              value={sortField}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="createdAt">Created At</option>
              <option value="updatedAt">Updated At</option>
              <option value="availableBalance">Available Balance</option>
              <option value="accountName">Account Name</option>
              <option value="transactionCount">Transaction Count</option>
            </select>
          </label>
        </div>

        <div>
          <label style={styles.label}>
            Sort Order:
            <select
              name="sortOrder"
              value={sortOrder}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>

        <div>
          <label style={styles.label}>
            Search Text:
            <input
              type="text"
              name="searchText"
              value={searchText}
              onChange={handleInputChange}
              placeholder="Enter text to search"
              style={styles.input}
            />
          </label>
        </div>

        <button
          type="button"
          style={{ ...styles.button, ...(uid ? {} : styles.buttonDisabled) }}
          onClick={handleFetch}
          disabled={!uid}
        >
          Fetch Accounts
        </button>
      </form>

      {/* Display loading state */}
      {isLoading && <p>Loading accounts...</p>}

      {/* Display error message */}
      {error && <p style={styles.error}>Error: {error.message}</p>}

      {/* Display accounts */}
      {accounts && (
        <div>
          <h2>Accounts List</h2>
          {accounts.length === 0 ? (
            <p>No accounts found.</p>
          ) : (
            <ul style={styles.list}>
              {accounts.map((account) => (
                <li key={account._id} style={styles.listItem}>
                  <p>
                    <strong>Account Name:</strong> {account.accountName}
                  </p>
                  <p>
                    <strong>Available Balance:</strong> {account.availableBalance}
                  </p>
                  <p>
                    <strong>Transaction Count:</strong> {account.AccountTransactions?.length || 0}
                  </p>
                  <p>
                    <strong>Balance History Count:</strong> {account.balanceHistory?.length || 0}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountsSearch;
