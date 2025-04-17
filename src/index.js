// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = "dev-qqnq4k85lt7yr0r0.us.auth0.com";
const clientId = "GSW8ZZy5aIeG06pj1xEohLZ2kSEwVzuI";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://nav.airow.io/api",
      scope: "openid profile email"
    }}
    logoutRedirectUri="https://nav.airow.io"   
  >
    <App />
  </Auth0Provider>
);