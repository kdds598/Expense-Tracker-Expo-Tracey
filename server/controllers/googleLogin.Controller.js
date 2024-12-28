// import {User} from "../models/User.model.js"; // Ensure the correct file extension


// export const createUser =  async (req, res) => {
//     const { uid, name, email,displayName, picture, photoURL} = req.user;

// console.log(req.user);
// console.log(uid, name, email,displayName, picture, photoURL);

  
//     let user = await User.findOne({ uid });
//     if(user){
//       if(req.user.providerData.length>=0){
//           if(req.user.providerData[0].providerId==='google.com'){
            
//             user.picture = photoURL;
//             user.name=displayName;
//             await user.save();
//             res.send(user);
//           }

//       }
//       // console.log(user.provderData);
      
       

//     }
//   else{
//     if (!user) {
//       // Use 'name' if available; otherwise, default to 'displayName'
//       user = new User({
//         uid,
//         email: email||undefined,
//         name: name || displayName,
//         picture:picture,

//       });
//       await user.save();
//     }
    
  
//     res.send(user);
//   }
// };

import { User } from "../models/User.model.js";

export const createUser = async (req, res) => {
  const { uid, name, email, displayName, picture, photoURL } = req.user;


  let user = await User.findOne({ uid });
  if (user) {
    if (req.user.providerData.length >= 0 && req.user.providerData[0].providerId === 'google.com') {
      user.picture = photoURL;
      user.name = displayName;
      await user.save();
      return res.send(user);
    }
  } else {
    user = new User({
      uid,
      email:email||undefined,
      name: name || displayName,
      picture,
    });
    await user.save();
  }

  res.send(user);
};
