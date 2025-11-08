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
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const [events, setEvents] = useState([]);

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    [events]
  );

  const handleDateClick = (arg) => {
    const { pageX, pageY } = arg.jsEvent || {};
    setSelectedDate(arg.dateStr);
    setModalMode("add");
    setEditingEvent(null);
    setModalPosition({ x: pageX || 0, y: pageY || 0 });
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

    let position = { x: 0, y: 0 };

    if (clickInfo.jsEvent) {
      position = {
        x: clickInfo.jsEvent.pageX || 0,
        y: clickInfo.jsEvent.pageY || 0,
      };
    } else if (clickInfo.el) {
      const rect = clickInfo.el.getBoundingClientRect();
      position = {
        x: rect.left + window.scrollX,
        y: rect.top + window.scrollY,
      };
    }

    setEditingEvent(evt);
    setModalMode("edit");
    setSelectedDate(evt.date.slice(0, 10));
    setModalPosition(position);
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
        position={modalPosition}
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
