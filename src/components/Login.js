import React, { useRef, useState } from "react";
import Header from "./Header";
import { checkValidate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    let error = "";
    if (isSignInForm) {
      error = checkValidate(email.current.value, password.current.value);
    } else {
      error = checkValidate(
        email.current.value,
        password.current.value,
        name.current.value
      );
    }
    if (error) {
      setErrorMessage(error);
      return;
    }

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/87907384?v=4",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } =
                userCredential?.user;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      //Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in

          // ...
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/41c789f0-7df5-4219-94c6-c66fe500590a/3149e5eb-4660-4e3d-9e65-b1e615229c64/IN-en-20240513-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
          className="h-screen object-cover w-screen"
        />
      </div>
      <form
        className="bg-black absolute w-1/4 p-12 my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80 "
        onClick={(e) => e.preventDefault()}
      >
        <h1 className="font-bold text-3xl my-4">
          {" "}
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
            ref={name}
          />
        )}
        <input
          type="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
          ref={email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
          ref={password}
        />
        <button
          className="my-6 p-4 bg-red-700 w-full rounded-lg"
          onClick={() => handleButtonClick()}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className=" text-red-700">{errorMessage ?? null}</p>
        <p className="py-4 cursor-pointer" onClick={() => toggleSignInForm()}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now "
            : "Already Registered! Sign In Now "}
        </p>
      </form>
    </div>
  );
};

export default Login;
