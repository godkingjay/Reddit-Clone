import { authModalState } from "@/atoms/authModalAtom";
import React, {
  useState
} from "react"
import { useSetRecoilState } from "recoil";

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const setAuthModal = useSetRecoilState(authModalState);

  const handleSubmit = () => {

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleChangeAuth = () => {
    setAuthModal((prev) => ({
      ...prev,
      view: "signup"
    }));
  }

  return (
    <form className="w-full flex flex-col gap-y-4 py-1" onSubmit={handleSubmit}>
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
      <button
        type="submit"
        title="Login"
        className="auth-button-modal bg-brand-100 border-brand-100 hover:bg-transparent hover:text-brand-100 focus:bg-transparent focus:text-brand-100"
      >
        Login
      </button>
      <p className="text-center text-xs">New to Reddit? <button type="button" title="Sign Up" className="auth-modal-link font-bold underline" tabIndex={0} onClick={() => handleChangeAuth()}>Sign Up</button></p>
    </form>
  )
}

export default Login