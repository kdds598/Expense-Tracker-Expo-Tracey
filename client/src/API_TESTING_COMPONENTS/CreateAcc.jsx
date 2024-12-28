import React, { useState } from 'react';
import { useCreateAccountMutation } from '../../Store/RTKqueries';

const CreateAccountForm = () => {
  const [formData, setFormData] = useState({
    uid: '',
    accountName: '',
    availableBalance: '',
  });

  const [createAccount, { isLoading, isSuccess, isError, error }] = useCreateAccountMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createAccount(formData).unwrap(); // Wait for the result
      alert('Account created successfully!');
      setFormData({ uid: '', accountName: '', availableBalance: '' }); // Reset form
    } catch (err) {
      console.error('Failed to create account:', err); // Log the error
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="uid">User ID:</label>
          <input
            type="text"
            id="uid"
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="accountName">Account Name:</label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={formData.accountName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="availableBalance">Available Balance:</label>
          <input
            type="number"
            id="availableBalance"
            name="availableBalance"
            value={formData.availableBalance}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Account'}
        </button>
      </form>

      {isSuccess && <p>Account created successfully!</p>}
      {isError && <p>Error: {error?.data?.message || 'Something went wrong'}</p>}
    </div>
  );
};

export default CreateAccountForm;
