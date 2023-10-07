import { useState } from 'react';
import {
  ChatMessages,
  ChatSidebar,
  Sidebar
} from '../../../components';
import { getChat } from '../../../service/conversation.service';

interface Conversation {
  _id: string;
  messages: string[];
  participants: string[];
}

interface User {
  alias: string;
  username:string;
}

interface MyChat {
  conversation: Conversation;
  user: User;
}

export default function Home() {
  const [myContactChat, setMyContactChat] = useState<MyChat>();

  const handleContactClick = async (contact_id: string) => {
    try {
      const res = await getChat(contact_id);
      setMyContactChat(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex h-screen">
      <Sidebar />
      <ChatSidebar handleContactClick={handleContactClick} />
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
            <ChatMessages conversationId={myContactChat.conversation._id} />
          </>
          : <p>Comienza a chatear con algun amigo</p>}
      </article>
    </section>
  )
}