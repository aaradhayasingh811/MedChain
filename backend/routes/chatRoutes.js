const express = require('express');
const chatController = require('../controllers/chatController');

const router = express.Router();

// POST /api/chat - Send message to chatbot
router.post('/', chatController.sendMessage);

// DELETE /api/chat - Clear chat history
router.delete('/', chatController.clearChat);

// GET /api/chat/stats - Get chatbot statistics
router.get('/stats', chatController.getStats);

module.exports = router;