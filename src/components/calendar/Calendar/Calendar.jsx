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
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
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

