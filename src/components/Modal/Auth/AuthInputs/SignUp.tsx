import { useState } from "react"

type SignUpProps = {

}

const SignUp: React.FC<SignUpProps> = () => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = () => {

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm((prev) => ({
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
        title="Sign Up"
        className="auth-button-modal bg-blue-500 border-blue-500 hover:bg-transparent hover:text-blue-500 focus:bg-transparent focus:text-blue-500"
      >
        Sign Up
      </button>
    </form>
  )
}

export default SignUp