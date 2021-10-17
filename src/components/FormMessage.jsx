import React, { useState } from 'react';
import { SendOutlined, UploadOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

const FormMessage = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;

  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setValue('');
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div className='icon-container'>
        <div className='send-icon-container'>
          <button type="button" className="form-upload-button">
            <label htmlFor="upload-button">
              <span className="form-icon">
                <UploadOutlined className="picture-icon" />
              </span>
            </label>
          </button>
          <input
            type="file"
            multiple={false}
            id="upload-button"
            style={{ display: 'none' }}
            onChange={handleUpload.bind(this)}
          />
          <button type="submit" className="form-button">
            <SendOutlined className="form-send-icon" />
          </button>
        </div>

      </div>
    </form>
  );
};

export default FormMessage;