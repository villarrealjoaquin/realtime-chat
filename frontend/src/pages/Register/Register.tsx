import { useState } from "react";
import axios, { AxiosError } from 'axios';

const formValues = {
  username: '',
  password: '',
  email: ''
};

export default function Register() {
  const [values, setValues] = useState(formValues);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3000/api/register', values)
    } catch (error) {
      if (error instanceof AxiosError)
        console.log(error.response?.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div>
      <h2 className="mb-5">Registro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input className="p-2" type="text" placeholder="username" name="username" onChange={handleChange} />
        <input className="p-2" type="email" placeholder="Email" name="email" onChange={handleChange} />
        <input className="p-2" type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  )
}