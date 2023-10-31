import React from 'react';

export default function InputBox({ value, onChange, onKeyDown, isDisabled }) {
  return (
    <input
      type='text'
      className='query-box'
      placeholder='Ask something . . .'
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      disabled={isDisabled}
    />
  );
}
