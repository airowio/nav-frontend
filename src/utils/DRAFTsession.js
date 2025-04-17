// src/utils/session.js
import { v4 as uuidv4 } from 'uuid';

export function getSessionId() {
  let sessionId = localStorage.getItem('airow-session-id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('airow-session-id', sessionId);
  }
  return sessionId;
}

export function clearSessionId() {
  localStorage.removeItem('airow-session-id');
}
