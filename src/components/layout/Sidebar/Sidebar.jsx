import React from "react";
import "./Sidebar.css";
import HomeIcon from "../../../assets/icons/Home.svg";
import DashboardIcon from "../../../assets/icons/Dashboard.svg";
import InboxIcon from "../../../assets/icons/Inbox.svg";
import ProductsIcon from "../../../assets/icons/Products.svg";
import InvoicesIcon from "../../../assets/icons/Invoices.svg";
import CustomersIcon from "../../../assets/icons/Customers.svg";
import ChatRoomIcon from "../../../assets/icons/ChatRoom.svg";
import CalendarIcon from "../../../assets/icons/Calendar.svg";
import HelpIcon from "../../../assets/icons/Help.svg";
import SettingsIcon from "../../../assets/icons/Settings.svg";

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

const IconWrapper = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="sidebar__icon-img"
    style={{ width: "16px", height: "16px" }}
  />
);

const getIcon = (item) => {
  switch (item) {
    case "Home":
      return <IconWrapper src={HomeIcon} alt="Home" />;
    case "Dashboard":
      return <IconWrapper src={DashboardIcon} alt="Dashboard" />;
    case "Inbox":
      return <IconWrapper src={InboxIcon} alt="Inbox" />;
    case "Products":
      return <IconWrapper src={ProductsIcon} alt="Products" />;
    case "Invoices":
      return <IconWrapper src={InvoicesIcon} alt="Invoices" />;
    case "Customers":
      return <IconWrapper src={CustomersIcon} alt="Customers" />;
    case "Chat Room":
      return <IconWrapper src={ChatRoomIcon} alt="Chat Room" />;
    case "Calendar":
      return <IconWrapper src={CalendarIcon} alt="Calendar" />;
    case "Help Center":
      return <IconWrapper src={HelpIcon} alt="Help Center" />;
    case "Settings":
      return <IconWrapper src={SettingsIcon} alt="Settings" />;
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
