import { AxiosError } from "axios";
import { useState } from "react";
import { addContact, getContact } from "../../service/chat.service";
import { useAuth } from "../../hook/useAuth";
import { Contact } from "../../models/contact.model";

export const SearchContact = () => {
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState();

  const { setUser, user } = useAuth();

  const handleSearchUser = async () => {
    try {
      const res = await getContact({ email, id: user?.id });
      setContact(res.data);
      setEmail('');
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data.message;
        setError(errorMessage);
        setEmail('');
      }
    }
  };

  const handleAddNewContact = async (id: string | undefined, contact: Contact) => {
    try {
      const res = await addContact({ id, contact });
      if (res.data) {
        setUser((prevUser) => ({
          ...prevUser!,
          contacts: [...(prevUser?.contacts as Contact[]), res.data.newContact]
        }));
      }
      setContact(null);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <>
      <div className='items-center'>
        <form onSubmit={(e) => e.preventDefault()} className='flex gap-3'>
          <input
            type="text"
            className='h-5 py-4 pl-1'
            placeholder='Search a new contact'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSearchUser} className='bg-zinc-600 py-1 px-2'>Buscar</button>
        </form>
        {contact &&
          <div className='bg-stone-950 px-5 py-3 flex justify-between items-center gap-5'>
            <h3 className='font-bold'>{contact.username}</h3>
            <button onClick={() => handleAddNewContact(user?.id, contact)} className='bg-sky-400 font-bold py-1 px-2'>+</button>
          </div>}
        {error && (
          <div>
            <p>
              {error}
            </p>
          </div>)}
      </div>
    </>
  )
}