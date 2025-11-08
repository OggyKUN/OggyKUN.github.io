import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

const getTextColor = (backgroundColor) => {
  if (!backgroundColor) return "#FFFFFF";

  const hex = backgroundColor.replace("#", "");

  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export default function Calendar({
  events,
  onDateClick,
  onEventClick,
  onEventDrop,
  onEventResize,
}) {
  const calendarRef = useRef(null);

  useEffect(() => {
    const disableAgendaButton = () => {
      const agendaButton = document.querySelector(".fc-listWeek-button");
      if (agendaButton) {
        agendaButton.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });
        agendaButton.style.pointerEvents = "none";
        agendaButton.style.opacity = "0.5";
        agendaButton.style.cursor = "not-allowed";
      }
    };
    const timer = setTimeout(disableAgendaButton, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleDateClick = (arg) => {
    if (onDateClick) {
      onDateClick(arg);
    }
  };

  const handleEventDidMount = (info) => {
    const originalEvent = events.find((e) => e.id === info.event.id);
    const eventColor = originalEvent?.color || "#5A67D8";
    const textColor = getTextColor(eventColor);

    info.el.style.backgroundColor = eventColor;
    info.el.style.borderColor = eventColor;
    info.el.style.color = textColor;
  };

  const handleDatesSet = () => {
    const agendaButton = document.querySelector(".fc-listWeek-button");
    if (agendaButton) {
      agendaButton.style.pointerEvents = "none";
      agendaButton.style.opacity = "0.5";
      agendaButton.style.cursor = "not-allowed";
    }
  };

  return (
    <FullCalendar
      ref={calendarRef}
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
      events={events.map((e) => {
        const eventColor = e.color || "#5A67D8";
        return {
          id: e.id,
          title: e.title,
          start: e.date,
          backgroundColor: eventColor,
          borderColor: eventColor,
          textColor: getTextColor(eventColor),
        };
      })}
      eventDidMount={handleEventDidMount}
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
      eventResize={(info) =>
        onEventResize &&
        onEventResize({
          id: info.event.id,
          start: info.event.start,
        })
      }
      datesSet={handleDatesSet}
    />
  );
}
