import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { ChatMessagesList, Sidebar } from '../../../components';
import { useAuth } from '../../../hook/useAuth';
import { Contact } from '../../../models/contact.model';
import { addContact, deleteContact, getContact } from '../../../service/chat.service';
import { addMessage, getChat } from '../../../service/conversation.service';
import { io } from 'socket.io-client';
import { URL } from '../../../constants/const';

interface Conversation {
  _id: string;
  messages: string[];
  participants: string[];
}

interface User {
  id: string;
  alias: string;
  username: string;
}

interface MyChat {
  conversation: Conversation;
  user: User;
}


export interface Message {
  content: string;
  senderId: string;
  conversationId: string;
}

const socket = io(URL);

export default function Home() {
  const [myContactChat, setMyContactChat] = useState<MyChat>();
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isUser, setIsUser] = useState(false)
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

  const handleContactClick = async (contact_id: string) => {
    try {
      const res = await getChat(contact_id);
      if (res.data) {
        setMyContactChat(res.data);
        setMessages(res.data.messages);
        console.log(res);
      }

      socket.emit('joinRoom', res.data.conversation._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteContact = async (id: string, email: string) => {
    try {
      const res = await deleteContact(id, email);
      // const deleteUser = (prevUser: SetStateAction<User | null>) => prevUser?.contacts.filter((contact: Contact) => contact.email !== email);
      // setUser(deleteUser);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await addMessage(newMessage, myContactChat?.conversation._id, myContactChat?.user.id);
      console.log(res);
      if (!res.data) return;
      const content = res.data.content
      
      // socket.emit('chat-message', {
      //   roomName: myContactChat?.conversation._id, 
      //   content: newMessage,
      // });

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: content,
          senderId: user?.id,
          conversationId: myContactChat?.conversation._id
        } as Message
      ]);
      setNewMessage('');
      // socket.emit('chat-message', { newMessage, senderId: user?.id, conversationId: myContactChat?.conversation._id });
    } catch (error) {
      setNewMessage('');
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    // const condition = message.senderId === user?.id
    // setIsUser(condition);
    // setMessages((prevState) => [...prevState, message.newMessage]);
  };

  // const newMessageFn = () => {
    
  // }

  useEffect(() => {
    socket.on('chat-message', sendMessage);

    return () => {
      socket.off('chat-message', sendMessage);
    };
  }, []);

  return (
    <section className="flex h-screen ">
      <Sidebar />
      <article className='flex flex-col gap-7 p-10 w-[25%] bg-slate-100 overflow-y-scroll'>
        <div className='items-center'>
          <form onSubmit={(e) => e.preventDefault()} className='flex gap-3'>
            <input
              type="text"
              className='h-5 py-4 pl-1'
              placeholder='Search a new contact'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSearchUser} className='bg-orange-400 py-1 px-2 font-bold text-white'>Buscar</button>
          </form>
          {contact &&
            <div className='bg-stone-950 px-5 py-3 flex justify-between items-center gap-5'>
              <h3 className='font-bold'>{contact.username}</h3>
              <button onClick={() => handleAddNewContact(user?.id, contact)} className='bg-amber-400 font-bold py-1 px-2'>+</button>
            </div>}
          {error && (
            <div>
              <p>
                {error}
              </p>
            </div>)}
        </div>
        <div>
          <h2 className='font-bold text-2xl mb-4'>Messages</h2>
          <ul className="flex flex-col gap-5">
            {user && user.contacts?.length && user.contacts?.length > 0 ? user.contacts.map((contact, i) => (
              <li
                key={`${contact.id}-${i}`}
                className='flex justify-between gap-3 items-center text-black cursor-pointer'
                onClick={() => handleContactClick(contact.id)}
              >
                <img
                  className='rounded-3xl'
                  width={50}
                  src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU='
                  alt=''
                />
                <div className='mr-8'>
                  <p className='font-bold w-20 '>{contact.username}</p>
                  <p>Loremsdaczxczx</p>
                </div>
                <button className='bg-orange-400 p-2 font-bold text-white' onClick={() => handleDeleteContact(user.id, contact.email)}>x</button>
              </li>
            )) : <p>agrega un contacto</p>}
          </ul>
        </div>
      </article>
      <article className='flex flex-col justify-between bg-slate-100 w-full'>
        {myContactChat ?
          <>
            <div className='flex justify-between px-3 border-b-2'>
              <div className='flex items-center gap-3 py-2'>
                <img width={100} className='rounded-full' src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU=' alt='' />
                <div>
                  <h3 className='font-bold'>{myContactChat?.user?.username}</h3>
                </div>
              </div>
              <p className='text-5xl cursor-pointer'>...</p>
            </div>
            <ChatMessagesList messages={messages} userId={isUser} />
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
          </>
          : <div className='font-bold grid place-items-center h-screen'>Comienza a chatear con algun amigo</div>}
      </article>
    </section>
  )
}