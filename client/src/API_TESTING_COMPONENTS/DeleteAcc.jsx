import React, { useState } from 'react';
import { useDeleteAccountMutation } from '../../Store/RTKqueries.js';

const DeleteAccount = () => {
  const [accountId, setAccountId] = useState('');
  const [deleteAccount, { isLoading, isError, isSuccess, error }] = useDeleteAccountMutation();

  const handleDelete = async () => {
    try {
      const result = await deleteAccount(accountId).unwrap();
      alert('Account deleted successfully!');
    } catch (err) {
      console.error('Failed to delete account:', err);
      alert(`Error deleting account: ${err.data?.message || 'Unknown error'}`);
    }
  };

  return (
    <div>
      <h2>Delete Account</h2>
      <input
        type="text"
        placeholder="Enter Account ID"
        value={accountId}
        onChange={(e) => setAccountId(e.target.value)}
      />
      <button onClick={handleDelete} disabled={isLoading}>
        {isLoading ? 'Deleting...' : 'Delete Account'}
      </button>
      {isSuccess && <p>Account deleted successfully!</p>}
      {isError && <p>Error: {error.data?.message || 'An error occurred.'}</p>}
    </div>
  );
};

export default DeleteAccount;
