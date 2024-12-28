import React, { useState } from 'react';
import { useCreateBudgetMutation } from '../../Store/RTKqueries.js';

const CreateBudget = () => {
  const [uid, setUid] = useState('');
  const [budgetName, setBudgetName] = useState('');
  const [totalBudget, setTotalBudget] = useState('');
  const [createBudget, { isLoading, isSuccess, isError, error }] = useCreateBudgetMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const result =  await createBudget({ uid, budgetName, totalBudget });
     
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Create Budget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Budget Name"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Total Budget"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Budget'}
        </button>
      </form>

      {isSuccess && <p>Budget created successfully!</p>}
      {isError && <p>Error: {error.data?.message || 'Something went wrong'}</p>}
    </div>
  );
};

export default CreateBudget;
