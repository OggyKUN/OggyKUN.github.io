import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

export default function Calendar({
  events,
  onDateClick,
  onEventClick,
  onEventDrop,
}) {
  const handleDateClick = (arg) => {
    if (onDateClick) {
      onDateClick(arg);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      expandRows={true}
      slotDuration="02:00:00"
      slotLabelInterval="02:00"
      slotMinTime="00:00:00"
      slotMaxTime="24:00:00"
      allDaySlot={false}
      headerToolbar={{
        start: "today,prev,next",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
      }}
      buttonText={{
        today: "Today",
        month: "Month",
        week: "Week",
        day: "Day",
        list: "Agenda",
        prev: "Back",
        next: "Next",
      }}
      events={events.map((e) => ({
        id: e.id,
        title: e.title,
        start: e.date,
        backgroundColor: e.color,
        borderColor: e.color,
      }))}
      editable={true}
      selectable={true}
      dateClick={handleDateClick}
      eventClick={(info) =>
        onEventClick &&
        onEventClick({
          id: info.event.id,
          jsEvent: info.jsEvent,
          el: info.el,
        })
      }
      eventDrop={(info) =>
        onEventDrop &&
        onEventDrop({ id: info.event.id, dateStr: info.event.startStr })
      }
    />
  );
}
