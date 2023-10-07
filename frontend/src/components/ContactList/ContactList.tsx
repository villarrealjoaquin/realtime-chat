import { useAuth } from "../../hook/useAuth";
import { deleteContact } from "../../service/chat.service";

interface Props {
  handleContactClick: (contact_id: string) => Promise<void>;
}

export const ContactList = ({ handleContactClick }: Props) => {
  const { user } = useAuth();

  const handleClick = (contact_id: string) => {
    handleContactClick(contact_id);
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

  return (
    <>
      <div>
        <h2 className='font-bold text-2xl mb-2'>Messages</h2>
        <ul className="flex flex-col gap-5">
          {user && user.contacts?.length && user.contacts?.length > 0 ? user.contacts.map((contact, i) => (
            <li
              key={`${contact.id}-${i}`}
              className='flex gap-2 items-center text-black cursor-pointer'
              onClick={() => handleClick(contact.id)}
            >
              <img
                className='rounded-3xl'
                width={50}
                src='https://media.istockphoto.com/id/1226328537/vector/image-place-holder-with-a-gray-camera-icon.jpg?s=170667a&w=0&k=20&c=iLBbpRp4D_dbwg39-pubCdie04H1L0X1hPB1A2hJyjU='
                alt=''
              />
              <div>
                <p className='font-bold'>{contact.username}</p>
                <p>Loremsdaczxczx</p>
              </div>
              <button className='bg-zinc-500 p-2' onClick={() => handleDeleteContact(user.id, contact.email)}>x</button>
            </li>
          )) : <p>agrega un contacto</p>}
        </ul>
      </div>
    </>
  )
}