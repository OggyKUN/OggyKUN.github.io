import React, { useEffect, useRef } from "react";
import styles from "./ModalEvent.module.scss";

interface ModalEventProps {
  title?: string;
  date?: string;
  time?: string;
  notes?: string;
  color?: string;
  onDiscard: () => void;
  onEdit: () => void;
  onClose: () => void;
}

export default function ModalEvent({
  title = "",
  date = "",
  time = "",
  notes = "",
  color = "#2f80ed",
  onDiscard,
  onEdit,
  onClose,
}: ModalEventProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateStr: string): string => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const formattedDate = formatDate(date);

  return (
    <div className={styles.modal} ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close modal"
        type="button"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 3L3 9M3 3l6 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className={styles.content}>
        <div className={styles.field}>
          <input
            type="text"
            id="event-title"
            className={styles.input}
            value={title}
            placeholder="Event name"
            readOnly
            aria-label="Event title"
          />
          <div className={styles.divider} />
        </div>

        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="event-date"
              className={styles.input}
              value={formattedDate}
              placeholder="DD/MM/YYYY"
              readOnly
              aria-label="Event date"
            />
            <svg
              className={styles.icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 2.667H4a1.333 1.333 0 0 0-1.333 1.333v9.333c0 .737.596 1.333 1.333 1.333h8c.737 0 1.333-.596 1.333-1.333V4c0-.737-.596-1.333-1.333-1.333zM10.667 2v2.667M5.333 2v2.667M2.667 6.667h10.666"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.divider} />
        </div>

        <div className={styles.field}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="event-time"
              className={styles.input}
              value={time}
              placeholder="event time"
              readOnly
              aria-label="Event time"
            />
            <svg
              className={styles.icon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8 14.667A6.667 6.667 0 1 0 8 1.333a6.667 6.667 0 0 0 0 13.334zM8 5.333v5.334l2.667 1.6"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.divider} />
        </div>

        <div className={styles.field}>
          <input
            type="text"
            id="event-notes"
            className={`${styles.input} ${styles.notesInput}`}
            value={notes}
            placeholder="take my PC with me"
            readOnly
            aria-label="Event notes"
          />
          <div className={styles.divider} />
        </div>

        <div className={styles.field}>
          <div
            className={styles.colorSwatch}
            style={{ backgroundColor: color }}
            aria-label="Event color"
            role="img"
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.discardButton}
            onClick={onDiscard}
            aria-label="Discard changes"
          >
            DISCARD
          </button>
          <button
            type="button"
            className={styles.editButton}
            onClick={onEdit}
            aria-label="Edit event"
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
}

