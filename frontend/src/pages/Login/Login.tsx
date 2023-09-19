import axios, { AxiosError } from "axios";
import { useState } from "react";

const formValues = {
  password: '',
  email: ''
};

function Login() {
  const [values, setValues] = useState(formValues);
  const [error, setError] = useState<{ message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/login', values)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
        setError(error.response?.data);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      {error && <p>{error.message}</p>}
      <h2 className="mb-5">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input className="p-2" type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input className="p-2" type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login;