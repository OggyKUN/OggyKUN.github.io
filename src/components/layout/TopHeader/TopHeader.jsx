import React from "react";
import "./TopHeader.css";

export default function TopHeader() {
  return (
    <header className="top-header">
      <div className="top-header__search">
        <svg
          className="top-header__search-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          type="text"
          className="top-header__search-input"
          placeholder="Search transactions, invoices or help"
        />
      </div>
      <div className="top-header__user">
        <button className="top-header__icon-btn" aria-label="Language">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10 1.667c-2.5 3.333-2.5 6.667 0 10M10 1.667c2.5 3.333 2.5 6.667 0 10M1.667 10h16.666"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
        <button className="top-header__icon-btn" aria-label="Chat">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M17.5 9.583a6.583 6.583 0 0 1-1.25 3.875l2.5 2.5-2.5-2.5a6.667 6.667 0 0 1-11.25-4.875 6.667 6.667 0 0 1 6.667-6.666c3.2 0 5.833 2.633 5.833 6.666Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.833 9.583h.009M10 9.583h.009M14.167 9.583h.009"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="top-header__icon-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M15 6.667a5 5 0 0 0-10 0c0 5.833-2.5 7.5-2.5 7.5h15s-2.5-1.667-2.5-7.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.442 17.5a1.667 1.667 0 0 1-2.884 0"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <div className="top-header__profile">
          <span className="top-header__name">John Doe</span>
          <svg
            className="top-header__arrow"
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3 4.5l3 3 3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="top-header__avatar">
          <img
            src="https://ui-avatars.com/api/?name=John+Doe&background=007bff&color=fff&size=40"
            alt="John Doe"
            className="top-header__avatar-img"
          />
        </div>
      </div>
    </header>
  );
}
