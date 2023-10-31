import React from 'react';

export default function ChatMessage({ userType, messageText }) {
  return <div className={`chat-message ${userType}`}>{messageText}</div>;
}
