import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ChatMessages } from '../../components';

const URL = 'http://localhost:3000';

const socket = io(URL);

export default function Home() {
  const [messages, setMessages] = useState<Array<string>>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages([...messages, newMessage]);
    setNewMessage('');
    socket.emit('chat-message', newMessage);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (message: string) => {
    setMessages((prevState) => [...prevState, message]);
  };

  useEffect(() => {
    socket.on('chat-message', sendMessage);

    return () => {
      socket.off('chat-message', sendMessage);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center">
      <article className='bg-gray-700'>
        <div className="p-10">
          <h3 className="font-bold">Conversations</h3>
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              value={newMessage}
              className="bg-zinc-600 placeholder-white py-1 px-2 rounded" type="text" placeholder="Search"
            />
          </form>
          <div className="flex">
            <p>Recent Chats</p>
            <p>+ New Chat</p>
          </div>
        </div>
        <ChatMessages messages={messages} />
      </article>
    </section>
  )
}