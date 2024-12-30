import React, { createContext, useContext,useState,useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.js";
import { getAuth } from "firebase/auth";

// Create Auth Context
export const AuthContext = createContext();

// Provide the Auth Context
export const AuthProvider = ({ children }) => {
    
  const [user, uloading, uerror] = useAuthState(auth);
    const [idToken, setIdToken] = useState(null);

    useEffect(() => {
      
      
      if (user) {
        // Fetch the ID token from the user object
        user.getIdToken()
          .then((token) => {
            setIdToken(token); 
            
          })
          .catch((err) => {
            console.error("Error fetching ID token:", err);
          });
          
      }
    }, [user]); // Run the effect whenever the user changes

  return (
    <AuthContext.Provider value={{ user, uloading, uerror, auth ,idToken}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);
