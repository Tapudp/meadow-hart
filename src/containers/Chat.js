import React, { useEffect, useState } from 'react';
import ChatService from '../service';
import constants from '../constants';
import utils from '../utils';
import ChatMessage from '../components/ChatMessage';
import SendButton from '../components/SendButton';
import InputBox from '../components/InputBox';

export default function Chat() {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setLoading] = useState(false);

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleUserSubmit(); // Click the "Send" button
    }
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleUserSubmit = async () => {
    setLoading(true);
    if (!userInput) return;

    const newUserInput = { text: userInput, isUser: true };
    setChatHistory((currHistory) => [...currHistory, newUserInput]);
    setUserInput('');
    utils.moveScroller(constants.chatBoxId);

    try {
      const botResponse = await ChatService.getResponse(userInput);
      setChatHistory((currHistory) => [...currHistory, botResponse]);

      utils.moveScroller(constants.chatBoxId);

      // Store the chat history in localStorage
      localStorage.setItem(
        'chatHistory',
        JSON.stringify([...chatHistory, newUserInput, botResponse])
      );
    } catch (error) {
      // Handle errors from ChatService.getResponse here
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Load chat history from localStorage on component mount
    const savedChatHistory = localStorage.getItem('chatHistory');
    if (savedChatHistory) {
      setChatHistory(JSON.parse(savedChatHistory));
    } else {
      // Initialize the chat with a welcome message
      setChatHistory([{ text: 'Welcome! How can I assist you?', isUser: false }]);
    }
    // Scroll to the bottom of the chat-box when the page loads
    setTimeout(() => {
      utils.moveScroller(constants.chatBoxId);
    }, 0);
  }, []);

  return (
    <div>
      <h2>Meadow-Hart</h2>
      <div className='chat-box' id={constants.chatBoxId}>
        {chatHistory.map((message, index) => (
          <ChatMessage
            key={index + 1}
            userType={message.isUser ? 'user' : 'bot'}
            messageText={message.text}
          />
        ))}
        <div className='loader'>{isLoading ? 'thinking . . .' : ''}</div>
      </div>
      <div className='user-interaction'>
        <InputBox
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={handleKeyPress}
          isDisabled={isLoading}
        />
        <SendButton clickHandler={handleUserSubmit} isDisabled={isLoading} className='send-btn' />
      </div>
    </div>
  );
}
