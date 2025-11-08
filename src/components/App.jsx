import React, { useMemo, useState } from "react";
import "./App.css";
import Calendar from "./calendar/Calendar/Calendar";
import EventModal from "./calendar/EventModal/EventModal";
import Sidebar from "./layout/Sidebar/Sidebar";
import TopHeader from "./layout/TopHeader/TopHeader";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const [events, setEvents] = useState([]);

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    [events]
  );

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setModalMode("add");
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleAddOrEditEvent = (event) => {
    const isoDateTime = `${event.date}T${event.time}`;
    if (modalMode === "edit" && editingEvent) {
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingEvent.id
            ? {
                ...e,
                title: event.title,
                date: isoDateTime,
                color: event.color,
              }
            : e
        )
      );
    } else {
      const id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const newEvent = {
        id,
        title: event.title,
        date: isoDateTime,
        color: event.color,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const handleEventClick = (clickInfo) => {
    const evt = events.find((e) => e.id === clickInfo.id);
    if (!evt) return;
    setEditingEvent(evt);
    setModalMode("edit");
    setSelectedDate(evt.date.slice(0, 10));
    setIsModalOpen(true);
  };

  const handleEventDrop = (dropInfo) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === dropInfo.id ? { ...e, date: dropInfo.dateStr } : e
      )
    );
  };

  return (
    <div className="app-wrapper">
      <TopHeader />
      <div className="app-layout">
        <Sidebar />
        <main className="app-main">
          <header className="app-header">Calendar</header>
          <div className="calendar-container">
            <p className="app-header__subtitle">Calendar View</p>
            <Calendar
              events={sortedEvents}
              onDateClick={handleDateClick}
              onEventClick={handleEventClick}
              onEventDrop={handleEventDrop}
            />
          </div>
        </main>
      </div>

      <EventModal
        open={isModalOpen}
        mode={modalMode}
        onOpenChange={setIsModalOpen}
        onSave={handleAddOrEditEvent}
        onDelete={
          modalMode === "edit" && editingEvent
            ? () => handleDeleteEvent(editingEvent.id)
            : undefined
        }
        initialEvent={
          modalMode === "edit" && editingEvent
            ? {
                title: editingEvent.title,
                date: editingEvent.date.slice(0, 10),
                time: editingEvent.date.slice(11, 16),
                color: editingEvent.color,
              }
            : selectedDate
            ? { title: "", date: selectedDate, time: "", color: "#5A67D8" }
            : undefined
        }
      />
    </div>
  );
}

export default App;
