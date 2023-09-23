import { useState } from "react";
import { useAuth } from "../../hook/useAuth";

function Login() {
  const [values, setValues] = useState({
    id: '',
    password: '',
    email: ''
  });
  // const [error, setError] = useState<{ message: string } | null>(null);
  const { loginUser } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <div className="h-screen grid place-content-center">
        {/* {error && <p>{error.message}</p>} */}
        <h2 className="mb-5 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col gap-5">
          <input className="p-2 bg-black" type="email" value={values.email} placeholder="Email" name="email" onChange={handleChange} />
          <input className="p-2 bg-black" type="password" value={values.password} placeholder="Contraseña" name="password" onChange={handleChange} />
          <button className="bg-neutral-950 p-3 rounded-md">Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login;