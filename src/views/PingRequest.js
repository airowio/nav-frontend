// src/views/PingRequest.js
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const PingRequest = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const { getAccessTokenSilently, user } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('https://nav.airow.io/api/ping', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ recipientEmail })
      });

      const data = await response.json();
      if (data.success) {
        setMessage(`Ping sent to ${recipientEmail}`);
      } else {
        setMessage(`Error: ${data.message || 'Failed to ping'}`);
      }
    } catch (err) {
      console.error('Ping error:', err);
      setMessage('Failed to reach server or get token.');
    }
  };

  return (
    <div>
      <h2>Ping Request View</h2>
      <p><strong>Logged in as:</strong> {user?.email}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Recipient Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
        <button type="submit">Send Ping</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PingRequest;
