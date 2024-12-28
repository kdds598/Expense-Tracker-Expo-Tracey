import { AccountTransaction } from '../models/AccountTransaction.model.js';
import { User } from '../models/User.model.js';
import { Account } from '../models/Account.model.js';


// Function to get AccountTransactions by UID with sorting and searching options
export const getAccountTransaction =  async (req, res) => {
    const { uid, searchText, sortField, sortOrder, typeFilter,AccountId } = req.query;

    // Validate if uid is provided
    if (!uid) {
      if(!AccountId){
        return res.status(400).json({ message: 'UID & Account Id is required' });
      }
      return res.status(400).json({ message: 'UID is required' });
    }

    if(!AccountId){
      return res.status(400).json({ message: 'Account Id is required' });

    }

    const user = await User.findOne({ uid });
          
    if (!user) {
              return res.status(404).json({ message: 'User not found.' });
      }

      try {

    // Define valid sort fields and their default orders
    const validSortFields = ['createdAt', 'updatedAt', 'amount', 'category', 'date','note'];
    const validSortOrder = ['asc', 'desc'];

    // Validate sortField and sortOrder
    const sortBy = validSortFields.includes(sortField) ? sortField : 'createdAt'; // Default to 'createdAt'
    const order = validSortOrder.includes(sortOrder?.toLowerCase())
              ? (sortOrder.toLowerCase() === 'desc' ? -1 : 1)
              : 1; // Default to ascending order

   

    // Search filter object
    const searchFilter = { uid }; // Base filter is UID

    if (typeFilter && ['income', 'expenditure'].includes(typeFilter)) {  // for filtering income or expense if given
        searchFilter.type = typeFilter;
      }

    if (AccountId ) {  // for filtering income or expense if given
        const tempaccount = await Account.findById(AccountId);

        if(!tempaccount){
            return res.status(404).json({ message: 'account not found.' });

        }

        searchFilter.AccountId = AccountId;
      }

   

    // Find AccountTransactions by UID and apply sorting and searching
    const transactions = await AccountTransaction.find(searchFilter)
      .populate('AccountId')  // Populate the referenced account
      .sort({ [sortBy]: order })  // Apply sorting dynamically
      .exec();


      const filteredtxns = transactions.filter(txn => {
        const lowerCaseSearchText = searchText ? searchText.toLowerCase() : '';
        return (
          txn.AccountId.toString().toLowerCase().includes(lowerCaseSearchText) ||  // Search by budget name
          txn.uid.toLowerCase().includes(lowerCaseSearchText) ||        // Search by UID
          txn.type.toString().includes(lowerCaseSearchText) ||  // Search by userObjectId
          txn.category.toString().includes(lowerCaseSearchText) ||   // Search by total budget
          txn.note.toString().includes(lowerCaseSearchText)||   // Search by available budget
          txn.amount.toString().includes(lowerCaseSearchText)  // search by balance history

        );
      }
    );





    // Return the sorted and filtered transactions
    res.status(200).json(filteredtxns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error:error });
  }
};












// diff logic


// Function to get AccountTransactions by UID with sorting and searching options
// router.get('/transactions', async (req, res) => {
//     try {
//       const { uid, searchQuery, sortField, sortOrder, typeFilter } = req.query;
  
//       // Validate if uid is provided
//       if (!uid) {
//         return res.status(400).json({ message: 'UID is required' });
//       }
  
//       const user = await User.findOne({ uid });
            
//       if (!user) {
//                 return res.status(404).json({ message: 'User not found.' });
//         }
  
  
//       // Define valid sort fields and their default orders
//       const validSortFields = ['createdAt', 'updatedAt', 'amount', 'category', 'date','note'];
//       const validSortOrder = ['asc', 'desc'];
  
//       // Validate sortField and sortOrder
//       const sortBy = validSortFields.includes(sortField) ? sortField : 'createdAt'; // Default to 'createdAt'
//       const order = validSortOrder.includes(sortOrder?.toLowerCase())
//                 ? (sortOrder.toLowerCase() === 'desc' ? -1 : 1)
//                 : 1; // Default to ascending order
  
     
  
//       // Search filter object
//       const searchFilter = { uid }; // Base filter is UID
  
//       // Add search functionality if searchQuery is provided
//       if (searchQuery) {
//         const regex = new RegExp(searchQuery, 'i'); // Case-insensitive search
//         searchFilter.$or = [
//           { category: regex },
//           { note: regex },
//           { amount: regex },
//           { type: regex },
//           { uid: regex }
//         ];
//       }
  
//       // Find AccountTransactions by UID and apply sorting and searching
//       const transactions = await AccountTransaction.find(searchFilter)
//         .populate('AccountId')  // Populate the referenced account
//         .sort({ [sortBy]: order })  // Apply sorting dynamically
//         .exec();
  
//       // Return the sorted and filtered transactions
//       res.status(200).json(transactions);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   });
  
//   export default router;