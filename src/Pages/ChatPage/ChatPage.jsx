import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ChatPage.css";

function ChatPage() {
  const [chats, setChats] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const messageEndRef = useRef(null); // Mesajların sonuna referans

  // Kullanıcının katıldığı etkinlikleri getir
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/chat/user-chats",
          { withCredentials: true }
        );
        setChats(response.data.data);
      } catch (error) {
        console.error(
          "Sohbet listesi alınamadı:",
          error.response?.data || error.message
        );
      }
    };

    fetchChats();
  }, []);

  // Seçilen etkinlik için mesajları getir
  useEffect(() => {
    if (!selectedEventId) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/chat/${selectedEventId}/messages`,
          { withCredentials: true }
        );
        setMessages(response.data.data);
        setCurrentUser(response.data.currentUser);
      } catch (error) {
        console.error(
          "Mesajlar alınamadı:",
          error.response?.data || error.message
        );
      }
    };

    fetchMessages();
  }, [selectedEventId]);

  // Mesaj listesi güncellendiğinde otomatik olarak en alta kaydır
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Mesaj gönder
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:3000/chat/${selectedEventId}/messages`,
        { messageText: newMessage },
        { withCredentials: true }
      );

      setMessages([...messages, response.data.data]); // Yeni mesajı ekle
      setNewMessage(""); // Input temizle
    } catch (error) {
      console.error(
        "Mesaj gönderilemedi:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Katıldığınız Etkinlikler</h3>
        <div className="chat-list">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedEventId(chat.id)}
                className={`chat-item ${
                  selectedEventId === chat.id ? "chat-item-selected" : ""
                }`}
              >
                <h4 className="chat-item-title">{chat.EventName}</h4>
                <small className="chat-item-date">
                  Tarih: {new Date(chat.EventDate).toLocaleDateString()}
                </small>
              </div>
            ))
          ) : (
            <p>Henüz katıldığınız bir etkinlik bulunmuyor.</p>
          )}
        </div>
      </div>

      <div className="chat-main">
        {selectedEventId ? (
          <>
            <h3>Mesajlar</h3>
            <div className="message-list">
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${
                      msg.SenderId === currentUser?.id
                        ? "message-own"
                        : "message-other"
                    }`}
                  >
                    <img
                      className="message-avatar"
                      src={
                        msg.Sender?.ProfilePicture
                          ? `http://localhost:3000/${msg.Sender.ProfilePicture}`
                          : "http://localhost:3000/uploads/default-profile.png"
                      }
                      alt={`${msg.Sender?.Name}'s Profile`}
                    />
                    <div className="message-content">
                      <strong>
                        {msg.Sender?.Name} {msg.Sender?.Surname}:
                      </strong>
                      <p>{msg.MessageText}</p>
                      <small>
                        {new Date(msg.SendTime).toLocaleTimeString()}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <p>Bu etkinlik için mesaj bulunmuyor.</p>
              )}
              <div ref={messageEndRef} /> {/* Listenin sonuna referans */}
            </div>

            <div className="message-input-container">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Mesaj yazın..."
                className="message-input"
              />
              <button onClick={handleSendMessage} className="message-send-btn">
                Gönder
              </button>
            </div>
          </>
        ) : (
          <p>Lütfen bir etkinlik seçin.</p>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
