import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./EventModal.css";

export default function EventModal({
  open,
  mode = "add",
  onOpenChange,
  onSave,
  onDelete,
  initialEvent,
  position = { x: 0, y: 0 },
}) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("#5A67D8");
  const [errors, setErrors] = useState({ title: "", date: "", time: "" });

  useEffect(() => {
    if (initialEvent) {
      setTitle(initialEvent.title ?? "");
      setDate(initialEvent.date ?? "");
      setTime(initialEvent.time ?? "");
      setColor(initialEvent.color ?? "#5A67D8");
    } else if (open) {
      setTitle("");
      setDate("");
      setTime("");
      setColor("#5A67D8");
    }
    setErrors({ title: "", date: "", time: "" });
  }, [initialEvent, open]);

  const handleSave = () => {
    if (!title.trim()) return setErrors((e) => ({ ...e, title: "Required" }));
    if (!date) return setErrors((e) => ({ ...e, date: "Required" }));
    if (!time) return setErrors((e) => ({ ...e, time: "Required" }));

    onSave({ title: title.trim(), date, time, color });
    onOpenChange(false);
  };

  const handleDiscard = () => {
    if (mode === "edit" && onDelete) onDelete();
    onOpenChange(false);
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Content
          className="event-modal"
          style={{
            top: position.y + 10,
            left: position.x + 10,
            transform: "translate(0, 0)",
            position: "absolute",
          }}
        >
          <button
            className="event-modal__close"
            onClick={() => onOpenChange(false)}
          >
            ✕
          </button>

          <div className="event-modal__form">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={30}
              placeholder="event name"
              className={errors.title ? "event-modal__input--error" : ""}
            />
            {errors.title && (
              <div className="event-modal__error">{errors.title}</div>
            )}

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              className={errors.date ? "event-modal__input--error" : ""}
            />
            {errors.date && (
              <div className="event-modal__error">{errors.date}</div>
            )}

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={errors.time ? "event-modal__input--error" : ""}
            />
            {errors.time && (
              <div className="event-modal__error">{errors.time}</div>
            )}

            <div className="color-field">
              <div className="color-field__wrapper">
                <input
                  type="text"
                  id="colorInput"
                  value={color}
                  readOnly
                  className="color-field__text"
                />
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="color-field__picker"
                />
              </div>
            </div>
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
              disabled={!title || !date || !time}
            >
              {mode === "edit" ? "EDIT" : "ADD"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
