import { Budget } from "../models/Budget.model.js";
import { User } from "../models/User.model.js";






export const getBudgets = async (req, res) => {
    try {
      const { uid, sortField, sortOrder, searchText } = req.query;
  
      // Validate if uid is provided
      if (!uid) {
        return res.status(400).json({ message: 'UID is required' });
      }

      const user = await User.findOne({ uid });
          
      if (!user) {
                return res.status(404).json({ message: 'User not found' });
        }
  
      // Define valid sort fields and their default orders
      const validSortFields = ['createdAt', 'totalBudget', 'availableBudget', 'budgetName', 'transactionCount'];
      const validSortOrder = ['asc', 'desc'];
  
      const sortBy = validSortFields.includes(sortField) ? sortField : 'createdAt'; // Default to 'createdAt'
      const order = validSortOrder.includes(sortOrder?.toLowerCase())
              ? (sortOrder.toLowerCase() === 'desc' ? -1 : 1)
              : 1; // Default to ascending order

      // Validate sortField and sortOrder
    //   if (sortField && !validSortFields.includes(sortField)) {
    //     return res.status(400).json({ message: `Invalid sort field. Valid options are: ${validSortFields.join(', ')}` });
    //   }
  
    //   if (sortOrder && !validSortOrder.includes(sortOrder.toLowerCase())) {
    //     return res.status(400).json({ message: `Invalid sort order. Valid options are: ${validSortOrder.join(', ')}` });
    //   }
  
      // Set default sorting if no sorting options are provided
    //   const sortBy = sortField || 'createdAt'; // Default sort by timestamp
    //   const order = sortOrder && sortOrder.toLowerCase() === 'desc' ? -1 : 1; // Default sort order is ascending
  
      // Find budgets by UID
      const budgets = await Budget.find({ uid })
        // .populate('transactions')  // Populate the referenced transactions
        // .populate('balanceHistory')     //populate the referenced balanceHistory
        .exec();
    
      // Filter budgets based on searchText if provided
      const filteredBudgets = budgets.filter(budget => {
        const lowerCaseSearchText = searchText ? searchText.toLowerCase() : '';
        return (
          budget.budgetName.toLowerCase().includes(lowerCaseSearchText) ||  // Search by budget name
          budget.uid.toLowerCase().includes(lowerCaseSearchText) ||        // Search by UID
          budget.userObjectId.toString().includes(lowerCaseSearchText) ||  // Search by userObjectId
          budget.totalBudget.toString().includes(lowerCaseSearchText) ||   // Search by total budget
          budget.availableBudget.toString().includes(lowerCaseSearchText)||   // Search by available budget
          budget.balanceHistory.toString().includes(lowerCaseSearchText)  // search by balance history

        );
      });
  
      // Sort filtered budgets
      const sortedBudgets = filteredBudgets.sort((a, b) => {
        const aValue = sortBy === 'transactionCount' ? a.transactions.length : a[sortBy];
        const bValue = sortBy === 'transactionCount' ? b.transactions.length : b[sortBy];
        return (order === 1 ? aValue - bValue : bValue - aValue);
      });
  
      // Return the sorted budgets
      res.status(200).json(sortedBudgets);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  







//old fun

// export const getBudgets =  async (req, res) => {
//     try {
//       const { uid, sortField, sortOrder } = req.query;
  
//       // Validate if uid is provided
//       if (!uid) {
//         return res.status(400).json({ message: 'UID is required' });
//       }

//       const user = await User.findOne({ uid });
          
//       if (!user) {
//           return res.status(404).json({ message: 'User not found.' });
//       }
      


  
//       // Define valid sort fields and their default orders
//       const validSortFields = ['createdAt', 'updatedAt', 'totalBudget', 'availableBudget', 'budgetName'];
//       const validSortOrder = ['asc', 'desc'];
  
//       // Determine the sorting field and order; if not provided, use defaults
//       const sortBy = validSortFields.includes(sortField) ? sortField : 'createdAt'; // Default to 'createdAt'
//       const order = validSortOrder.includes(sortOrder?.toLowerCase())
//         ? (sortOrder.toLowerCase() === 'desc' ? -1 : 1)
//         : 1; // Default to ascending order
  
      
  
//       // Find budgets by UID and budgetName (if searched) and apply sorting
//       const budgets = await Budget.find({uid})
//         .populate('transactions')    // Populate the referenced transactions
//         .populate('balanceHistory')   // Populate the balanceHistory reference
//         .sort({ [sortBy]: order })    // Apply dynamic sorting
//         .exec();
  
//       // Return the filtered and sorted budgets
//       res.status(200).json(budgets);
//     } catch (error) {
//       res.status(500).json({ message: 'Server error', error });
//     }
//   };
  