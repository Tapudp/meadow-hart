import React from 'react';

export default function SendButton({ clickHandler, isDisabled, className }) {
  return (
    <button onClick={clickHandler} disabled={isDisabled} className={className}>
      Send
    </button>
  );
}
