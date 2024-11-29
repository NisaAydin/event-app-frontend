import React, { useState, useEffect } from "react";
import axios from "axios";

import "./ChatPage.css";

function ChatPage({ eventId }) {
  const { user } = useAuth(); // Kullanıcıyı AuthContext'den alıyoruz
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Mesajları yükle
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/messages/get-messages/${eventId}`,
          { withCredentials: true }
        );
        setMessages(response.data.data);
      } catch (error) {
        console.error(
          "Mesajlar alınamadı:",
          error.response?.data || error.message
        );
      }
    };

    fetchMessages();
  }, [eventId]);

  // Mesaj gönder
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        "http://localhost:3000/messages/send-message",
        {
          EventId: eventId,
          MessageText: newMessage,
        },
        { withCredentials: true }
      );

      setMessages([...messages, response.data.data]);
      setNewMessage("");
    } catch (error) {
      console.error(
        "Mesaj gönderilemedi:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Etkinlik Sohbeti</h2>
      </div>
      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${
              message.SenderId === user.id ? "chat-message-own" : ""
            }`}
          >
            {message.SenderId !== user.id && (
              <img
                src={`http://localhost:3000/uploads/user-${message.SenderId}.jpg`} // Gönderenin avatarı
                alt="Avatar"
                className="chat-avatar"
              />
            )}
            <div className="chat-bubble">
              <p>{message.MessageText}</p>
              <span className="chat-time">
                {new Date(message.SendTime).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Mesajınızı yazın..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Gönder</button>
      </div>
    </div>
  );
}

export default ChatPage;
