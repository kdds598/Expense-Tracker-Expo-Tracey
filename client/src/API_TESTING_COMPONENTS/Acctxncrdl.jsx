import React, { useState } from 'react';
import { useCreateTransactionMutation, useDeleteTransactionMutation } from '../../Store/RTKqueries.js';

const TransactionComponent = () => {
  const [createTransaction] = useCreateTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const [formData, setFormData] = useState({
    AccountId: '',
    amount: '',
    note: '',
    category: '',
    type: '',
    uid: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateTransaction = async () => {
    try {
      const response = await createTransaction(formData).unwrap();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      const response = await deleteTransaction(transactionId).unwrap();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Create Transaction</h2>
      <input type="text" name="AccountId" placeholder="Account ID" onChange={handleInputChange} />
      <input type="number" name="amount" placeholder="Amount" onChange={handleInputChange} />
      <input type="text" name="note" placeholder="Note" onChange={handleInputChange} />
      <input type="text" name="category" placeholder="Category" onChange={handleInputChange} />
      <input type="text" name="type" placeholder="Type (income/expenditure)" onChange={handleInputChange} />
      <input type="text" name="uid" placeholder="User ID" onChange={handleInputChange} />
      <button onClick={handleCreateTransaction}>Create Transaction</button>

      <h2>Delete Transaction</h2>
      <input type="text" id="transactionId" placeholder="Transaction ID" />
      <button onClick={() => handleDeleteTransaction(document.getElementById('transactionId').value)}>
        Delete Transaction
      </button>
    </div>
  );
};

export default TransactionComponent;
