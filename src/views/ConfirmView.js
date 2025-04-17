// src/views/ConfirmView.js
import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const ConfirmView = () => {
  const [recipientId, setRecipientId] = useState('');
  const [message, setMessage] = useState('');
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const handleConfirm = async (accepted) => {
    setMessage('');

    try {
      const token = await getAccessTokenSilently();

      const res = await fetch('https://nav.airow.io/api/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ recipientId, accepted }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage(`Confirmation ${accepted ? 'accepted' : 'denied'} to ${recipientId}`);
      } else {
        setMessage(`Error: ${data.message || 'Failed to confirm'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Failed to send confirmation.');
    }
  };

  if (!isAuthenticated) return <p>You must be logged in to confirm.</p>;

  return (
    <div>
      <h2>Confirm View</h2>
      <p><strong>Logged in as:</strong> {user?.email}</p>
      <input
        type="text"
        placeholder="Recipient Email"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        required
      />
      <button onClick={() => handleConfirm(true)}>Confirm</button>
      <button onClick={() => handleConfirm(false)}>Deny</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ConfirmView;
