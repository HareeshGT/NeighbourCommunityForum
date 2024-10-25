import React, { useState,useEffect } from 'react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./CommunityChat.css"
import axios from 'axios';

const Button = ({ children, variant = 'default', style = {}, ...props }) => {
  const baseStyle = {
    padding: '8px 16px', 
    borderRadius: '4px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const variantStyles = {
    default: {
      backgroundColor: '#2563eb',
      color: 'white',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#4b5563',
    },
  };

  return (
    <button 
      style={{...baseStyle, ...variantStyles[variant], ...style}}
      {...props}
    >
      {children}
    </button>
  );
};

const mockMessages = [
  { id: 1, user: 'Alice', content: 'Hey everyone! How\'s it going?', timestamp: '10:00 AM' },
  { id: 2, user: 'Bob', content: 'Hi Alice! All good here. How about you?', timestamp: '10:02 AM' },
  { id: 3, user: 'Charlie', content: 'Hello folks! Excited to be here!', timestamp: '10:05 AM' },
];

const mockUsers = [
  { id: 1, name: 'Alice', avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Bob', avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Charlie', avatar: 'https://via.placeholder.com/40' },
  { id: 4, name: 'David', avatar: 'https://via.placeholder.com/40' },
];

export default function CommunityChat({userData}) {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const Navigate = useNavigate();

  const handleHomeClick = () => {
    Navigate('/homepage'); // Navigate to the chatroom
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const message = {
        userId: userData.userId,
        userName : userData.name,
        content: newMessage.trim(),
        location:userData.location,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      try{
        axios.post("http://localhost:3000/sendmessage",message)
        setMessages([...messages, message]);
        setNewMessage('');
      }
      catch(error)
      {
        console.log(error);    
      }      
    }
  };

  useEffect(
    ()=>{
      async function getMessage(){
        try{
         let message =  await axios.post("http://localhost:3000/getmessage",{location:userData.location})
         setMessages(message.data);
        }
        catch(error){
            console.log(error);
        }
      }
    getMessage();
    }
    ,[]);

  return (
    <div className="chat-container">
      <div className="chat-main">
        <header className="chat-header">
          <Button variant="ghost" style={{ marginRight: '8px' }} onClick={handleHomeClick}>
                <Home style={{ marginRight: '8px' }} size={16} />
                Home
          </Button>
          <h1 className="chat-title">Community Chat - {userData.location}</h1>
          <button
            className="toggle-sidebar"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle user list"
          >
            👥
          </button>
        </header>
        <div className="message-list">
          {messages.map((message) => (
            <div key={message.id} className="message">
              <div className="message-header">
                <span className="message-user">{message.userId===userData.userId?"You":message.userName}</span>
                <span className="message-time">{message.timestamp}</span>
              </div>
              <p>{message.content}</p>
            </div>
          ))}
        </div>
        <form className="message-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            className="message-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            aria-label="Type a message"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>
      <aside className={`user-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h2>Users</h2>
        <ul className="user-list">
          {mockUsers.map((user) => (
            <li key={user.id} className="user-item">
              <img src={user.avatar} alt="" className="user-avatar" />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}