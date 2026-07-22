import React from 'react';

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="break-words">{message.content}</p>
        <span className="text-xs opacity-70 mt-1 block">
          {new Date(message.timestamp).toLocaleTimeString('tr-TR')}
        </span>
      </div>
    </div>
  );
}

export default ChatMessage;
