const axios = require('axios');
const { GEMINI_CONFIG, MEDICAL_CONTEXT } = require('../config/geminiConfig');
const sessionManager = require('../utils/sessionManager');

class ChatController {
  constructor() {
    // ✅ Bind all class methods to preserve 'this'
    this.sendMessage = this.sendMessage.bind(this);
    this.clearChat = this.clearChat.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  async generateMedicalResponse(prompt, sessionId) {
    try {
      const chatHistory = sessionManager.getSession(sessionId);

      const conversationContext = chatHistory
        .slice(-10)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const fullPrompt = `${MEDICAL_CONTEXT}\n\nConversation History:\n${conversationContext}\n\nUser: ${prompt}\nAssistant:`;

      const requestBody = {
        contents: [
          {
            parts: [{ text: fullPrompt }]
          }
        ],
        generationConfig: GEMINI_CONFIG.GENERATION_CONFIG
      };

      const response = await axios.post(
        `${GEMINI_CONFIG.API_URL}?key=${GEMINI_CONFIG.API_KEY}`,
        requestBody,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0]) {
        const aiResponse = response.data.candidates[0].content.parts[0].text;

        sessionManager.updateSession(sessionId, prompt, aiResponse);

        return aiResponse;
      } else {
        throw new Error('Invalid response from Gemini API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new Error('Failed to generate response. Please try again.');
    }
  }

  async sendMessage(req, res, next) {
    try {
      const { message, sessionId = `session_${Date.now()}` } = req.body;

      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Valid message is required'
        });
      }

      if (message.length > 1000) {
        return res.status(400).json({
          success: false,
          error: 'Message too long. Maximum 1000 characters allowed.'
        });
      }

      const response = await this.generateMedicalResponse(message.trim(), sessionId);

      res.json({
        success: true,
        response,
        sessionId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      next(error);
    }
  }

  async clearChat(req, res, next) {
    try {
      const { sessionId } = req.body;

      if (sessionId) {
        sessionManager.clearSession(sessionId);
      }

      res.json({
        success: true,
        message: 'Chat history cleared successfully',
        sessionId: sessionId || 'all'
      });
    } catch (error) {
      next(error);
    }
  }

  getStats(req, res) {
    res.json({
      success: true,
      stats: {
        activeSessions: sessionManager.getSessionCount(),
        timestamp: new Date().toISOString()
      }
    });
  }
}

module.exports = new ChatController();
