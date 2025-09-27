import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client (replace with your credentials)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client only if environment variables are available
const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

const ChatComponent = ({ currentUserId }) => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch user's matches
  useEffect(() => {
    fetchMatches();
  }, [currentUserId]);

  // Fetch messages when a match is selected
  useEffect(() => {
    if (selectedMatch) {
      fetchMessages(selectedMatch.id);
      subscribeToMessages(selectedMatch.id);
    }
  }, [selectedMatch]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMatches = async () => {
    if (!supabase) {
      // Demo data when Supabase is not available
      const demoMatches = [
        {
          id: 'demo-1',
          otherUser: {
            id: 'user-1',
            username: 'alex_johnson',
            display_name: 'Alex Johnson',
            profile_photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
          },
          created_at: new Date().toISOString()
        },
        {
          id: 'demo-2',
          otherUser: {
            id: 'user-2',
            username: 'sarah_wilson',
            display_name: 'Sarah Wilson',
            profile_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
          },
          created_at: new Date().toISOString()
        },
        {
          id: 'demo-3',
          otherUser: {
            id: 'user-3',
            username: 'mike_chen',
            display_name: 'Mike Chen',
            profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
          },
          created_at: new Date().toISOString()
        }
      ];
      setMatches(demoMatches);
      return;
    }

    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        user1:users!user1_id(id, username, display_name, profile_photo),
        user2:users!user2_id(id, username, display_name, profile_photo)
      `)
      .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)
      .order('created_at', { ascending: false });

    if (data) {
      // Format matches to get the other user's info
      const formattedMatches = data.map(match => ({
        id: match.id,
        otherUser: match.user1_id === currentUserId ? match.user2 : match.user1,
        created_at: match.created_at
      }));
      setMatches(formattedMatches);
    }
  };

  const fetchMessages = async (matchId) => {
    setLoading(true);
    
    if (!supabase) {
      // Demo messages when Supabase is not available
      const demoMessages = [
        {
          id: 'msg-1',
          content: 'Hey! How are you doing?',
          sender_id: 'user-1',
          created_at: new Date(Date.now() - 3600000).toISOString(),
          sender: {
            id: 'user-1',
            username: 'alex_johnson',
            display_name: 'Alex Johnson',
            profile_photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
          }
        },
        {
          id: 'msg-2',
          content: 'I\'m doing great! Thanks for asking. How about you?',
          sender_id: 'demo-user-123',
          created_at: new Date(Date.now() - 3000000).toISOString(),
          sender: {
            id: 'demo-user-123',
            username: 'you',
            display_name: 'You',
            profile_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          }
        },
        {
          id: 'msg-3',
          content: 'Pretty good! Just working on some exciting projects. What about you?',
          sender_id: 'user-1',
          created_at: new Date(Date.now() - 1800000).toISOString(),
          sender: {
            id: 'user-1',
            username: 'alex_johnson',
            display_name: 'Alex Johnson',
            profile_photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
          }
        },
        {
          id: 'msg-4',
          content: 'That sounds awesome! I\'d love to hear more about them sometime.',
          sender_id: 'demo-user-123',
          created_at: new Date(Date.now() - 900000).toISOString(),
          sender: {
            id: 'demo-user-123',
            username: 'you',
            display_name: 'You',
            profile_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          }
        }
      ];
      setMessages(demoMessages);
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users!sender_id(id, username, display_name, profile_photo)
      `)
      .eq('match_id', matchId)
      .order('created_at', { ascending: true });

    if (data) {
      setMessages(data);
    }
    setLoading(false);
  };

  const subscribeToMessages = (matchId) => {
    if (!supabase) {
      // No real-time updates in demo mode
      return () => {};
    }

    const channel = supabase
      .channel(`messages:${matchId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `match_id=eq.${matchId}`
        }, 
        (payload) => {
          setMessages(prev => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedMatch) return;

    if (!supabase) {
      // Demo mode - add message to local state
      const newMsg = {
        id: `demo-msg-${Date.now()}`,
        content: newMessage,
        sender_id: currentUserId,
        created_at: new Date().toISOString(),
        sender: {
          id: currentUserId,
          username: 'you',
          display_name: 'You',
          profile_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        }
      };
      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
      return;
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({
        match_id: selectedMatch.id,
        sender_id: currentUserId,
        content: newMessage
      })
      .select()
      .single();

    if (data) {
      setNewMessage('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-container">
      {/* Matches List */}
      <div className="matches-sidebar">
        <div className="sidebar-header">
          <h2>Matches</h2>
        </div>
        <div className="matches-list">
          {matches.map(match => (
            <div
              key={match.id}
              className={`match-item ${selectedMatch?.id === match.id ? 'active' : ''}`}
              onClick={() => setSelectedMatch(match)}
            >
              <img 
                src={match.otherUser.profile_photo || 'https://via.placeholder.com/50'} 
                alt={match.otherUser.display_name}
                className="match-avatar"
              />
              <div className="match-info">
                <h3>{match.otherUser.display_name}</h3>
                <p>@{match.otherUser.username}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="chat-area">
        {selectedMatch ? (
          <>
            {/* Chat Header */}
            <div className="chat-header">
              <img 
                src={selectedMatch.otherUser.profile_photo || 'https://via.placeholder.com/40'} 
                alt={selectedMatch.otherUser.display_name}
                className="header-avatar"
              />
              <div className="header-info">
                <h3>{selectedMatch.otherUser.display_name}</h3>
                <span>@{selectedMatch.otherUser.username}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="messages-container">
              {loading ? (
                <div className="loading">Loading messages...</div>
              ) : (
                <>
                  {messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`message ${message.sender_id === currentUserId ? 'sent' : 'received'}`}
                    >
                      <div className="message-bubble">
                        <p>{message.content}</p>
                        <span className="message-time">
                          {new Date(message.created_at).toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="message-input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button type="submit" className="send-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3>Select a match to start chatting</h3>
              <p>Choose from your matches on the left</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .chat-container {
          display: flex;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* Matches Sidebar */
        .matches-sidebar {
          width: 320px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255, 255, 255, 0.3);
          display: flex;
          flex-direction: column;
        }

        .sidebar-header {
          padding: 24px 20px;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .sidebar-header h2 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .matches-list {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
        }

        .match-item {
          display: flex;
          align-items: center;
          padding: 12px;
          margin-bottom: 8px;
          border-radius: 16px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .match-item:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: translateX(4px);
        }

        .match-item.active {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
          border: 1px solid rgba(102, 126, 234, 0.4);
        }

        .match-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 12px;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        .match-info h3 {
          margin: 0 0 4px 0;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .match-info p {
          margin: 0;
          font-size: 14px;
          color: #666;
        }

        /* Chat Area */
        .chat-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .chat-header {
          display: flex;
          align-items: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 12px;
          border: 2px solid rgba(255, 255, 255, 0.8);
        }

        .header-info h3 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .header-info span {
          font-size: 14px;
          color: #666;
        }

        /* Messages */
        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .message {
          display: flex;
          margin-bottom: 16px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.sent {
          justify-content: flex-end;
        }

        .message.received {
          justify-content: flex-start;
        }

        .message-bubble {
          max-width: 70%;
          padding: 12px 16px;
          border-radius: 20px;
          position: relative;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .message.sent .message-bubble {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.received .message-bubble {
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(0, 0, 0, 0.1);
          color: #1a1a1a;
          border-bottom-left-radius: 4px;
        }

        .message-bubble p {
          margin: 0;
          font-size: 15px;
          line-height: 1.4;
        }

        .message-time {
          display: block;
          font-size: 11px;
          margin-top: 4px;
          opacity: 0.7;
        }

        .message.sent .message-time {
          text-align: right;
        }

        /* Message Input */
        .message-input-container {
          display: flex;
          padding: 16px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.3);
        }

        .message-input {
          flex: 1;
          padding: 12px 20px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 24px;
          font-size: 15px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          outline: none;
          transition: all 0.3s ease;
        }

        .message-input:focus {
          border-color: rgba(102, 126, 234, 0.5);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .send-button {
          margin-left: 12px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }

        .send-button:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .send-button:active {
          transform: scale(0.95);
        }

        /* Empty State */
        .no-chat-selected {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .empty-state svg {
          color: rgba(102, 126, 234, 0.5);
          margin-bottom: 20px;
        }

        .empty-state h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .empty-state p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .loading {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: #666;
          font-size: 14px;
        }

        /* Scrollbar Styling */
        .matches-list::-webkit-scrollbar,
        .messages-container::-webkit-scrollbar {
          width: 8px;
        }

        .matches-list::-webkit-scrollbar-track,
        .messages-container::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 10px;
        }

        .matches-list::-webkit-scrollbar-thumb,
        .messages-container::-webkit-scrollbar-thumb {
          background: rgba(102, 126, 234, 0.3);
          border-radius: 10px;
        }

        .matches-list::-webkit-scrollbar-thumb:hover,
        .messages-container::-webkit-scrollbar-thumb:hover {
          background: rgba(102, 126, 234, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .matches-sidebar {
            width: 80px;
          }

          .match-info,
          .sidebar-header h2 {
            display: none;
          }

          .match-item {
            justify-content: center;
            padding: 10px;
          }

          .match-avatar {
            margin-right: 0;
          }

          .message-bubble {
            max-width: 85%;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatComponent;