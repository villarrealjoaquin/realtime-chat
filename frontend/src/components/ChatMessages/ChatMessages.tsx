export const ChatMessages = ({ messages }: { messages: string[] }) => {
  return (
    <>
      <div>
        <ul>
          {messages.map((message, i) => (
            <li key={`${message} ${i}`}>{message}</li>
          ))}
        </ul>
      </div>
    </>
  )
}