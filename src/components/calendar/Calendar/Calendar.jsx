import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import React from "react";

export default function Calendar({
  events,
  onDateClick,
  onEventClick,
  onEventDrop,
}) {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        center: "",
        right: "today,prev,next title",
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
      dateClick={(arg) => onDateClick({ dateStr: arg.dateStr })}
      eventClick={(info) => onEventClick({ id: info.event.id })}
      eventDrop={(info) =>
        onEventDrop({ id: info.event.id, dateStr: info.event.startStr })
      }
    />
  );
}
