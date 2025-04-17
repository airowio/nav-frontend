// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import PingRequest from './views/PingRequest';
import ConfirmView from './views/ConfirmView';
import StatusPanel from './views/StatusPanel';

function App() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  return (
    <Router>
      <div style={{ padding: '1rem', background: '#111', color: '#0ff' }}>
        <h1>Airow Nav</h1>
        {!isLoading && (
          <>
            {isAuthenticated ? (
              <>
                <p>Logged in as: <strong>{user.email}</strong></p>
                <button onClick={() => logout({ logoutParams: { returnTo: "https://nav.airow.io" } })}>
                  Log Out
                </button>
              </>
            ) : (
              <button onClick={() => loginWithRedirect()}>
                Log In
              </button>
            )}
          </>
        )}
        <nav style={{ marginTop: '1rem' }}>
          <Link to="/ping" style={{ marginRight: '1rem' }}>Ping</Link>
          <Link to="/confirm" style={{ marginRight: '1rem' }}>Confirm</Link>
          <Link to="/status">Status</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/ping" element={<PingRequest />} />
        <Route path="/confirm" element={<ConfirmView />} />
        <Route path="/status" element={<StatusPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
