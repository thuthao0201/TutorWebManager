import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiCalendar,
  FiCreditCard,
  FiMessageCircle,
  FiFileText,
  FiSettings,
} from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Trang chủ",
      icon: <FiHome />,
      path: "/home",
    },
    {
      name: "Gia sư",
      icon: <MdAssignmentInd />,
      path: "/tutors",
    },
    {
      name: "Học sinh",
      icon: <FiUsers />,
      path: "/students",
    },
    {
      name: "Lịch dạy",
      icon: <FiCalendar />,
      path: "/schedule",
    },
    {
      name: "Thanh toán",
      icon: <FiCreditCard />,
      path: "/payments",
    },
    {
      name: "Tin nhắn",
      icon: <FiMessageCircle />,
      path: "/messages",
    },
    {
      name: "Báo cáo",
      icon: <FiFileText />,
      path: "/reports",
    },
  ];

  const bottomMenuItems = [
    {
      name: "Cài đặt",
      icon: <FiSettings />,
      path: "/settings",
    },
    // {
    //   name: "Trợ giúp",
    //   icon: <FiHelpCircle />,
    //   path: "/help",
    // },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <nav className="sidebar-menu">
          <ul className="menu-list">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`menu-item ${isActive(item.path) ? "active" : ""}`}
              >
                <Link to={item.path} className="menu-link">
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        <ul className="menu-list">
          {bottomMenuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              <Link to={item.path} className="menu-link">
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
