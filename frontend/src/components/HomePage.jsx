import {React,useState} from 'react';
import { Home, Users, Calendar, Bell, ChevronRight, MessageCircle, LogOut, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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

export default function HomePage({userData}) {
  const [newMessage, setNewMessage] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [userName, setUserName] = useState(userData?.name || '');
  const [messages, setMessages] = useState([]); // Added state for messages

  const handleSendPost = async (e) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const message = {
        userId: userData.userId,
        userName: userName || userData.name, // Fall back to userData.name if userName is not filled
        content: newMessage.trim(),
        title: postTitle,
        location: userData.location,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      try {
        await axios.post('http://localhost:3000/sendpost', message);
        setMessages([...messages, message]);
        setNewMessage('');
        setPostTitle('');
      } catch (error) {
        console.log(error);
      }
    }
  };

  

  const Navigate = useNavigate();

  const handleChatClick = () => {
    Navigate('/chat'); // Navigate to the chatroom
  };
  const handleLogout = () => {
    // Clear any stored user data, like tokens or session info
    localStorage.removeItem('userToken'); // Example of clearing a token
    localStorage.removeItem('userData');  // Optional: clear user data as well

    // Redirect to the login page
    Navigate('/login');
  };

  // Function to handle logout button click
  const handleLogoutClick = () => {
    handleLogout();
  };
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px',
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 40,
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '64px',
    },
    nav: {
      display: 'flex', // Always display navigation
    },
    mainContent: {
      display: 'flex',
      gap: '24px',
      paddingTop: '24px',
      paddingBottom: '24px',
      minHeight: 'calc(100vh - 64px - 72px)', // Adjust for header and footer height
    },
    main: {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    },
    sidebar: {
      width: '300px',
      minHeight: 'calc(100vh - 64px)', // Ensure it takes full height minus header
      backgroundColor: '#fff',
      borderRight: '1px solid #e5e7eb',
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      padding: '24px',
      marginBottom: '24px',
    },
    cardTitle: {
      fontSize: '20px',
      fontWeight: '600',
      marginBottom: '16px',
    },
    list: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 0',
    },
    link: {
      color: '#2563eb',
      textDecoration: 'none',
      ':hover': {
        textDecoration: 'underline',
      },
    },
    input: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      marginBottom: '16px',
    },
    textarea: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '4px',
      border: '1px solid #d1d5db',
      marginBottom: '16px',
      minHeight: '100px',
    },
    footer: {
      borderTop: '1px solid #e5e7eb',
      padding: '24px 0',
    },
    footerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px',
      '@media (min-width: 768px)': {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
    },
    chatMessage: {
      display: 'flex',
      gap: '12px',
      marginBottom: '12px',
    },
    avatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#d1d5db',
    },
    messageContent: {
      backgroundColor: '#f3f4f6',
      borderRadius: '8px',
      padding: '8px 12px',
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
      <header style={styles.header}>
        <div style={{...styles.container, ...styles.headerContent}}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Neighborhood Forum</h1>
            <nav style={styles.nav}>
              <Button variant="ghost" style={{ marginRight: '8px' }}>
                <Home style={{ marginRight: '8px' }} size={16} />
                Home
              </Button>
              <Button variant="ghost" style={{ marginRight: '8px' }}>
                <Users style={{ marginRight: '8px' }} size={16} />
                Members
              </Button>
              <Button variant="ghost" style={{ marginRight: '8px' }} onClick={handleChatClick}>
                <MessageCircle style={{ marginRight: '8px' }} size={16} />
                ChatRoom
              </Button>
              <Button variant="ghost">
                <Calendar style={{ marginRight: '8px' }} size={16} />
                Events
              </Button>
              <Button variant="ghost" style={{ marginRight: '8px' }} onClick={handleLogoutClick}>
                <LogOut style={{ marginRight: '8px' }} size={16} />
                Logout
              </Button>
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button variant="ghost" style={{ padding: '8px' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', width: '1px', height: '1px', padding: '0', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: '0' }}>Notifications</span>
            </Button>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#d1d5db' }}></div>
          </div>
        </div>
      </header>
      
      <div style={{...styles.container, flex: 1}}>
        <div style={{...styles.mainContent}}>
          <aside style={styles.sidebar}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Community Stats</h3>
              <dl>
                {[
                  { term: 'Members', description: '1,234' },
                  { term: 'Posts', description: '5,678' },
                  { term: 'Events', description: '34' },
                ].map((item, index) => (
                  <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <dt style={{ fontWeight: 'bold' }}>{item.term}</dt>
                    <dd>{item.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Recent Messages</h3>
              <div>
                {[
                  { name: 'John', message: 'Looking forward to the potluck!', time: '2h ago' },
                  { name: 'Emily', message: 'Anyone joining the cleanup?', time: '3h ago' },
                ].map((msg, index) => (
                  <div key={index} style={styles.chatMessage}>
                    <div style={styles.avatar}></div>
                    <div style={styles.messageContent}>
                      <strong>{msg.name}</strong>
                      <p>{msg.message}</p>
                      <small style={{ color: '#6b7280' }}>{msg.time}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div style={styles.card}>
              <h3 style={styles.cardTitle}>Recent Posts</h3>
              <div>
                {messages.length > 0 ? (
                  messages.map((post, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                      <div style={{ flex: '1' }}>
                        <strong>{post.userName || 'Anonymous'}</strong>
                        <p>{post.content}</p>
                        <small style={{ color: '#6b7280' }}>{post.timestamp}</small>
                      </div>
                      <button style={{ background: 'transparent', border: 'none', color: '#2563eb', cursor: 'pointer' }}>View</button>
                    </div>
                  ))
                ) : (
                  <p>No recent posts available.</p>
                )}
              </div>
            </div>
            </div>
          </aside>
          
          <main style={styles.main}>
            <h2 style={{ fontSize: '30px', fontWeight: 'bold' }}>Welcome to Our Community</h2>
            
            <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Recent Discussions</h3>
                <ul style={styles.list}>
                  {['New community garden proposal', 'Upcoming neighborhood watch meeting', 'Local school fundraiser ideas'].map((topic, index) => (
                    <li key={index} style={styles.listItem}>
                      <a href="#" style={styles.link}>{topic}</a>
                      <ChevronRight size={16}/>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>Upcoming Events</h3>
                <ul style={styles.list}>
                  {[
                    { date: 'May 15', event: 'Community Cleanup Day' },
                    { date: 'May 22', event: 'Neighborhood Potluck' },
                    { date: 'May 29', event: 'Local Artisan Market' }
                  ].map((item, index) => (
                    <li key={index} style={styles.listItem}>
                      <span>
                        <strong>{item.date}:</strong> {item.event}
                      </span>
                      <Calendar size={16} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Create a New Post</h3>
              <form onSubmit={handleSendPost}>
                <input
                  type="text"
                  placeholder="Post title"
                  style={styles.input}
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Name"
                  style={styles.input}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <textarea
                  placeholder="What's on your mind?"
                  style={styles.textarea}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit">
                  <Mail style={{ marginRight: '8px' }} size={16} />
                  Post
                </Button>
              </form>
            </div>
          </main>
        </div>
      </div>

      <footer style={styles.footer}>
        <div style={styles.container}>
          <div style={styles.footerContent}>
            <p>&copy; 2024 Neighborhood Forum. All rights reserved.</p>
            <nav>
              <a href="#" style={styles.link}>Privacy Policy</a>
              <span> | </span>
              <a href="#" style={styles.link}>Terms of Service</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

