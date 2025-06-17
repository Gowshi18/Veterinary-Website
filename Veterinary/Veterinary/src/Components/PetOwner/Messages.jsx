import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const Messages = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [messages, setMessages] = useState({}); // 💡 Store messages per vet by vet.id
  const [input, setInput] = useState('');

  // 🔁 Fetch all veterinarians on mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/veterinarian/all-vets')
      .then(res => {
        setVeterinarians(res.data);
      })
      .catch(err => {
        console.error('Error fetching veterinarians:', err);
      });
  }, []);

  // ✅ Send a message and store it under the correct vet
  const handleSend = () => {
    if (input.trim() && selectedVet) {
      const newMessage = { sender: 'me', text: input };

      setMessages(prev => ({
        ...prev,
        [selectedVet.id]: [...(prev[selectedVet.id] || []), newMessage]
      }));

      setInput('');
    }
  };

  // 📦 Get current chat messages for the selected vet
  const currentMessages = messages[selectedVet?.id] || [];

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />

      <div className="d-flex w-100" style={{ height: '100vh' }}>
        {/* Sidebar - Veterinarian list */}
        <div className="border-end bg-light p-3" style={{ width: '25%', overflowY: 'auto' }}>
          <h5 className="mb-3">Veterinarians</h5>
          {veterinarians.map((vet) => (
            <div
              key={vet.id}
              className={`p-2 mb-2 rounded ${selectedVet?.id === vet.id ? 'bg-primary text-white' : 'bg-white'}`}
              onClick={() => setSelectedVet(vet)}
              style={{ cursor: 'pointer' }}
            >
              {vet.name}
            </div>
          ))}
        </div>

        {/* Right Panel - Chat Box */}
        <div className="flex-grow-1 p-3 d-flex flex-column">
          {selectedVet ? (
            <>
              <h5 className="border-bottom pb-2 mb-3">Chat with {selectedVet.name}</h5>

              {/* Chat messages */}
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

              {/* Input message box */}
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control me-2"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message..."
                />
                <button className="btn btn-primary" onClick={handleSend}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="text-muted m-auto">Select a veterinarian to start chatting.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
