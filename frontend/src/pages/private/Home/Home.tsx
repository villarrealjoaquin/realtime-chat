import { useState } from 'react';
// import { io } from 'socket.io-client';
import { ChatMessages } from '../../../components';
// import { URL } from '../../../constants/const';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../../hook/useAuth';
import { addContact, deleteContact, getContact } from '../../../service/chat.service';
import { AxiosError } from 'axios';
// const socket = io(URL);

export interface Contact {
  id: string;
  username: string;
  email: string;
  alias: string;
  contacts?: Contact[]
}

export default function Home() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState<Contact | null>(null);
  const [error, setError] = useState();

  const { setUser, user } = useAuth();

  console.log(user);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages([...messages, newMessage]);
    setNewMessage('');
    // socket.emit('chat-message', newMessage);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  // const sendMessage = (message: string) => {
  //   setMessages((prevState) => [...prevState, message]);
  // };

  const handleSearchUser = async () => {
    try {
      const res = await getContact({ email, id: user?.id });
      setContact(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        const errorMessage = error?.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  const handleAddNewContact = async (id: string | undefined, contact: Contact) => {
    try {
      const res = await addContact({ id, contact });
      if (res.data) {
        setUser((prevUser: any) => ({
          ...prevUser,
          contacts: [...prevUser.contacts, res.data.newContact]
        }))
      }

      setContact(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = async (id:string) => {
    try {
      const res = await deleteContact(id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   socket.on('chat-message', sendMessage);

  //   return () => {
  //     socket.off('chat-message', sendMessage);
  //   };
  // }, []);

  return (
    <section className="flex h-screen">
      <article className='flex flex-col justify-between p-10 bg-slate-100 border-r-2'>
        <div className='flex flex-col gap-5 cursor-pointer justify-center items-center'>
          <ForumIcon />
          <Diversity3Icon />
          <LogoutIcon />
        </div>
        <div>
          <img className='rounded-full' width={50} src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU=' alt='' />
        </div>
      </article>
      <article className='flex flex-col gap-7 p-10 w-[22%] bg-slate-100 overflow-y-scroll'>
        <div className='items-center'>
          <form onSubmit={(e) => e.preventDefault()} className='flex gap-3'>
            <input
              type="text"
              className='h-5 py-4'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSearchUser} className='bg-zinc-600 py-1 px-2'>Buscar</button>
          </form>
        </div>
        {
          contact &&
          <div className='bg-stone-950 px-5 py-3 flex justify-between items-center gap-5'>
            <h3 className='font-bold'>{contact.username}</h3>
            <button onClick={() => handleAddNewContact(user?.id, contact)} className='bg-sky-400 font-bold py-1 px-2'>+</button>
          </div>
        }
        {
          error && (
            <div>
              <p>
                {error}
              </p>
            </div>
          )
        }
        <h2 className='font-bold text-2xl'>Messages</h2>
        {user && user.contacts?.length > 0 ? user?.contacts?.map((contact, index) => (
          <div key={index} className='flex justify-between items-center text-black'>
            <img
              className='rounded-full'
              width={50}
              src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU='
              alt=''
            />
            <div>
              <p>{contact.username}</p>
              <p>Loremsdaczxczx</p>
            </div>
            <div>
              <button className='bg-zinc-500 p-2' onClick={() => handleDeleteContact(contact.id)}>x</button>
            </div>
          </div>
        )) : "agrega un contacto"}
      </article>
      <article className='flex flex-col justify-between bg-slate-100 w-full'>
        <div className='flex justify-between px-3 border-b-2'>
          <div className='flex items-center gap-3 py-2'>
            <img width={100} className='rounded-full' src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU=' alt='' />
            <div>
              <h3 className='font-bold'>My Group</h3>
              <p>4 members</p>
            </div>
          </div>
          <p className='text-5xl cursor-pointer'>...</p>
        </div>
        <ChatMessages messages={messages} />
        <div className='flex gap-5 border-t-2 bg-zinc-900 p-5'>
          <img width={70} className='rounded-full' src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU=' alt='' />
          <form className='flex w-full gap-5' onSubmit={handleSubmit}>
            <input
              className='w-full pl-2 rounded-lg'
              type="text"
              placeholder='Write a message'
              onChange={handleChange}
              value={newMessage}
            />
            <button className='text-white'>{'>'}</button>
          </form>
        </div>
      </article>
    </section>
  )
}