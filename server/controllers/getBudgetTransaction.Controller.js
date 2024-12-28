import { Budget } from '../models/Budget.model.js';
import { User } from '../models/User.model.js';
import { BudgetTransaction } from '../models/BudgetTransaction.model.js';

// Function to get BudgetTransactions by UID with sorting and searching options
// router.get('/budget-transactions', 
export const getBudgetTransaction = async (req, res) => {
  try {
    const { uid, searchText, sortField, sortOrder,BudgetId } = req.query;

    // Validate if uid is provided
    if (!uid) {
      if(!BudgetId){
        return res.status(400).json({ message: 'UID & Budget Id is required' });
      }
      return res.status(400).json({ message: 'UID is required' });
    }

    if(!BudgetId){
      return res.status(400).json({ message: 'Budget Id is required' });

    }

    const user = await User.findOne({ uid });
          
    if (!user) {
              return res.status(404).json({ message: 'User not found.' });
      }


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
    if (BudgetId ) {  // for filtering income or expense if given
        const tempbudget = await Budget.findById(BudgetId);

        if(!tempbudget){
            return res.status(404).json({ message: 'budget not found.' });

        }

        searchFilter.BudgetId = BudgetId;
      }


   

    // Find BudgetTransactions by UID and apply sorting and searching
    const transactions = await BudgetTransaction.find(searchFilter)
      // .populate('BudgetId')  // Populate the referenced budget
      .sort({ [sortBy]: order })  // Apply sorting dynamically
      .exec();


      const filteredtxns = transactions.filter(txn => {
        const lowerCaseSearchText = searchText ? searchText.toLowerCase() : '';
        return (
          txn.BudgetId.toString().toLowerCase().includes(lowerCaseSearchText) ||  // Search by budget name
          txn.uid.toLowerCase().includes(lowerCaseSearchText) ||        // Search by UID
          txn.category.toString().includes(lowerCaseSearchText) ||   // Search by total budget
          txn.note.toString().includes(lowerCaseSearchText)||   // Search by available budget
          txn.amount.toString().includes(lowerCaseSearchText)  // search by balance history

        );
      }
    );




    // Return the sorted and filtered transactions
    res.status(200).json(filteredtxns);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

