import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const StatusPanel = () => {
  const [status, setStatus] = useState(null);
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchStatus = async () => {
      if (!isAuthenticated || !user) return;

      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`https://nav.airow.io/api/status/${encodeURIComponent(user.email)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setStatus(data);
        } else {
          console.error('Status fetch failed:', data);
        }
      } catch (err) {
        console.error('Network error:', err);
      }
    };

    fetchStatus();
  }, [getAccessTokenSilently, isAuthenticated, user]);

  if (!status) return <p>Loading status...</p>;

  return (
    <div>
      <h2>Status Panel</h2>

      <h3>User Info</h3>
      <p><strong>Email:</strong> {user?.email}</p>
      {status.session ? (
        <>
          <p><strong>Display Name:</strong> {status.session.displayName}</p>
          <p><strong>Last Seen:</strong> {new Date(status.session.lastSeen).toLocaleString()}</p>
        </>
      ) : (
        <p>No session recorded</p>
      )}

      <h3>Last Scan</h3>
      {status.lastScan ? (
        <p><strong>Location:</strong> {status.lastScan.locationId} <br />
           <strong>Time:</strong> {new Date(status.lastScan.timestamp).toLocaleString()}</p>
      ) : (
        <p>No scans yet</p>
      )}

      <h3>Pending Pings</h3>
      {status.pendingPings.length > 0 ? (
        <ul>
          {status.pendingPings.map((ping, idx) => (
            <li key={idx}>{ping.senderEmail} at {new Date(ping.timestamp).toLocaleString()}</li>
          ))}
        </ul>
      ) : (
        <p>No incoming pings</p>
      )}

      <h3>Confirmation Status</h3>
      {status.confirmation ? (
        <p><strong>Sender:</strong> {status.confirmation.senderEmail} <br />
           <strong>Accepted:</strong> {status.confirmation.accepted ? 'Yes' : 'No'} <br />
           <strong>Time:</strong> {new Date(status.confirmation.timestamp).toLocaleString()}</p>
      ) : (
        <p>No recent confirmation sent</p>
      )}
    </div>
  );
};

export default StatusPanel;
