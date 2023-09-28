export const ChatMessages = ({ messages }: { messages: string[] }) => {
  return (
    <>
      <div className="h-full p-10 ml-auto">
        <ul>
          {messages.map((message, i) => (
            <li className="" key={`${message} ${i}`}>{message}</li>
          ))}
        </ul>
      </div>
    </>
  )
};