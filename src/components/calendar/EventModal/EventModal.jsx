import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./EventModal.css";

// Date formatting utilities
const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr + "T00:00:00");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const parseDateFromDisplay = (displayDate) => {
  if (!displayDate) return "";
  const parts = displayDate.split(".");
  if (parts.length !== 3) return "";
  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
};

export default function EventModal({
  open,
  mode = "add",
  onOpenChange,
  onSave,
  onDelete,
  initialEvent,
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [dateDisplay, setDateDisplay] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("#5A67D8");
  const [errors, setErrors] = useState({
    title: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title ?? "");
      setDate(initialEvent.date ?? "");
      setDateDisplay(
        initialEvent.date ? formatDateForDisplay(initialEvent.date) : ""
      );
      setTime(initialEvent.time ?? "");
      setColor(initialEvent.color ?? "#5A67D8");
      setErrors({ title: "", date: "", time: "" });
    } else if (open && mode === "add") {
      setTitle("");
      setDate("");
      setDateDisplay("");
      setTime("");
      setColor("#5A67D8");
      setErrors({ title: "", date: "", time: "" });
    }
  }, [initialEvent, open, mode]);

  const validateTitle = () => {
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Title is required" }));
      return false;
    }
    if (title.length > 30) {
      setErrors((prev) => ({
        ...prev,
        title: "Title must be 30 characters or less",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, title: "" }));
    return true;
  };

  const validateDate = () => {
    if (!date) {
      setErrors((prev) => ({ ...prev, date: "Date is required" }));
      return false;
    }
    const selectedDate = new Date(date + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setErrors((prev) => ({
        ...prev,
        date: "Date cannot be in the past",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, date: "" }));
    return true;
  };

  const validateTime = () => {
    if (!time) {
      setErrors((prev) => ({ ...prev, time: "Time is required" }));
      return false;
    }
    setErrors((prev) => ({ ...prev, time: "" }));
    return true;
  };

  const validateAll = () => {
    const titleValid = validateTitle();
    const dateValid = validateDate();
    const timeValid = validateTime();
    return titleValid && dateValid && timeValid;
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors((prev) => ({ ...prev, title: "" }));
    }
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    setDateDisplay(formatDateForDisplay(newDate));
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: "" }));
    }
  };

  const handleDateDisplayChange = (e) => {
    const displayValue = e.target.value;
    setDateDisplay(displayValue);
    const parsed = parseDateFromDisplay(displayValue);
    if (parsed) {
      setDate(parsed);
      if (errors.date) {
        setErrors((prev) => ({ ...prev, date: "" }));
      }
    }
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: "" }));
    }
  };

  const handleSave = () => {
    if (validateAll()) {
      onSave({ title: title.trim(), date, time, color });
      onOpenChange(false);
    }
  };

  const handleDiscard = () => {
    if (mode === "edit" && onDelete) {
      onDelete();
    }
    onOpenChange(false);
  };

  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const canSave =
    title.trim().length > 0 &&
    date &&
    time &&
    !errors.title &&
    !errors.date &&
    !errors.time;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="event-modal__overlay" />
        <Dialog.Content className="event-modal__content">
          <Dialog.Close className="event-modal__close" aria-label="Close">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4l8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Dialog.Close>
          <Dialog.Title className="event-modal__title">
            {mode === "edit" ? "Edit Event" : "Add Event"}
          </Dialog.Title>

          <div className="event-modal__form">
            <label>
              Title
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Event name"
                maxLength={30}
                className={errors.title ? "event-modal__input--error" : ""}
              />
              <div className="event-modal__counter">{title.length}/30</div>
              {errors.title && (
                <div className="event-modal__error">{errors.title}</div>
              )}
            </label>

            <label>
              Date
              <div className="event-modal__input-wrapper">
                <input
                  type="text"
                  value={dateDisplay}
                  onChange={handleDateDisplayChange}
                  placeholder="DD.MM.YYYY"
                  className={errors.date ? "event-modal__input--error" : ""}
                />
                <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  min={getMinDate()}
                  className="event-modal__date-picker"
                  tabIndex={-1}
                />
                <svg
                  className="event-modal__icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  onClick={() => {
                    const dateInput = document.querySelector(
                      ".event-modal__date-picker"
                    );
                    if (dateInput) {
                      if (typeof dateInput.showPicker === "function") {
                        dateInput.showPicker();
                      } else {
                        dateInput.click();
                      }
                    }
                  }}
                >
                  <path
                    d="M15 3.333H5a1.667 1.667 0 0 0-1.667 1.667v11.667c0 .92.746 1.667 1.667 1.667h10c.92 0 1.667-.746 1.667-1.667V5c0-.92-.746-1.667-1.667-1.667zM13.333 1.667v3.333M6.667 1.667v3.333M3.333 8.333h13.334"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {errors.date && (
                <div className="event-modal__error">{errors.date}</div>
              )}
            </label>

            <label>
              Time
              <div className="event-modal__input-wrapper">
                <input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  placeholder="--:--"
                  className={errors.time ? "event-modal__input--error" : ""}
                />
                <svg
                  className="event-modal__icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666zM10 6.667v5l3.333 2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              {errors.time && (
                <div className="event-modal__error">{errors.time}</div>
              )}
            </label>

            <label>
              Color
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
          </div>

          <div className="event-modal__actions">
            <button
              className="event-modal__btn event-modal__btn--discard"
              onClick={handleDiscard}
            >
              DISCARD
            </button>
            <button
              className="event-modal__btn event-modal__btn--add"
              onClick={handleSave}
              disabled={!canSave}
            >
              {mode === "edit" ? "EDIT" : "ADD"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

