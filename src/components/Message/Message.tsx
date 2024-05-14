import React from 'react';
import './Message.scss';

type Props = {
  messageText: string;
};

export const Message: React.FC<Props> = ({ messageText }) => {
  return (
    <div className="message">
      <div className="message__wrapper">
        <span className="message__text">{messageText}</span>
      </div>
    </div>
  );
};
