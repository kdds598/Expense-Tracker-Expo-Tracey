
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
