import React, { useState } from "react";
import styles from "../Styles/Signup.module.css";
import validator from "validator";
import aa from "../assets/imglap.jpg";
import axios from "axios";
import {
  signInAnonymouslyWithFirebase,
  googleProvider,
} from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import { useAuth } from "../Context/Context.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const { user, auth } = useAuth();
  const [selectedOption, setSelectedOption] = useState("signup");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [userName, userUserName] = useState("");
  const [errors, setErrors] = useState({});
  const [Serrors, setSErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);

  // Loading states for buttons
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);
  //validation
  

  const handlevalidation = () => {
    const newErrors = {};
    if (userName.length < 2) {
      // setErrors({...errors,userName:"Username must have atleast 2 characters."});
      // alert("Username cannot be empty.");
      newErrors.userName = "Username must have atleast 2 characters.";
    }
    if (userName.trim() === "") {
      // setErrors({...errors,userName:"Username cannot be empty."});
      // alert("Username cannot be empty.");
      newErrors.userName = "Username cannot be empty.";
    }

    if (password.length <= 5) {
      // setErrors({...errors,password:"Password must be 6 characters atleast."});
      newErrors.password="Password must be 6 characters atleast.";
      // alert("Password must be 6 characters atleast.");
    }

    if (!email || !validator.isEmail(email)) {
      // setErrors((errors)=>({...errors,email:"Please enter a valid email."}));
      newErrors.email = "Please enter a valid email.";
      // alert("Please enter a valid email.");
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return true;
    }
    setErrors({});
  };


  function handleSvalidation() {
    const newErrors = {};
    if (password.length <= 5) {
      // setErrors({...errors,password:"Password must be 6 characters atleast."});
      // alert("Password must be 6 characters atleast.");
      newErrors.password = "Password must be 6 characters atleast.";
    }

    if (!email || !validator.isEmail(email)) {
      setErrors({ ...errors, email: "Please enter a valid email." });
      newErrors.email = "Please enter a valid email.";
      // alert("Please enter a valid email.");
    }
    if (Object.keys(newErrors).length > 0) {
      setSErrors(newErrors);
      return true;
    }
    setErrors({});
  }


  const handleRequestOTP = async () => {
    if (handlevalidation()) {
      return;
    }

    setOtpSent(true); // Disable button
    try {
      const response = await axios.post(`${import.meta.env.VITE_Backend_URL}/send-otp`, {
        email,
      });
      toast.success(response.data.message); // Notify user
      setStep(2);
    } catch (err) {
      // console.log(err.response?.data.message || err.message);
      if (err.response.data.already) {
        setSelectedOption("signin");
      }
      toast.error(
        err.response?.data.message || err.message || err.data.message
      );
    } finally {
      setOtpSent(false); // Re-enable button after response
    }
  };

  const handleVerifyOTP = async () => {
    if (handlevalidation()) {
      return;
    }
    
    setLoadingVerify(true); // Show loading spinner
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_Backend_URL}/verify-otp`,
        {
          email,
          otp,
        }
      );

      if (response.data.verified) {
        if (response.data.already) {
          toast.error("User already exists.");
        } else {
          toast.success("Email verified successfully.");
          setOtpVerified(true); // Disable verify button
        }
        setStep(3);
      } else {
        toast.error("OTP verification failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        console.error(error.message);
      }
    } finally {
      setLoadingVerify(false); // Hide loading spinner
    }
  };

  const handleSignIn = async (e) => {
    if (handleSvalidation()) {
      return;
    }
    e.preventDefault();
    setLoadingSignIn(true); // Show loading state
    try {
      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Successfully Signed In!");
      setLoadingSignIn(false); // Hide loading state

      navigate("/");
    } catch (err) {
      // setError(err.message);
      toast.error("Invalid credentials!!");
    } finally {
      setLoadingSignIn(false); // Hide loading state
    }
  };

  const handleSignUp = async (e) => {
   

    if (handlevalidation()) {
      
      return;    

    }


    if (step === 3) {
      e.preventDefault();
      setLoadingSignUp(true); // Show loading state
      try {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = result.user;
        await updateProfile(user, {
          displayName: userName,
          emailVerified: true,
        });

        const token = await result.user.getIdToken();
        // console.log(token);

        const response = await fetch(`${import.meta.env.VITE_Backend_URL}/protected`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        toast.success("User signed up successfully!");
        setLoadingSignUp(false); // Hide loading state

        navigate("/");
      } catch (err) {
        // setError(err.message);
      } finally {
        setLoadingSignUp(false); // Hide loading state
      }
    } else {
      toast.error("OTP not verified");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      

      const token = await result.user.getIdToken();
      // console.log(token);

      const response = await fetch(
        `${import.meta.env.VITE_Backend_URL}/protected`

        , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      toast.success("Signed in with Google successfully!");
      navigate("/");
    } catch (error) {

      console.error("Error during sign-in:", error);
    }
  };

  const handleAnonymousLogin = async () => {

    
    try {
      if (userName === "") {
        setErrors({ ...errors, userName: "Enter username first" });
        toast.warning("Enter username first");
        return;
      }
      setLoadingGuest(true); // Set loading state to true when guest login is clicked

      const userCredential = await signInAnonymouslyWithFirebase();
      await updateProfile(userCredential.user, { displayName: userName });
      const user = userCredential.user;

      const token = await user.getIdToken();
      // console.log(token);
      

      const response = await fetch(
        `${import.meta.env.VITE_Backend_URL}/protected`,
         {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      

      toast.success("Signed in anonymously");
      setLoadingGuest(false); // Reset loading state after operation completes

      navigate("/");
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    } finally {
      setLoadingGuest(false); // Reset loading state after operation completes
    }
  };

  const renderFormFields = () => {
    switch (selectedOption) {
      case "signup":
        return (
          <>
            <div className={styles["input-group"]}>
              <label>Username</label>
              <input
                value={userName}
                onChange={(e) => userUserName(e.target.value)}
                placeholder="Username"
              />
              {errors.userName && (
                <small style={{ color: "red" }}>{errors.userName}</small>
              )}
              <label>Email address</label>
              <div className={styles["send-otp"]}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />

                <button
                  style={{ cursor: "pointer" }}
                  disabled={otpSent || otpVerified}
                  onClick={handleRequestOTP}
                  id={styles["otp-button"]}
                >
                  {otpVerified ? "Verified" : otpSent ? "Sending..." : "Send"}
                </button>
              </div>
              {errors.email && (
                <small style={{ color: "red" }}>{errors.email}</small>
              )}
            </div>
            <div className={styles["input-group"]}>
              <label>OTP</label>
              <div className={styles["otp"]}>
                <input
                  id={styles["otp-input"]}
                  type="number"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  disabled={otpVerified}
                />
                <button
                  style={{ cursor: "pointer" }}
                  onClick={handleVerifyOTP}
                  id={styles["otp-button"]}
                  disabled={loadingVerify || otpVerified}
                >
                  {loadingVerify ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
             
            </div>
            <div className={styles["input-group"]}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {errors.password && (
                <small style={{ color: "red" }}>{errors.password}</small>
              )}
            </div>
          </>
        );
      case "signin":
        return (
          <>
            <div className={styles["input-group"]}>
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
              {Serrors.email && (
                <small style={{ color: "red" }}>{Serrors.email}</small>
              )}
            </div>
            <div className={styles["input-group"]}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              {Serrors.password && (
                <small style={{ color: "red" }}>{Serrors.password}</small>
              )}
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["image-section"]}>
        <img src={aa} alt="desk setup" />
      </div>
      <div className={styles["form-section"]}>
        <h2>Select how you want to sign in</h2>
        <div className={styles["options"]}>
          <button
            onClick={() =>
              setSelectedOption(
                selectedOption === "signin" ? "signup" : "signin"
              )
            }
            className={`${styles["option-button"]} ${
              selectedOption === "signin" ? styles.selected : ""
            }`}
          >
            {selectedOption === "signin" ? "Signin" : "Signup"}
          </button>
        </div>
        {selectedOption && (
          <div className={styles["form-container"]}>
            {renderFormFields()}
            <button
              className={styles["sign-in-button"]}
              onClick={
                selectedOption === "signin" ? handleSignIn : handleSignUp
              }
              disabled={loadingSignIn || loadingSignUp} // Disable button during loading
            >
              {loadingSignIn || loadingSignUp ? (
                <span className={styles.spinner}>Loading...</span>
              ) : selectedOption === "signin" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        )}
        <div className={styles["hr-line-with-text"]}>
          <hr />
          <span>or Continue with</span>
          <hr />
        </div>
        <div className={styles["d-button"]}>
          <button
            onClick={handleGoogleSignIn}
            style={{ cursor: "pointer" }}
            className={styles["down-button"]}
          >
            Google
          </button>
          <button
            onClick={handleAnonymousLogin}
            style={{ cursor: "pointer" }}
            className={styles["down-button"]}
            disabled={loadingGuest}
          >
            {loadingGuest?"Signing in ...":"Guest Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
