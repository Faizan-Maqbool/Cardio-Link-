import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Phone, Video, Mic, Send, Paperclip, Image, X, MoreVertical, Plus, Clock, Camera } from 'lucide-react';
import io from 'socket.io-client';

// Initialize socket connection - make sure to only create one instance
let socket;

export default function DoctorChat({ darkMode = false, goBack }) {
  // User and connection states
  const [userRole, setUserRole] = useState('client');
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [callStatus, setCallStatus] = useState(null);
  const messageEndRef = useRef(null);
  const timerRef = useRef(null);
  const [roomId, setRoomId] = useState('doctor-patient-room');

  // Initial messages state
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'doctor',
      content: 'Hello! How can I help you today?',
      time: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'client',
      content: 'Hi Dr. Johnson, I wanted to ask about the medication you prescribed last week.',
      time: '10:32 AM',
      read: true
    },
    {
      id: 3,
      sender: 'doctor',
      content: 'Of course. Are you experiencing any side effects?',
      time: '10:33 AM',
      read: true
    },
    {
      id: 4,
      sender: 'client',
      content: "I've been feeling a bit dizzy in the mornings. Is that normal?",
      time: '10:35 AM',
      read: true
    },
    {
      id: 5,
      sender: 'doctor',
      content: "That can be a common side effect. Can you tell me more about when it happens and how long it lasts?",
      time: '10:38 AM',
      read: true
    }
  ]);

  // Doctor information
  const doctor = {
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    status: 'Online',
    lastSeen: '2 min ago',
    image: null
  };

  // Socket connection effect
  useEffect(() => {
    // Initialize socket connection only once
    if (!socket) {
      socket = io('http://localhost:3001');
    }
    
    // Generate a unique user ID
    const userId = Math.random().toString(36).substring(7);
    
    // Connect to socket and join room
    const connectToSocket = () => {
      socket.connect();
      socket.emit('join_room', { roomId, userId, role: userRole });
    };
    
    connectToSocket();
    
    // Set up event listeners
    const handleConnect = () => {
      console.log('Connected to socket server');
      setIsConnected(true);
    };
    
    const handleDisconnect = () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
    };
    
    const handleReceiveMessage = (message) => {
      console.log('Received message:', message);
      setMessages(prevMessages => {
        // Check if message already exists to prevent duplicates
        const exists = prevMessages.some(msg => msg.id === message.id);
        if (!exists) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
    };
    
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('receive_message', handleReceiveMessage);
    
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('receive_message', handleReceiveMessage);
    };
  }, [userRole, roomId]);

  // Scroll to bottom effect
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Recording timer effect
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const messageData = {
      id: Date.now() + Math.random().toString(36).substring(7),
      sender: userRole,
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      read: false,
      roomId: roomId
    };
    
    // First update local state so the message appears instantly for the sender
    setMessages(prevMessages => [...prevMessages, messageData]);
    
    // Then emit the message to the socket server
    console.log('Sending message:', messageData);
    socket.emit('send_message', messageData);
    setNewMessage('');
  };

  const toggleRole = () => {
    const newRole = userRole === 'doctor' ? 'client' : 'doctor';
    setUserRole(newRole);
    
    // Update role on the server
    socket.emit('change_role', { role: newRole, roomId });
  };

  const toggleAttachmentMenu = () => {
    setIsAttachmentMenuOpen(!isAttachmentMenuOpen);
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);
    
    const audioMsg = {
      id: Date.now() + Math.random().toString(36).substring(7),
      sender: userRole,
      content: `🎤 Audio message (${formatTime(recordingTime)})`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'audio',
      read: false,
      roomId: roomId
    };
    
    // Update local state first
    setMessages(prevMessages => [...prevMessages, audioMsg]);
    
    // Then emit to socket
    socket.emit('send_message', audioMsg);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const initiateCall = (type) => {
    setCallStatus(type);
    setTimeout(() => {
      setCallStatus(null);
    }, 5000);
  };

  const ConnectionStatus = () => (
    <div className={`text-xs px-2 py-1 rounded-full ${
      isConnected ? 'bg-green-500' : 'bg-red-500'
    } text-white absolute top-2 right-2`}>
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );

  const RoleIndicator = () => (
    <div className="absolute top-2 left-2 flex items-center">
      <span className={`text-xs px-2 py-1 rounded-full ${
        userRole === 'doctor' ? 'bg-blue-500' : 'bg-purple-500'
      } text-white`}>
        {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
      </span>
      <button
        onClick={toggleRole}
        className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-500 text-white"
      >
        Switch Role
      </button>
    </div>
  );

  return (
    <div className={`flex flex-col w-full h-screen relative ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} px-2 sm:px-4`}>
      <ConnectionStatus />
      <RoleIndicator />
      <div className="w-full max-w-xl mx-auto flex flex-col h-full">
        {/* Display call UI when active */}
        {callStatus && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
            <div className={`w-24 h-24 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-4 flex items-center justify-center`}>
              <span className="text-2xl font-semibold">SJ</span>
            </div>
            <h2 className="text-xl font-bold mb-1">{doctor.name}</h2>
            <p className="mb-6">{callStatus === 'video' ? 'Video call' : 'Audio call'}...</p>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setCallStatus(null)}
                className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center"
              >
                <X size={24} />
              </button>
              {callStatus === 'video' && (
                <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
                  <Camera size={24} />
                </button>
              )}
              <button className="w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center">
                <Mic size={24} />
              </button>
            </div>
          </div>
        )}
      
        {/* Chat Header */}
        <div className={`flex items-center justify-between py-4 border-b border-opacity-20 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <div className="flex items-center">
            <button 
              onClick={goBack}
              className={`mr-2 p-2 rounded-full ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} flex items-center justify-center`}>
                  <span className="text-sm font-semibold">SJ</span>
                </div>
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${doctor.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'} border-2 ${darkMode ? 'border-gray-900' : 'border-white'}`}></span>
              </div>
              
              <div className="ml-3">
                <h2 className="font-medium">{doctor.name}</h2>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {doctor.status === 'Online' ? 'Online' : `Last seen: ${doctor.lastSeen}`}
                </p>
              </div>
            </div>
          </div>

          {/* Call buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => initiateCall('audio')}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Phone size={20} />
            </button>
            <button
              onClick={() => initiateCall('video')}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <Video size={20} />
            </button>
            <button
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <MoreVertical size={20} />
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === userRole ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.sender === userRole
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-800 text-gray-100'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <div className={`text-xs mt-1 ${message.sender === userRole ? 'text-blue-100' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {message.time}
                  {message.sender === userRole && (
                    <span className="ml-2">
                      {message.read ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>

        {/* Attachment Menu */}
        {isAttachmentMenuOpen && (
          <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-t-2xl`}>
            <div className="grid grid-cols-4 gap-4">
              <button className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Image size={20} />
                </div>
                <span className="text-xs mt-1">Photo</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white">
                  <Camera size={20} />
                </div>
                <span className="text-xs mt-1">Camera</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white">
                  <Plus size={20} />
                </div>
                <span className="text-xs mt-1">Document</span>
              </button>
              <button className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white">
                  <Clock size={20} />
                </div>
                <span className="text-xs mt-1">Schedule</span>
              </button>
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          {isRecording ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2" />
                <span>{formatTime(recordingTime)}</span>
              </div>
              <button
                onClick={stopRecording}
                className="p-2 rounded-full bg-red-500 text-white"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-end space-x-2">
              <button
                onClick={toggleAttachmentMenu}
                className={`p-2 rounded-full ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                <Paperclip size={20} />
              </button>
              
              <div className="flex-1">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className={`w-full rounded-full py-2 px-4 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-100 placeholder-gray-400'
                      : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                  }`}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
              </div>

              {newMessage ? (
                <button
                  onClick={handleSendMessage}
                  className="p-2 rounded-full bg-blue-500 text-white"
                >
                  <Send size={20} />
                </button>
              ) : (
                <button
                  onMouseDown={startRecording}
                  className={`p-2 rounded-full ${
                    darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <Mic size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}