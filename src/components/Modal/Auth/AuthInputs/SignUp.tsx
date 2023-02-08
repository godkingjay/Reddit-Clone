import { authModalState } from "@/atoms/authModalAtom";
import { useState } from "react"
import { useSetRecoilState } from "recoil";

type SignUpProps = {

}

const SignUp: React.FC<SignUpProps> = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: ""
  })

  const setAuthModal = useSetRecoilState(authModalState);

  const handleSubmit = () => {

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleChangeAuth = () => {
    setAuthModal((prev) => ({
      ...prev,
      view: "login"
    }));
  }

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
          onChange={(e) => handleChange(e)}
        />
        <input
          required
          title="Password"
          type="password"
          name="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        type="submit"
        title="Sign Up"
        className="auth-button-modal my-4 bg-blue-500 border-blue-500 hover:bg-transparent hover:text-blue-500 focus:bg-transparent focus:text-blue-500"
      >
        Sign Up
      </button>
      <p className="text-xs text-center">Already a redditor? <button type="button" title="Log In" className="auth-modal-link underline font-bold" tabIndex={0} onClick={() => handleChangeAuth()}>Log In</button></p>
    </form>
  )
}

export default SignUp