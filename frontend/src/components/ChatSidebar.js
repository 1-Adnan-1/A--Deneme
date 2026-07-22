import React from 'react';

function ChatSidebar({ chats, currentChat, onNewChat, onSelectChat, onDeleteChat, onLogout }) {
  return (
    <div className="w-64 bg-gray-900 text-white p-4 flex flex-col">
      {/* Logo */}
      <div className="mb-6 pb-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold">🤖 AI Chat</h1>
      </div>

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-6 transition duration-200"
      >
        + Yeni Sohbet
      </button>

      {/* Chats List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-2">
        {chats.length === 0 ? (
          <p className="text-gray-400 text-sm">Henüz sohbet yok</p>
        ) : (
          chats.map((chat) => (
            <div
              key={chat._id}
              className={`p-3 rounded-lg cursor-pointer transition duration-200 group flex justify-between items-center ${
                currentChat?._id === chat._id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <button
                onClick={() => onSelectChat(chat._id)}
                className="flex-1 text-left truncate"
              >
                {chat.title}
              </button>
              <button
                onClick={() => onDeleteChat(chat._id)}
                className="ml-2 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition duration-200"
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      {/* Logout */}
      <div className="pt-6 border-t border-gray-700">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
        >
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}

export default ChatSidebar;
