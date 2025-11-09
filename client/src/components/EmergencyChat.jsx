import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EmergencyChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [emergencyLevel, setEmergencyLevel] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Simulate connecting to emergency services
    setTimeout(() => {
      setIsConnected(true);
      setMessages([{
        id: 1,
        text: "Emergency services connected. Please describe your emergency situation.",
        sender: 'operator',
        timestamp: new Date()
      }]);
    }, 2000);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Simulate operator response
    setTimeout(() => {
      const operatorResponse = {
        id: messages.length + 2,
        text: getOperatorResponse(inputMessage),
        sender: 'operator',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, operatorResponse]);

      // Check for emergency keywords to set level
      checkEmergencyLevel(inputMessage);
    }, 1000);
  };

  const getOperatorResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('ambulance') || lowerMessage.includes('help now')) {
      return "Ambulance has been dispatched to your location. Please stay on the line and provide any updates.";
    }
    
    if (lowerMessage.includes('chest pain') || lowerMessage.includes('heart')) {
      return "This sounds serious. I've alerted cardiac emergency services. Are you experiencing shortness of breath or dizziness?";
    }
    
    if (lowerMessage.includes('breath') || lowerMessage.includes('breathing')) {
      return "Respiratory emergency noted. Help is on the way. Try to remain calm and sit upright if possible.";
    }
    
    if (lowerMessage.includes('bleeding') || lowerMessage.includes('blood')) {
      return "For bleeding, apply direct pressure to the wound with a clean cloth. Help is being dispatched.";
    }
    
    return "Thank you for the information. Help is being coordinated. Can you provide more details about the situation?";
  };

  const checkEmergencyLevel = (message) => {
    const lowerMessage = message.toLowerCase();
    const criticalKeywords = ['chest pain', 'heart attack', 'stroke', 'unconscious', 'not breathing', 'severe bleeding'];
    const highKeywords = ['difficulty breathing', 'severe pain', 'heavy bleeding', 'burn'];
    
    if (criticalKeywords.some(keyword => lowerMessage.includes(keyword))) {
      setEmergencyLevel('critical');
    } else if (highKeywords.some(keyword => lowerMessage.includes(keyword))) {
      setEmergencyLevel('high');
    } else if (!emergencyLevel) {
      setEmergencyLevel('medium');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "I need an ambulance", icon: "🚑" },
    { text: "Chest pain or heart symptoms", icon: "❤️" },
    { text: "Difficulty breathing", icon: "🫁" },
    { text: "Severe bleeding", icon: "🩸" }
  ];

  const getEmergencyColor = () => {
    switch (emergencyLevel) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      default: return 'bg-indigo-600';
    }
  };

  const getEmergencyText = () => {
    switch (emergencyLevel) {
      case 'critical': return 'CRITICAL EMERGENCY';
      case 'high': return 'HIGH PRIORITY';
      case 'medium': return 'MEDIUM PRIORITY';
      default: return 'CONNECTING...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-red-950 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-red-300 hover:text-white mb-4">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-4">Emergency Assistance</h1>
          <div className={`inline-flex items-center px-4 py-2 ${getEmergencyColor()} text-white rounded-full font-semibold`}>
            <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
            {getEmergencyText()}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Chat */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-2xl border border-red-700/30 backdrop-blur-sm h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-red-700/30 bg-red-900/20 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 ${isConnected ? 'bg-green-400' : 'bg-yellow-400'} rounded-full animate-pulse`}></div>
                    <div>
                      <h3 className="text-white font-semibold">Emergency Services</h3>
                      <p className="text-red-300 text-sm">
                        {isConnected ? 'Connected to emergency operator' : 'Connecting...'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-mono">📞 911</p>
                    <p className="text-red-300 text-xs">Active Call</p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {!isConnected && (
                  <div className="flex justify-center">
                    <div className="bg-yellow-900/30 text-yellow-200 rounded-xl p-4 border border-yellow-700/30">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <span>Connecting to emergency services...</span>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-red-600 text-white rounded-br-none'
                          : 'bg-gray-700 text-white rounded-bl-none border border-red-700/30'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {isConnected && messages.length <= 1 && (
                <div className="px-4 pb-2">
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(action.text)}
                        className="flex items-center space-x-2 bg-red-900/30 text-red-300 rounded-xl p-3 border border-red-700/30 hover:bg-red-800/50 transition-colors text-sm"
                      >
                        <span>{action.icon}</span>
                        <span>{action.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-red-700/30">
                <div className="flex space-x-2">
                  <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your emergency..."
                    className="flex-1 bg-gray-700 border border-red-700/30 rounded-xl px-4 py-3 text-white placeholder-red-300 resize-none focus:outline-none focus:border-red-500"
                    rows="1"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || !isConnected}
                    className="px-6 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Info Panel */}
          <div className="space-y-6">
            {/* Critical Info */}
            <div className="bg-red-900/30 rounded-2xl p-6 border border-red-700/30 backdrop-blur-sm">
              <h3 className="text-white font-bold text-lg mb-4">🚨 Critical Information</h3>
              <ul className="space-y-3 text-red-200 text-sm">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Stay on the line until help arrives</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Keep your location accessible</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Follow operator instructions carefully</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>Unlock your door for emergency personnel</span>
                </li>
              </ul>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-red-700/30 backdrop-blur-sm">
              <h3 className="text-white font-bold text-lg mb-4">📞 Emergency Contacts</h3>
              <div className="space-y-3">
                {[
                  { name: 'Local Emergency', number: '911', type: 'primary' },
                  { name: 'Poison Control', number: '1-800-222-1222', type: 'secondary' },
                  { name: 'Suicide Prevention', number: '988', type: 'secondary' },
                  { name: 'Crisis Text Line', number: 'Text HOME to 741741', type: 'secondary' }
                ].map((contact, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-red-700/20">
                    <div>
                      <div className="text-white text-sm font-medium">{contact.name}</div>
                      <div className="text-red-300 text-xs">{contact.number}</div>
                    </div>
                    <button className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-700 transition-colors">
                      Call
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Info */}
            <div className="bg-gray-800/50 rounded-2xl p-6 border border-red-700/30 backdrop-blur-sm">
              <h3 className="text-white font-bold text-lg mb-4">📍 Your Location</h3>
              <div className="bg-gray-700/30 rounded-lg p-4 border border-red-700/20">
                <div className="text-red-200 text-sm mb-2">Last known location:</div>
                <div className="text-white font-mono text-xs bg-gray-600/30 p-2 rounded border border-red-700/10">
                  123 Main Street, City, State 12345
                </div>
                <button className="w-full mt-3 bg-red-600 text-white py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                  Update Location
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyChat;