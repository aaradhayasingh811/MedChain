// In-memory session storage (for development)
// In production, use Redis or database
class SessionManager {
  constructor() {
    this.sessions = new Map();
  }

  getSession(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, []);
    }
    return this.sessions.get(sessionId);
  }

  updateSession(sessionId, userMessage, botResponse) {
    const session = this.getSession(sessionId);
    
    session.push(
      { role: 'user', content: userMessage, timestamp: new Date() },
      { role: 'assistant', content: botResponse, timestamp: new Date() }
    );

    // Keep only last 20 messages to manage memory
    if (session.length > 20) {
      this.sessions.set(sessionId, session.slice(-20));
    }

    return session;
  }

  clearSession(sessionId) {
    this.sessions.delete(sessionId);
  }

  getSessionCount() {
    return this.sessions.size;
  }
}

module.exports = new SessionManager();