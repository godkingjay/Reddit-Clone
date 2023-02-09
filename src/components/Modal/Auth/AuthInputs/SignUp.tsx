import {
  authModalState
} from "@/atoms/authModalAtom";

import React, {
  useEffect,
  useState
} from "react"

import {
  useSetRecoilState
} from "recoil";

import {
  useCreateUserWithEmailAndPassword
} from "react-firebase-hooks/auth";

import {
  auth
} from "@/firebase/clientApp";

import LoadingSpinner from "public/svg/loading-spinner.svg";
import { FIREBASE_ERRORS } from "@/firebase/errors";

type SignUpProps = {

}

const SignUp: React.FC<SignUpProps> = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  })

  const setAuthModal = useSetRecoilState(authModalState);

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [formError, setFormError] = useState(false);
  const [userError, setUserError] = useState<typeof error | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formError) setFormError(false);
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setFormError(true);
      return;
    }
    createUserWithEmailAndPassword(
      signUpForm.email,
      signUpForm.password
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleChangeAuth = () => {
    setAuthModal((prev) => ({
      ...prev,
      view: "login"
    }));
  }

  useEffect(() => {
    setUserError(error);
  }, [error]);

  return (
    <form className="w-full flex flex-col" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col mt-1 gap-y-4">
        <input
          required
          title="Email"
          type="email"
          name="email"
          placeholder="Email"
          className="auth-input"
          onChange={(e) => {
            handleChange(e);
            setUserError(null);
          }}
        />
        <input
          required
          title="Password"
          type="password"
          name="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) => {
            handleChange(e);
            setFormError(false);
          }}
        />
        <input
          required
          title="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="auth-input"
          onChange={(e) => {
            handleChange(e);
            setFormError(false);
          }}
        />
      </div>
      {formError && (
        <p className="w-full break-words text-sm text-center text-red-500 mt-2">Password does not match.</p>
      )}
      <div className="w-full mb-4 mt-6 flex flex-col">
        {
          !loading
          ? (
            <button
              type="submit"
              title="Sign Up"
              className="auth-button-modal bg-blue-500 border-blue-500 hover:bg-transparent hover:text-blue-500 focus:bg-transparent focus:text-blue-500"
              disabled={formError || userError ? true : false}
            >
              Sign Up
            </button>
          )
          : (
            <div className="w-full h-max flex flex-col items-center justify-center my-1">
              <LoadingSpinner
                className="aspect-square h-[32px] w-[32px] animate-spin [&>path]:stroke-blue-500"
              />
            </div>
          )
        }
      </div>
      {error && userError && (
        <p className="w-full break-words text-sm text-center text-red-500 mb-4">
          { error && FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS] ? FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS] : userError.message }
        </p>
      )}
      <p className="text-xs text-center">Already a redditor? <button type="button" title="Log In" className="auth-modal-link underline font-bold" tabIndex={0} onClick={() => handleChangeAuth()}>Log In</button></p>
    </form>
  )
}

export default SignUp