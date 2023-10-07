import { ChatMessages, ChatSidebar } from "..";
import { useAuth } from "../../hook/useAuth";
import { getChat } from "../../service/conversation.service";

export const Chat = () => {


  const handleContactClick = async (contact_id: string) => {
    try {
      const res = await getChat(contact_id);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ChatSidebar handleContactClick={handleContactClick} />
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
        <ChatMessages />
      </article>
    </>
  )
};