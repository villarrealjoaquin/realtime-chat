import { useEffect, useState } from "react";
import { ChatMessagesList } from "..";
import { io } from 'socket.io-client';
import { URL } from "../../constants/const";
import { addMessage } from "../../service/conversation.service";
import { useAuth } from "../../hook/useAuth";
const socket = io(URL);

interface Props {
  conversationId: string;
}

interface Message {
  newMessage:string;
  senderId:string;
  conversatioId:string;
}

export const ChatMessages = ({ conversationId, messages }: Props) => {
  const [newMessage, setNewMessage] = useState('');
  const [isUser, setIsUser] = useState(false)

  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await addMessage(newMessage, conversationId, user?.id);
      console.log(res);
      setNewMessage('');
      
      socket.emit('chat-message', { newMessage, senderId: user?.id, conversationId });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = (message: Message) => {
    const condition = message.senderId === user?.id
    setIsUser(condition);
    // setMessages((prevState) => [...prevState, message.newMessage]);
  };

  useEffect(() => {
    socket.on('chat-message', sendMessage);

    return () => {
      socket.off('chat-message', sendMessage);
    };
  }, []);

  return (
    <>
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
  )
};