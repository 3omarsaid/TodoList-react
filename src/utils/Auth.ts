import {
  signInWithPopup,
  GoogleAuthProvider,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { actionCodeSettings, auth } from "./firebaseConfig";

const provider = new GoogleAuthProvider();

export const handleGoogleSignIn = (navigate: (path: string) => void) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      navigate("/");
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleSignOut = (navigate: (path: string) => void) => {
  auth.signOut().then(() => {
    navigate("/auth");
  });
};

export const handelSignIn = ({
  email,
  navigate,
}: {
  email: string;
  navigate: (path: string) => void;
}) => {
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      window.localStorage.setItem("emailForSignIn", email);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const handleSignInWithEmailLink = (navigate: (path: string) => void) => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");
    if (!email) {
      email = window.prompt("Please provide your email for confirmation");
    }
    signInWithEmailLink(auth, email as string, window.location.href)
      .then(() => {
        window.localStorage.removeItem("emailForSignIn");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
