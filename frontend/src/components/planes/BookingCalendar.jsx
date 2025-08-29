import { useState } from "react";
import "./BookingCalendar.css";

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date()); // mes y año que se muestran
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalizamos para comparar solo fechas

  const times = ["10:00 AM", "10:30 AM", "12:00 PM"];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (direction) => {
    const newDate = new Date(year, month + direction, 1);
    setCurrentDate(newDate);
  };

  return (
    <div className="booking-container">
      {/* Panel de información */}
      <div className="info-panel">
        <h2>ChapinFilms - Google</h2>
        <p className="duration">⏱ 20 Mins</p>
        <p className="date">
          📅 {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
        </p>
        <p className="description">
          Agenda tu reunión con nuestro equipo, queremos escuchar tus ideas y proyectos,
          estamos seguros que podremos apoyarte. <b>No importa el tamaño de tu empresa o de tu visión</b>, 
          trabajamos cada presupuesto de forma personalizada.
        </p>
      </div>

      {/* Panel del calendario */}
      <div className="calendar-panel">
        <h3>Select Date & Time</h3>

        <div className="calendar-wrapper">
          {/* Encabezado */}
          <div className="calendar-header">
            <button onClick={() => changeMonth(-1)}>◀</button>
            <p className="month">{monthNames[month]} {year}</p>
            <button onClick={() => changeMonth(1)}>▶</button>
          </div>

          {/* Días */}
          <div className="days">
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const dateObj = new Date(year, month, day);
              const isPast = dateObj < today;

              return (
                <button
                  key={day}
                  disabled={isPast}
                  className={`day-btn 
                    ${selectedDate.toDateString() === dateObj.toDateString() ? "active" : ""} 
                    ${isPast ? "past" : ""}`}
                  onClick={() => !isPast && setSelectedDate(dateObj)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Horarios */}
        <div className="times">
          {times.map((t, idx) => (
            <button
              key={idx}
              className={`time-btn ${selectedTime === t ? "active" : ""}`}
              onClick={() => setSelectedTime(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="timezone">🌍 GMT-06:00 America/Guatemala (CST)</p>
      </div>
    </div>
  );
}
