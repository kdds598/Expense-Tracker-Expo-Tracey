import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAccountTransactionsQuery } from '../../Store/RTKqueries.js'; // Adjust the path as needed

const AccountTransactions = () => {
  const [uid, setUid] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');
  const [typeFilter, setTypeFilter] = useState('');
  const [AccountId, setAccountId] = useState('');

  const [triggerFetch, setTriggerFetch] = useState(false);

  // Query hook to fetch data only when the button is clicked
  const { data, error, isLoading, refetch } = useGetAccountTransactionsQuery(
    { uid, searchText, sortField, sortOrder, typeFilter, AccountId },
    { skip: !triggerFetch } // Skip the query until the button is clicked
  );

  const handleUidChange = (event) => {
    setUid(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortField(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
  };

  const handleAccountChange = (event) => {
    setAccountId(event.target.value);
  };

  const handleSearchSubmit = () => {
    setTriggerFetch(true); // Trigger the query when the button is clicked
    refetch(); // Manually trigger the refetch with the updated params
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Account Transactions</h2>
      <div style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>UID:</label>
          <input
            type="text"
            value={uid}
            onChange={handleUidChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Search Text:</label>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Sort By:</label>
          <select
            value={sortField}
            onChange={handleSortChange}
            style={styles.input}
          >
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
            <option value="date">Date</option>
            <option value="note">Note</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Sort Order:</label>
          <button onClick={handleSortOrderChange} style={styles.button}>
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Type Filter:</label>
          <select
            value={typeFilter}
            onChange={handleTypeFilterChange}
            style={styles.input}
          >
            <option value="">All</option>
            <option value="income">Income</option>
            <option value="expenditure">Expenditure</option>
          </select>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Account ID:</label>
          <input
            type="text"
            value={AccountId}
            onChange={handleAccountChange}
            style={styles.input}
          />
        </div>

        <button onClick={handleSearchSubmit} style={styles.button}>
          Fetch Transactions
        </button>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={styles.error}>Error: {error.message}</p>
      ) : (
        <div>
          <h3>Transaction Data</h3>
          <pre style={styles.pre}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    width: '80%',
    margin: '0 auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  error: {
    color: 'red',
  },
  pre: {
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px',
    overflowX: 'auto',
  },
};

export default AccountTransactions;
