import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddEventPage() {
  const navigate = useNavigate();

  // İlgi Alanları (Kategori isimleri)
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
    EventEndTime: "",
    Location: "",
    selectedCategory: "", // Seçilen kategori adı
    EventPicture: null,
  });

  // Form verilerini güncelle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Kategori seçimi
  const handleCategoryChange = (e) => {
    setFormData({ ...formData, selectedCategory: e.target.value });
  };

  // Resim dosyasını güncelle
  const handleFileChange = (e) => {
    setFormData({ ...formData, EventPicture: e.target.files[0] });
  };

  // Formu gönder
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form verilerini hazırlayın
    const data = new FormData();
    data.append("EventName", formData.EventName);
    data.append("Description", formData.Description);
    data.append("EventDate", formData.EventDate);
    data.append("EventStartTime", formData.EventStartTime);
    data.append("EventFinishTime", formData.EventFinishTime);
    data.append("Location", formData.Location);
    data.append("CategoryName", formData.selectedCategory); // Seçilen kategori ismi gönderiliyor
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
      }, 3000);
    } catch (error) {
      console.error(
        "Etkinlik oluşturulurken hata oluştu: ",
        error.response?.data || error.message
      );

      toast.error(
        "Etkinlik oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Etkinlik Oluştur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Etkinlik Adı:</label>
          <input
            type="text"
            name="EventName"
            value={formData.EventName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Açıklama:</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tarih:</label>
          <input
            type="date"
            name="EventDate"
            value={formData.EventDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Başlangıç Saati:</label>
          <input
            type="time"
            name="EventStartTime"
            value={formData.EventStartTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Bitiş Saati:</label>
          <input
            type="time"
            name="EventFinishTime"
            value={formData.EventFinishTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lokasyon:</label>
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kategori:</label>
          <div>
            {interestOptions.map((category) => (
              <div key={category}>
                <label>
                  <input
                    type="radio"
                    name="selectedCategory" // Aynı name ile yalnızca bir seçim yapılabilir
                    value={category}
                    checked={formData.selectedCategory === category}
                    onChange={handleCategoryChange}
                  />
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Etkinlik Resmi:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Etkinlik Oluştur</button>
      </form>
    </div>
  );
}

export default AddEventPage;
