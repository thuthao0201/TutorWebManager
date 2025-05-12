import React from "react";
import { FaBell } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import "./styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <h1>Smart-Tutor</h1>

      <div className="header-icons">
        <FaBell />
        <RxAvatar />
      </div>
    </header>
  );
}
