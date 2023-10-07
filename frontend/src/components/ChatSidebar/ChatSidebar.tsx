import { ContactList, SearchContact } from "..";

interface Props {
  handleContactClick: (contact_id: string) => Promise<void>;
}

export const ChatSidebar = ({ handleContactClick }: Props) => {
  return (
    <>
      <article className='flex flex-col gap-7 p-10 w-[22%] bg-slate-100 overflow-y-scroll'>
        <SearchContact />
        <ContactList handleContactClick={handleContactClick} />
      </article>
    </>
  )
}