import { useEffect, useState } from "react";
import axios from "axios";

function ChatPage() {
  const [chats, setChats] = useState([]); // Kullanıcının katıldığı etkinlikler
  const [selectedEventId, setSelectedEventId] = useState(null); // Seçilen etkinlik ID
  const [messages, setMessages] = useState([]); // Mesajlar
  const [newMessage, setNewMessage] = useState(""); // Yeni mesaj metni

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
      } catch (error) {
        console.error(
          "Mesajlar alınamadı:",
          error.response?.data || error.message
        );
      }
    };

    fetchMessages();
  }, [selectedEventId]);

  // Mesaj gönder
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      // Mesaj gönderme isteği
      const response = await axios.post(
        `http://localhost:3000/chat/${selectedEventId}/messages`,
        { messageText: newMessage },
        { withCredentials: true }
      );

      // Backend'den dönen tam mesajı listeye ekle
      setMessages([...messages, response.data.data]);
      setNewMessage(""); // Input'u temizle
    } catch (error) {
      console.error(
        "Mesaj gönderilemedi:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar: Katıldığı etkinlikler */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ccc",
          padding: "10px",
          backgroundColor: "#f8f9fa",
        }}
      >
        <h3>Katıldığınız Etkinlikler</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedEventId(chat.id)} // Etkinlik seçildiğinde ID'yi güncelle
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor:
                    selectedEventId === chat.id ? "#e9ecef" : "#fff",
                  transition: "background-color 0.3s",
                }}
              >
                <h4
                  style={{
                    marginBottom: "5px",
                    fontSize: "16px",
                    color: "#495057",
                  }}
                >
                  {chat.EventName}
                </h4>
                <p style={{ fontSize: "14px", color: "#868e96" }}>
                  {chat.Description}
                </p>
                <small style={{ color: "#adb5bd" }}>
                  Tarih: {new Date(chat.EventDate).toLocaleDateString()}
                </small>
              </div>
            ))
          ) : (
            <p>Henüz katıldığınız bir etkinlik bulunmuyor.</p>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ width: "70%", padding: "10px", backgroundColor: "#fff" }}>
        {selectedEventId ? (
          <>
            <h3>Mesajlar</h3>
            <div
              style={{
                height: "400px",
                overflowY: "scroll",
                border: "1px solid #ccc",
                padding: "10px",
                backgroundColor: "#f1f3f5",
              }}
            >
              {messages.length > 0 ? (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid #ddd", // Mesajlar arası çizgi
                    }}
                  >
                    {/* Profil Resmi */}
                    <img
                      className="profile-picture"
                      src={
                        msg.Sender?.ProfilePicture
                          ? `http://localhost:3000/${msg.Sender.ProfilePicture}` // Profil resmi varsa göster
                          : "http://localhost:3000/uploads/default-profile.png" // Varsayılan resim
                      }
                      alt={`${msg.Sender?.Name}'s Profile`}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginRight: "10px",
                        border: "1px solid #ccc",
                      }}
                    />

                    {/* Mesaj İçeriği */}
                    <div style={{ flex: 1 }}>
                      <strong style={{ color: "#000" }}>
                        {msg.Sender?.Name} {msg.Sender?.Surname}:
                      </strong>
                      <p style={{ margin: "5px 0", color: "#000" }}>
                        {msg.MessageText}
                      </p>
                      <small style={{ color: "#000" }}>
                        {new Date(msg.SendTime).toLocaleTimeString()}
                      </small>
                    </div>
                  </div>
                ))
              ) : (
                <p>Bu etkinlik için mesaj bulunmuyor.</p>
              )}
            </div>

            {/* Mesaj Gönderme Alanı */}
            <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Mesaj yazın..."
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
              <button
                onClick={handleSendMessage}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
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
