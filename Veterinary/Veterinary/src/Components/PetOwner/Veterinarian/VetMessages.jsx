import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VetLayout from './VetLayout';

const VetMessages = () => {
  const [petOwners, setPetOwners] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState({}); // 💡 Tracks messages per pet owner by owner.id

  // 🔁 Fetch all pet owners on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/profile/all')
      .then(res => setPetOwners(res.data))
      .catch(err => console.error('Error fetching pet owners:', err));
  }, []);

  // ✅ Send a message and store it under the correct user
  const handleSend = () => {
    if (input.trim() && selectedUser) {
      const newMessage = { sender: 'me', text: input };

      setChatMessages(prev => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage]
      }));

      setInput('');
    }
  };

  // 📦 Get messages for selected user
  const currentMessages = chatMessages[selectedUser?.id] || [];

  return (
    <div className="container-fluid p-0 d-flex">
      <VetLayout />

      <div className="d-flex w-100" style={{ height: '100vh' }}>
        {/* Left Sidebar - Pet Owners */}
        <div className="border-end bg-light p-3" style={{ width: '25%', overflowY: 'auto' }}>
          <h5 className="mb-3">Pet Owners</h5>
          {petOwners.map((owner) => (
            <div
              key={owner.id}
              className={`p-2 mb-2 rounded ${selectedUser?.id === owner.id ? 'bg-primary text-white' : 'bg-white'}`}
              onClick={() => setSelectedUser(owner)}
              style={{ cursor: 'pointer' }}
            >
              {owner.name}
            </div>
          ))}
        </div>

        {/* Right Panel - Chat Section */}
        <div className="flex-grow-1 p-3 d-flex flex-column">
          {selectedUser ? (
            <>
              <h5 className="border-bottom pb-2 mb-3">Chat with {selectedUser.name}</h5>

              {/* Chat Messages Box */}
              <div className="flex-grow-1 overflow-auto mb-3 border rounded p-3" style={{ background: '#f9f9f9' }}>
                {currentMessages.length === 0 && (
                  <div className="text-muted">No messages yet.</div>
                )}
                {currentMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`d-flex ${msg.sender === 'me' ? 'justify-content-end' : 'justify-content-start'}`}
                  >
                    <div className={`p-2 rounded mb-2 ${msg.sender === 'me' ? 'bg-primary text-white' : 'bg-secondary text-white'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Box */}
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                />
                <button className="btn btn-primary" onClick={handleSend}>Send</button>
              </div>
            </>
          ) : (
            <div className="text-muted m-auto">Select a pet owner to start chatting.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VetMessages;
