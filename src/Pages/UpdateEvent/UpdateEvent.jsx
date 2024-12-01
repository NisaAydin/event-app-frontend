/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdateEvent.css";

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

  const interestOptions = [
    "Spor ve Fitness",
    "Sanat ve Kültür",
    "Oyunlar",
    "Seyahat ve Doğa",
    "Sağlık ve Sağlıklı Yaşam",
    "Teknoloji",
  ];

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/event/getEventById/${id}`,
          {
            withCredentials: true,
          }
        );
        const fetchedEvent = response.data;

        setEvent({
          ...fetchedEvent,
          CategoryName: fetchedEvent.Category?.Category || "",
        });
      } catch (error) {
        toast.error("Etkinlik bilgileri alınamadı.", { position: "top-right" });
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      Object.keys(event).forEach((key) => {
        formData.append(key, event[key]);
      });

      if (selectedFile) {
        formData.append("EventPicture", selectedFile);
      }

      await axios.put(`http://localhost:3000/event/update/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Etkinlik başarıyla güncellendi.", {
        position: "top-right",
      });

      navigate("/my-events");
    } catch (error) {
      toast.error(
        `Etkinlik güncellenirken hata oluştu: ${
          error.response?.data?.message || error.message
        }`,
        { position: "top-right" }
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="update-event-page">
      <ToastContainer />
      <h2 className="update-event-title">Etkinlik Güncelle</h2>
      <form className="update-event-form" onSubmit={handleSubmit}>
        <div className="update-event-field">
          <label>Etkinlik Adı:</label>
          <input
            type="text"
            name="EventName"
            value={event.EventName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="update-event-field">
          <label>Açıklama:</label>
          <textarea
            name="Description"
            value={event.Description}
            onChange={handleChange}
            className="description"
          ></textarea>
        </div>
        <div className="update-event-field">
          <label>Tarih:</label>
          <input
            type="date"
            name="EventDate"
            value={event.EventDate.split("T")[0]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="update-event-field">
          <label>Başlangıç Saati:</label>
          <input
            type="time"
            name="EventStartTime"
            value={event.EventStartTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="update-event-field">
          <label>Bitiş Saati:</label>
          <input
            type="time"
            name="EventFinishTime"
            value={event.EventFinishTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="update-event-field">
          <label>Etkinlik Konumu:</label>
          <input
            type="text"
            name="Location"
            value={event.Location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="update-event-field">
          <label>Kategori:</label>
          <div className="category-options">
            {interestOptions.map((category) => (
              <div key={category} className="category-option">
                <input
                  type="radio"
                  id={category}
                  name="CategoryName"
                  value={category}
                  checked={event.CategoryName === category}
                  onChange={handleChange}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="update-event-field">
          <label>Resim:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button className="update-event-button" type="submit">
          Güncelle
        </button>
      </form>
    </div>
  );
}

export default UpdateEvent;
