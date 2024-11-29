/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateEvent() {
  const { id } = useParams(); // URL'den etkinlik ID'sini al
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    EventName: "",
    Description: "",
    EventDate: "",
    EventStartTime: "",
    EventFinishTime: "",
    Location: "",
    CategoryName: "",
    EventPicture: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Kategoriler sabit olarak burada tanımlandı
  const interestOptions = [
    "Spor ve Fitness",
    "Sanat ve Kültür",
    "Oyunlar",
    "Seyahat ve Doğa",
    "Sağlık ve Sağlıklı Yaşam",
    "Teknoloji",
  ];

  // Etkinlik bilgilerini yükle
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/event/getEventById/${id}`, {
          withCredentials: true,
        });
        const fetchedEvent = response.data;

        setEvent({
          ...fetchedEvent,
          CategoryName: fetchedEvent.Category?.Category || "", // Gelen kategori adı
        });
      } catch (error) {
        toast.error("Etkinlik bilgileri alınamadı.", { position: "top-right" });
      }
    };

    fetchEvent();
  }, [id]);

  // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(event).forEach((key) => {
        formData.append(key, event[key]);
      });

      if (selectedFile) {
        formData.append("EventPicture", selectedFile); // Resim dosyasını ekle
      }

      await axios.put(`http://localhost:3000/event/update/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Etkinlik başarıyla güncellendi.", {
        position: "top-right",
      });

      navigate("/my-events"); // Güncelleme sonrası MyEvents sayfasına dön
    } catch (error) {
      toast.error(
        `Etkinlik güncellenirken hata oluştu: ${
          error.response?.data?.message || error.message
        }`,
        { position: "top-right" }
      );
    }
  };

  // Form alanlarının değişimini yönet
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Resim dosyası seçimi
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <ToastContainer />
      <h2>Etkinlik Güncelle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Etkinlik Adı:</label>
          <input
            type="text"
            name="EventName"
            value={event.EventName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Açıklama:</label>
          <textarea
            name="Description"
            value={event.Description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Tarih:</label>
          <input
            type="date"
            name="EventDate"
            value={event.EventDate.split("T")[0]}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Başlangıç Saati:</label>
          <input
            type="time"
            name="EventStartTime"
            value={event.EventStartTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bitiş Saati:</label>
          <input
            type="time"
            name="EventFinishTime"
            value={event.EventFinishTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kategori:</label>
          <div>
            {interestOptions.map((category) => (
              <div key={category}>
                <input
                  type="radio"
                  id={category}
                  name="CategoryName"
                  value={category}
                  checked={event.CategoryName === category} // Önceden seçili kategori
                  onChange={handleChange}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Resim:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
}

export default UpdateEvent;
