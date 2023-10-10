import { Message } from "../../pages/private/Home/Home"

export const ChatMessagesList = ({ messages, userId }: { messages: Message[], userId: boolean }) => {
  return (
    <>
      <div className='h-full p-10 ml-auto text-center overflow-y-scroll'>
        <ul>
          {messages.map((message, i) => (
            <li className="rounded-sm font-bold" key={`${message} ${i}`}>
              <h2>{message.content}</h2>
              {/* <p>{message.sender}</p> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}