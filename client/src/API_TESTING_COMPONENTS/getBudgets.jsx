import { useGetBudgetsQuery } from '../../Store/RTKqueries.js'
import React, { useState } from 'react';

const BudgetsList = () => {
  const [filters, setFilters] = useState({
    uid: '',
    sortField: '',
    sortOrder: '',
    searchText: '',
  });

  const [fetchTrigger, setFetchTrigger] = useState(false);

  const { data: budgets, error, isLoading } = useGetBudgetsQuery(filters, {
    skip: !fetchTrigger, // Prevent the query from auto-fetching
  });

  // Handle input changes
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Fetch budgets on button click
  const handleFetch = () => {
    setFetchTrigger(true);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Budget Manager</h1>
      <div style={styles.filtersContainer}>
        <input
          style={styles.input}
          type="text"
          name="uid"
          placeholder="User ID (required)"
          value={filters.uid}
          onChange={handleChange}
        />
        <select
          style={styles.select}
          name="sortField"
          value={filters.sortField}
          onChange={handleChange}
        >
          <option value="">Sort By</option>
          <option value="createdAt">Created At</option>
          <option value="totalBudget">Total Budget</option>
          <option value="availableBudget">Available Budget</option>
          <option value="budgetName">Budget Name</option>
          <option value="transactionCount">Transaction Count</option>
        </select>
        <select
          style={styles.select}
          name="sortOrder"
          value={filters.sortOrder}
          onChange={handleChange}
        >
          <option value="">Sort Order</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <input
          style={styles.input}
          type="text"
          name="searchText"
          placeholder="Search Text"
          value={filters.searchText}
          onChange={handleChange}
        />
        <button style={styles.button} onClick={handleFetch}>
          Fetch Budgets
        </button>
      </div>

      {isLoading && <p style={styles.message}>Loading budgets...</p>}
      {error && <p style={styles.message}>Error: {error.message}</p>}
      {budgets && budgets.length > 0 ? (
        <ul style={styles.budgetList}>
          {budgets.map((budget) => (
            <li style={styles.budgetItem} key={budget._id}>
              <h2 style={styles.budgetName}>{budget.budgetName}</h2>
              <p>Total Budget: <span style={styles.highlight}>{budget.totalBudget}</span></p>
              <p>Available Budget: <span style={styles.highlight}>{budget.availableBudget}</span></p>
              <p>Transactions: <span style={styles.highlight}>{budget.transactions?.length}</span></p>
            </li>
          ))}
        </ul>
      ) : !isLoading && fetchTrigger ? (
        <p style={styles.message}>No budgets found.</p>
      ) : null}
    </div>
  );
};

// Inline Styles
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
  filtersContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
  },
  select: {
    flex: '1',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px',
    backgroundColor: '#fff',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  budgetList: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
  },
  budgetItem: {
    padding: '15px',
    marginBottom: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  budgetName: {
    margin: '0 0 10px 0',
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  message: {
    textAlign: 'center',
    color: '#666',
  },
};

export default BudgetsList;
