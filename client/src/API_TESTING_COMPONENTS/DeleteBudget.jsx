import React, { useState } from 'react';
import { useDeleteBudgetMutation } from '../../Store/RTKqueries.js';

const DeleteBudget = () => {
  const [budgetId, setBudgetId] = useState('');
  const [deleteBudget, { isLoading, isSuccess, isError, error }] = useDeleteBudgetMutation();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
    const result = await deleteBudget(budgetId);
    
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Delete Budget</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          placeholder="Budget ID"
          value={budgetId}
          onChange={(e) => setBudgetId(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete Budget'}
        </button>
      </form>

      {isSuccess && <p>Budget deleted successfully!</p>}
      {isError && <p>Error: {error.data?.message || 'Something went wrong'}</p>}
    </div>
  );
};

export default DeleteBudget;
