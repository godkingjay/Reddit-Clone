import React, {
  useState
} from "react"

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = () => {

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
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
    </form>
  )
}

export default Login