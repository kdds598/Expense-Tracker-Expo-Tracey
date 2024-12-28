import React, { useState } from 'react';
import { useCreateBudgetTransactionMutation,useDeleteBudgetTransactionMutation } from '../../Store/RTKqueries.js'


const CreateBudgetTransactionComponent = () => {


  const [createbTransaction] = useCreateBudgetTransactionMutation();

  // State to hold transaction details
  const [formData, setFormData] = useState({
    BudgetId: '',
    amount: '',
    note: '',
    category: '',
    uid: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createbTransaction(formData).unwrap();
      alert('Transaction created successfully!');
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Failed to create transaction');
    }
  };

  return (
    <div>
      <h2>Create Budget Transaction</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="BudgetId"
          placeholder="Budget ID"
          value={formData.BudgetId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="uid"
          placeholder="User ID"
          value={formData.uid}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Transaction</button>
      </form>
    </div>
  );
};

export { CreateBudgetTransactionComponent};



const DeleteBudgetTransactionComponent = () => {
  const [deletebTransaction] = useDeleteBudgetTransactionMutation();

  // State to hold the transaction ID to delete
  const [transactionId, setTransactionId] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setTransactionId(e.target.value);
  };

  // Handle delete submission
  const handleDelete = async () => {
    if (!transactionId) {
      alert('Please enter a valid Transaction ID');
      return;
    }

    try {
      const response = await deletebTransaction(transactionId).unwrap();
      alert('Transaction deleted successfully!');
      setTransactionId(''); // Reset input
    } catch (error) {
        
      console.error('Error deleting transaction:', error);
      alert('Failed to delete transaction');
    }
  };

  return (
    <div>
      <h2>Delete Budget Transaction</h2>
      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={transactionId}
        onChange={handleChange}
        required
      />
      <button onClick={handleDelete}>Delete Transaction</button>
    </div>
  );
};

export { DeleteBudgetTransactionComponent};
