import React, { useMemo, useState, useEffect } from "react";
import "./App.css";
import Calendar from "./calendar/Calendar/Calendar";
import EventModal from "./calendar/EventModal/EventModal";
import Sidebar from "./layout/Sidebar/Sidebar";
import TopHeader from "./layout/TopHeader/TopHeader";

const STORAGE_KEY = "calendar-events";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedDate, setSelectedDate] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });

  const [events, setEvents] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load events from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error("Failed to save events to localStorage:", error);
    }
  }, [events]);

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
      prev.map((e) => {
        if (e.id !== dropInfo.id) return e;

        let newDate;

        if (dropInfo.start) {
          const year = dropInfo.start.getFullYear();
          const month = String(dropInfo.start.getMonth() + 1).padStart(2, "0");
          const day = String(dropInfo.start.getDate()).padStart(2, "0");
          const hours = String(dropInfo.start.getHours()).padStart(2, "0");
          const minutes = String(dropInfo.start.getMinutes()).padStart(2, "0");
          newDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        } else if (dropInfo.dateStr) {
          if (dropInfo.dateStr.includes("T")) {
            newDate = dropInfo.dateStr.slice(0, 16);
          } else {
            const existingTime = e.date.includes("T")
              ? e.date.split("T")[1].slice(0, 5)
              : "00:00";
            newDate = `${dropInfo.dateStr}T${existingTime}`;
          }
        } else {
          return e;
        }

        return { ...e, date: newDate };
      })
    );
  };

  const handleEventResize = (resizeInfo) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id !== resizeInfo.id) return e;

        const startDate = resizeInfo.start;
        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, "0");
        const day = String(startDate.getDate()).padStart(2, "0");
        const hours = String(startDate.getHours()).padStart(2, "0");
        const minutes = String(startDate.getMinutes()).padStart(2, "0");

        return { ...e, date: `${year}-${month}-${day}T${hours}:${minutes}` };
      })
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
              onEventResize={handleEventResize}
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
