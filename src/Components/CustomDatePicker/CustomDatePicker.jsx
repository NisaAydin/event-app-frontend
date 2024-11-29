/* eslint-disable react/prop-types */
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Varsayılan CSS
import "./CustomDatePicker.css"; // Özel CSS

function CustomDatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (onDateChange) {
      onDateChange(date); // Tarihi üst bileşene gönder
    }
  };

  return (
    <div className="custom-datepicker">
      <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
    </div>
  );
}

export default CustomDatePicker;
