import React from "react";
import "./Sidebar.css";

const menuItems = [
  "Home",
  "Dashboard",
  "Inbox",
  "Products",
  "Invoices",
  "Customers",
  "Chat Room",
  "Calendar",
  "Help Center",
  "Settings",
];

const getIcon = (item) => {
  const iconStyle = { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none" };
  switch (item) {
    case "Home":
      return (
        <svg {...iconStyle}>
          <path
            d="M3.333 10l6.667-6.667L16.667 10M5 8.333v6.667c0 .92.746 1.667 1.667 1.667h2.5V12.5h1.666v4.167h2.5c.92 0 1.667-.746 1.667-1.667V8.333"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Dashboard":
      return (
        <svg {...iconStyle}>
          <path
            d="M3.333 3.333h6.667v6.667H3.333V3.333zM10 3.333h6.667v4.167H10V3.333zM3.333 12.5h6.667v4.167H3.333V12.5zM10 10h6.667v6.667H10V10z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Inbox":
      return (
        <svg {...iconStyle}>
          <path
            d="M3.333 5h13.334M3.333 5l2.5 6.667h8.334l2.5-6.667M3.333 5v10c0 .92.746 1.667 1.667 1.667h10c.92 0 1.667-.746 1.667-1.667V5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Products":
      return (
        <svg {...iconStyle}>
          <path
            d="M5 5h10M5 5v10c0 .92.746 1.667 1.667 1.667h6.666c.92 0 1.667-.746 1.667-1.667V5M5 5l2.5-2.5h5l2.5 2.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Invoices":
      return (
        <svg {...iconStyle}>
          <path
            d="M3.333 3.333h13.334v13.334H3.333V3.333zM5 6.667h10M5 10h10M5 13.333h6.667"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Customers":
      return (
        <svg {...iconStyle}>
          <path
            d="M10 10a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667zM16.667 15c0-2.5-2.985-4.167-6.667-4.167S3.333 12.5 3.333 15v1.667h13.334V15z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Chat Room":
      return (
        <svg {...iconStyle}>
          <path
            d="M17.5 9.583a6.583 6.583 0 0 1-1.25 3.875l2.5 2.5-2.5-2.5a6.667 6.667 0 0 1-11.25-4.875 6.667 6.667 0 0 1 6.667-6.666c3.2 0 5.833 2.633 5.833 6.666Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Calendar":
      return (
        <svg {...iconStyle}>
          <path
            d="M15 3.333H5a1.667 1.667 0 0 0-1.667 1.667v11.667c0 .92.746 1.667 1.667 1.667h10c.92 0 1.667-.746 1.667-1.667V5c0-.92-.746-1.667-1.667-1.667zM13.333 1.667v3.333M6.667 1.667v3.333M3.333 8.333h13.334"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Help Center":
      return (
        <svg {...iconStyle}>
          <path
            d="M10 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666zM10 14.167v.833M10 10a2.5 2.5 0 0 1 2.5-2.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "Settings":
      return (
        <svg {...iconStyle}>
          <path
            d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM16.667 12.5a1.458 1.458 0 0 0 .3 1.608l.058.059a1.767 1.767 0 0 1 0 2.5l-.7.7a1.767 1.767 0 0 1-2.5 0l-.058-.058a1.767 1.767 0 0 0-1.608-.3 1.767 1.767 0 0 0-1.042 1.042 1.767 1.767 0 0 1-1.608.3l-.059.058a1.767 1.767 0 0 1-2.5 0l-.7-.7a1.767 1.767 0 0 1 0-2.5l.058-.059a1.767 1.767 0 0 0 .3-1.608 1.767 1.767 0 0 0-1.042-1.042 1.767 1.767 0 0 1-.3-1.608l-.058-.059a1.767 1.767 0 0 1 0-2.5l.7-.7a1.767 1.767 0 0 1 2.5 0l.059.058a1.767 1.767 0 0 0 1.608.3h.083a1.767 1.767 0 0 0 1.042-1.042 1.767 1.767 0 0 1 .3-1.608l.058-.059a1.767 1.767 0 0 1 2.5 0l.7.7a1.767 1.767 0 0 1 0 2.5l-.059.058a1.767 1.767 0 0 0-.3 1.608v.083a1.767 1.767 0 0 0 1.042 1.042 1.767 1.767 0 0 1 1.608.3l.059.058z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">IMPEKABLE</div>
      <nav className="sidebar__nav">
        <ul className="sidebar__menu">
          {menuItems.map((item) => (
            <li key={item} className="sidebar__menu-item">
              <a
                href="#"
                className={`sidebar__link ${
                  item === "Calendar" ? "sidebar__link--active" : ""
                }`}
                onClick={(e) => e.preventDefault()}
              >
                <span className="sidebar__icon">{getIcon(item)}</span>
                <span className="sidebar__text">{item}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

