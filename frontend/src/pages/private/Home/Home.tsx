import { useState } from 'react';
// import { io } from 'socket.io-client';
import { ChatMessages } from '../../../components';
// import { URL } from '../../../constants/const';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ForumIcon from '@mui/icons-material/Forum';
import LogoutIcon from '@mui/icons-material/Logout';
import { getContact } from '../../../service/chat.service';
import { useAuth } from '../../../hook/useAuth';
// const socket = io(URL);

export default function Home() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [newMessage, setNewMessage] = useState('');
  const [email, setEmail] = useState('');

  const { user } = useAuth();
  console.log(user);

  // const emptyArray = new Array(13).fill(null);

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

  const searchuser = async () => {
    try {
      const res = await getContact({ email });
      console.log(res);
      console.log(email);
    } catch (error) {
      console.log(error);
    }
  }

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
        <div className='flex gap-3 items-center'>
          <input
            type="text"
            className='h-5 py-4'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={searchuser} className='bg-zinc-600 py-1 px-2'>Buscar</button>
        </div>
        <h2 className='font-bold text-2xl'>Messages</h2>
        {user && user.contacts.map((contact, index) => (
          <div key={index} className='flex gap-5 text-black'>
            <img width={50} src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU=' alt='' />
            <div>
              <p>Usuario {index + 1}</p>
              <p>Loremsdaczxczx</p>
            </div>
          </div>
        ))}
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