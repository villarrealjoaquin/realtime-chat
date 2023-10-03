import { useState } from "react";
import { useAuth } from "../../hook/useAuth";

export default function Register() {
  const [values, setValues] = useState({
    id: '',
    username: '',
    password: '',
    email: '',
    alias: '',
    contacts: [],
    conversatios: []
  });
  const { signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(values);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  };

  return (
    <div className="h-screen grid place-content-center">
      <div className="bg-indigo-300 p-20">
        <h2 className="mb-5 font-bold">Registro</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input className="p-3 text-black" type="text" placeholder="username" name="username" onChange={handleChange} />
          <input className="p-3 text-black" type="email" placeholder="Email" name="email" onChange={handleChange} />
          <input className="p-3 text-black" type="password" placeholder="Contraseña" name="password" onChange={handleChange} />
          <button className="bg-indigo-500 py-3 font-bold">Submit</button>
        </form>
      </div>
    </div>
  )
}