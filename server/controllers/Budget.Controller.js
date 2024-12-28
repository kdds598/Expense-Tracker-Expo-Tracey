import { Budget } from "../models/Budget.model.js";
import { User } from "../models/User.model.js";
import { BudgetBalHistory } from "../models/BudgetBalHistory.js";
import { BudgetTransaction } from "../models/BudgetTransaction.model.js";



export const createBudget =  async (req, res) => {

  let { uid, budgetName, totalBudget } = req.body;

  
  totalBudget = Number(totalBudget);


  function getFalsyVarNames(obj) {
    return Object.entries(obj)
      .filter(([key, value]) => !value) // Check if the value is falsy
      .map(([key]) => key)              // Extract the keys (variable names)
      .join(', ');                      // Join them into a string
    }
  
  const falsyVars = getFalsyVarNames({ uid, budgetName, totalBudget });
      console.log(falsyVars);


  // Validate required fields
  if ( !uid || !budgetName || !totalBudget) {
   return res.status(400).json({ error: 'Missing required fields, '+falsyVars+' is not provided' });
 } if (totalBudget<1) {
   return res.status(400).json({ message: 'Budget\'s Total budget can\'t be less than 1.' });
}


    try {


      const user = await User.findOne({ uid });

      
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }
      
      const userObjectId = user._id;
      // console.log(req.body);
      

     
  
      // Create new budget document
      const newBudget = new Budget({
        userObjectId,
        uid,
        budgetName,
        availableBudget:totalBudget,
        totalBudget,
        transactions:[], // Optional, can be empty
        balanceHistory :null// Optional, can be empty
      });
  
      // Save the new budget to the database
      const savedBudget = await newBudget.save();

      
      let balanceHistory = new BudgetBalHistory({uid:uid,
        BudgetId:savedBudget._id
      })

      
      balanceHistory.balanceHistory.push({
        balance: totalBudget,
        timestamp: Date.now()
      });
      const bhob = await balanceHistory.save();

      savedBudget.balanceHistory = bhob._id;

      await savedBudget.save();

      user.budgets = user.budgets || []; // Ensure the budgets array is initialized
      user.budgets.push(savedBudget._id); // Add the new budget's ObjectId to the array
        
      await user.save();

  
      // Return success response
      // res.status(201).json({"Budget created & ref added to user's account array and accbalhistory created :":savedBudget});
      console.log("Budget created & ref added to user's account array and accbalhistory created.");
    
      res.status(201).json({message:"Budget created successfully",budget:savedBudget});

    } catch (error) {
      console.error('Error creating new budget:', error);
      if(error.code===11000){
        res.status(500).json({ message:`already have an budget with name \"${budgetName}\"`});
    }else{

    res.status(500).json({ message: 'Server error',error:error });
    }    
  
  }
  };

// router.delete('/budget/:budgetId')

 export const deleteBudget =  async (req, res) => {
    const { budgetId } = req.params;

    

    try {
        // 1. Find the budget by its ID
        const budget = await Budget.findById(budgetId);

        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        let uid = budget.uid;

        const user = await User.findOne({ uid });
            
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }




        // 2. Remove the budget reference from the user's budgets array
        await User.updateOne(
            { _id: budget.userObjectId },
            { $pull: { budgets:budgetId } }
        );

        // 3. Delete all transactions associated with the budget
        await BudgetTransaction.deleteMany({ BudgetId:budgetId });

        // 4. Delete the associated balance history
        await BudgetBalHistory.deleteOne({ BudgetId:budgetId });

        // 5. Delete the budget itself
        const deletedBudget = await Budget.findByIdAndDelete(budgetId);

        // res.status(200).json({ message: 'Budget, transactions, and balance history deleted successfully' });
        console.log('Budget, transactions, and balance history deleted successfully');
        
        res.status(200).json({ message: 'Budget deleted successfully',deleteBudget:deletedBudget

         });

    } catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({ message: 'Server error',error:error });
    }
};

  
