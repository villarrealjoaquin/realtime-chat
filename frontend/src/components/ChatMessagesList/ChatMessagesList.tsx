export const ChatMessagesList = ({ messages, userId }: { messages: Array<string>, userId: boolean }) => {
  return (
    <>
      <div className={`h-full p-10 ${userId ? 'ml-auto' : ''} `}>
        <ul>
          {messages.map((message, i) => (
            <li className="" key={`${message} ${i}`}>{message}</li>
          ))}
        </ul>
      </div>
    </>
  )
}