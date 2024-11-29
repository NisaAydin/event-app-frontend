import { useState } from "react";
import axios from "axios"; // Backend API'sine veri göndermek için HTTP isteklerini yapmakta kullanılır.
import { toast } from "react-toastify"; // Kullanıcıya başarılı veya başarısız işlem bildirimleri göstermek için kullanılır.
import { useNavigate } from "react-router-dom";
import "./AddEventPage.css";
import Button from "../../Components/Button/Button";

function AddEventPage() {
  const navigate = useNavigate();

  const interestOptions = [
    "Spor ve Fitness",
    "Sanat ve Kültür",
    "Oyunlar",
    "Seyahat ve Doğa",
    "Sağlık ve Sağlıklı Yaşam",
    "Teknoloji",
  ];

  const [formData, setFormData] = useState({
    EventName: "",
    Description: "",
    EventDate: "",
    EventStartTime: "",
    EventFinishTime: "",
    Location: "",
    selectedCategory: "",
    EventPicture: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setFormData({ ...formData, selectedCategory: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, EventPicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("EventName", formData.EventName);
    data.append("Description", formData.Description);
    data.append("EventDate", formData.EventDate);
    data.append("EventStartTime", formData.EventStartTime);
    data.append("EventFinishTime", formData.EventFinishTime);
    data.append("Location", formData.Location);
    data.append("CategoryName", formData.selectedCategory);
    if (formData.EventPicture) {
      data.append("EventPicture", formData.EventPicture);
    }

    try {
      await axios.post("http://localhost:3000/event/create-event", data, {
        withCredentials: true,
      });

      toast.success("Etkinlik başarıyla oluşturuldu!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Bir hata oluştu.";
      console.error("Etkinlik oluşturulurken hata oluştu: ", errorMessage);

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="add-event-page">
      <h2>Etkinlik Oluştur</h2>
      <form className="add-event-form" onSubmit={handleSubmit}>
        <div>
          <label>Etkinlik Adı</label>
          <input
            type="text"
            name="EventName"
            value={formData.EventName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Açıklama</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        <div>
          <label>Tarih</label>
          <input
            type="date"
            name="EventDate"
            value={formData.EventDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Başlangıç Saati</label>
          <input
            type="time"
            name="EventStartTime"
            value={formData.EventStartTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bitiş Saati</label>
          <input
            type="time"
            name="EventFinishTime"
            value={formData.EventFinishTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lokasyon</label>
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kategori</label>
          <div className="category-options">
            {interestOptions.map((category) => (
              <div key={category}>
                <input
                  type="radio"
                  id={category}
                  name="selectedCategory"
                  value={category}
                  checked={formData.selectedCategory === category}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Etkinlik Resmi</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <Button text="Etkinlik Oluştur" variant="toggle" type="submit" />
      </form>
    </div>
  );
}

export default AddEventPage;
