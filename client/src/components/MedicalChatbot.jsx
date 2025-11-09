import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const MedicalChatbot = ({ initialMessage, className = '', onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (initialMessage) {
      setMessages([{
        id: 1,
        text: initialMessage,
        sender: 'bot',
        timestamp: new Date(),
        type: 'welcome'
      }]);
    }
  }, [initialMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        message: inputMessage.trim(),
        conversationId: conversationId,
        timestamp: new Date().toISOString()
      });

      const botResponse = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'response',
        sources: response.data.sources || [],
        confidence: response.data.confidence
      };

      // Update conversation ID if provided
      if (response.data.conversationId) {
        setConversationId(response.data.conversationId);
      }

      setMessages(prev => [...prev, botResponse]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Fallback to local responses if API fails
      const fallbackResponse = {
        id: Date.now() + 1,
        text: getFallbackResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
        type: 'response',
        isFallback: true
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const getFallbackResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Enhanced response system with more conditions
    if (lowerMessage.includes('headache') || lowerMessage.includes('head ache')) {
      return "Headaches can have various causes including tension, dehydration, or underlying conditions. Common remedies include:\n\n• Rest in a quiet, dark room\n• Stay hydrated\n• Over-the-counter pain relievers (follow dosage instructions)\n• Cold compress on forehead\n\nIf your headache is severe, persistent, accompanied by vision changes, fever, or neck stiffness, consult a healthcare provider immediately.";
    }
    
    if (lowerMessage.includes('fever') || lowerMessage.includes('temperature')) {
      return "For fever management:\n\n• Rest and stay hydrated with water, broth, or electrolyte solutions\n• Use acetaminophen or ibuprofen as directed\n• Lukewarm sponge baths can help\n• Wear lightweight clothing\n\nSeek medical attention if:\n• Fever above 103°F (39.4°C)\n• Lasts more than 3 days\n• Accompanied by severe headache, rash, or difficulty breathing";
    }
    
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('911')) {
      return "🚨 **MEDICAL EMERGENCY** 🚨\n\nIf you're experiencing any of these symptoms, call emergency services immediately:\n\n• Chest pain or pressure\n• Difficulty breathing\n• Severe bleeding\n• Sudden weakness or numbness\n• Severe burns\n• Poisoning\n• Suicidal thoughts\n\nPlease call your local emergency number (911 in US) or go to the nearest emergency room.";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm glad I could help. Remember that I'm here to provide general health information, but always consult with healthcare professionals for personal medical advice. Is there anything else you'd like to know about your health?";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi ') || lowerMessage === 'hi') {
      return "Hello! I'm your MedChain AI Health Assistant. I can help with general health information, symptom guidance, medication questions, and wellness tips. Remember, I'm not a substitute for professional medical care. How can I assist you today?";
    }
    
    // Default response
    return "I apologize, but I'm currently experiencing connection issues. Here's what I can suggest:\n\n• For immediate medical concerns, contact your healthcare provider\n• For emergencies, call your local emergency number\n• You can try refreshing the page or try again shortly\n\nI'll try to provide the best assistance I can with my local knowledge until the connection is restored.";
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    if (onClose && typeof onClose === 'function') {
      onClose();
    } else {
      console.warn('onClose prop is not provided or not a function');
      // Fallback: just minimize if no close handler provided
      setIsMinimized(true);
    }
  };

  const quickReplies = [
    "What are common cold symptoms?",
    "When should I go to emergency?",
    "Headache remedies and when to worry",
    "Fever management guidelines",
    "Stomach pain causes and care",
    "Allergy symptom relief",
    "COVID-19 symptoms and care",
    "Sleep improvement tips"
  ];

  const clearChat = () => {
    setConversationId(null);
    setMessages([{
      id: Date.now(),
      text: initialMessage,
      sender: 'bot',
      timestamp: new Date(),
      type: 'welcome'
    }]);
  };

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  const renderSources = (sources) => {
    if (!sources || sources.length === 0) return null;

    return (
      <div className="mt-3 pt-3 border-t border-indigo-500/30">
        <p className="text-xs text-indigo-300 mb-2 font-medium">Sources:</p>
        <div className="space-y-1">
          {sources.map((source, index) => (
            <div key={index} className="text-xs text-indigo-400 flex items-start space-x-2">
              <span className="text-indigo-500 mt-0.5">•</span>
              <span>{source}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-indigo-600 rounded-2xl p-4 shadow-2xl border border-indigo-400/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold">AI Assistant</span>
            <div className="flex space-x-1">
              <button
                onClick={() => setIsMinimized(false)}
                className="p-1 hover:bg-indigo-500 rounded transition-colors"
                aria-label="Restore chat"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-red-500 rounded transition-colors"
                aria-label="Close chat"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full bg-gray-900/95 backdrop-blur-lg rounded-2xl border border-indigo-500/30 shadow-2xl ${className}`}>
      {/* Enhanced Header */}
      <div className="p-4 border-b border-indigo-700/30 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">MedChain AI Assistant</h3>
              <p className="text-indigo-300 text-sm">Powered by AI • 24/7 Support</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearChat}
              className="p-2 text-indigo-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Clear chat"
              aria-label="Clear chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={() => setIsMinimized(true)}
              className="p-2 text-indigo-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              title="Minimize"
              aria-label="Minimize chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5v14" />
              </svg>
            </button>
            <button
              onClick={handleClose}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
              title="Close"
              aria-label="Close chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-gray-800">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-4 backdrop-blur-sm ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none shadow-lg'
                  : 'bg-gray-800/80 text-white rounded-bl-none border border-indigo-500/20 shadow-lg'
              } ${message.type === 'welcome' ? 'border-2 border-green-500/30' : ''} ${message.isFallback ? 'border-2 border-yellow-500/30' : ''}`}
            >
              <div className="flex items-start space-x-3">
                {message.sender === 'bot' && (
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-white">AI</span>
                  </div>
                )}
                <div className="flex-1">
                  {message.isFallback && (
                    <div className="flex items-center space-x-2 mb-2 p-2 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      <span className="text-yellow-400 text-xs font-medium">Using offline mode</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {formatMessage(message.text)}
                  </p>
                  {message.sources && renderSources(message.sources)}
                  <p className="text-xs opacity-70 mt-2 flex items-center space-x-2">
                    <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {message.sender === 'bot' && (
                      <>
                        <span className="text-green-400">• Verified AI</span>
                        {message.confidence && (
                          <span className="text-blue-400">• {Math.round(message.confidence * 100)}% confidence</span>
                        )}
                      </>
                    )}
                  </p>
                </div>
                {message.sender === 'user' && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-xs text-white">You</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-fade-in">
            <div className="max-w-[85%] bg-gray-800/80 text-white rounded-2xl rounded-bl-none p-4 border border-indigo-500/20 shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs text-white">AI</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-indigo-300 text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {messages.length <= 2 && (
        <div className="px-4 pb-3 border-b border-indigo-700/30">
          <p className="text-indigo-300 text-sm mb-2 font-medium">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(reply)}
                className="px-3 py-2 text-xs bg-indigo-900/30 text-indigo-300 rounded-full border border-indigo-700/30 hover:bg-indigo-800/50 hover:border-indigo-500/50 hover:text-white transition-all duration-200 backdrop-blur-sm"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enhanced Input Area */}
      <div className="p-4 bg-gray-800/50 backdrop-blur-sm rounded-b-2xl">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your symptoms or ask a health question..."
              className="w-full bg-gray-700/80 border border-indigo-700/30 rounded-xl px-4 py-3 text-white placeholder-indigo-300 resize-none focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 backdrop-blur-sm transition-all duration-200"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            {inputMessage && (
              <button
                onClick={() => setInputMessage('')}
                className="absolute right-2 top-2 p-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                aria-label="Clear message"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 disabled:from-indigo-900 disabled:to-purple-900 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-indigo-500/25 disabled:shadow-none"
            title="Send message"
            aria-label="Send message"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="text-xs text-indigo-400/80">
            Press Enter to send • Shift+Enter for new line
          </p>
          <p className="text-xs text-red-400/80 font-medium">
            ⚠️ Not a substitute for professional medical advice
          </p>
        </div>
      </div>
    </div>
  );
};

export default MedicalChatbot;