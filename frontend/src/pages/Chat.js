import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatAPI } from '../utils/api';
import ChatMessage from '../components/ChatMessage';
import ChatSidebar from '../components/ChatSidebar';

function Chat({ onLogout }) {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const response = await chatAPI.getHistory();
      setChats(response.data.chats);
      if (response.data.chats.length > 0) {
        loadChat(response.data.chats[0]._id);
      }
    } catch (error) {
      console.error('Sohbetler yüklenemedi:', error);
    }
  };

  const loadChat = async (chatId) => {
    try {
      const response = await chatAPI.getChat(chatId);
      setCurrentChat(response.data.chat);
      setMessages(response.data.chat.messages);
    } catch (error) {
      console.error('Sohbet yüklenemedi:', error);
    }
  };

  const handleNewChat = async () => {
    try {
      const response = await chatAPI.newChat('Yeni Sohbet');
      const newChat = response.data.chat;
      setChats([newChat, ...chats]);
      setCurrentChat(newChat);
      setMessages([]);
    } catch (error) {
      console.error('Yeni sohbet oluşturulamadı:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !currentChat || loading) return;

    const userMessage = inputValue;
    setInputValue('');
    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(currentChat._id, userMessage);
      setMessages(response.data.chat.messages);
      setCurrentChat(response.data.chat);
    } catch (error) {
      console.error('Mesaj gönderilemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await chatAPI.deleteChat(chatId);
      setChats(chats.filter(chat => chat._id !== chatId));
      if (currentChat?._id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
    } catch (error) {
      console.error('Sohbet silinemedi:', error);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        currentChat={currentChat}
        onNewChat={handleNewChat}
        onSelectChat={loadChat}
        onDeleteChat={handleDeleteChat}
        onLogout={handleLogoutClick}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400 text-lg">Sohbet başlatmak için bir mesaj yazın...</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <ChatMessage key={index} message={msg} />
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4 bg-white">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Mesajınızı yazın..."
                  disabled={loading}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Gönderiliyor...' : 'Gönder'}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 text-xl mb-4">Sohbet seçin veya yeni bir sohbet başlatın</p>
              <button
                onClick={handleNewChat}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-200"
              >
                Yeni Sohbet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
