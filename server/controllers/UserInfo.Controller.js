import {User} from '../models/User.model.js';


export const getUserByUid = async (req, res) => {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ message: 'UID is required.' });
    }

    // Find the user document by uid
    const user = await User.findOne({ uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const {name,accounts,budgets}=user
    const userObj = {name,accounts,budgets}

    // Return the user document
    res.status(200).json({
      message: 'User fetched successfully.',
      user:userObj,
    });
  } catch (error) {
    console.error('Error fetching user by UID:', error);
    res.status(500).json({
      message: 'Failed to fetch user.',
      error: error.message,
    });
  }
};
