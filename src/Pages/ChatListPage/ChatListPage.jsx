import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ChatListPage() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/messages/user-chats",
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

  const handleChatClick = (eventId) => {
    navigate(`/chat/${eventId}`); // Sohbet detayına yönlendir
  };

  return (
    <div>
      <h2>Katıldığınız Etkinliklerin Sohbetleri</h2>
      {chats.length > 0 ? (
        chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleChatClick(chat.id)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              margin: "10px 0",
              cursor: "pointer",
            }}
          >
            <h3>{chat.EventName}</h3>
            <p>{chat.Description}</p>
            <p>Tarih: {new Date(chat.EventDate).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p>Henüz katıldığınız bir etkinlik bulunmuyor.</p>
      )}
    </div>
  );
}

export default ChatListPage;
