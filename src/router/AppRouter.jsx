import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Tutors from "../pages/Tutors";
import Students from "../pages/Students";
import ScheduleReports from "../pages/ScheduleReports";
// import AppointmentNoti from "../pages/AppointmentNoti";
// import Schedule from "../pages/Schedule";
// import Wallet from "../pages/Wallet";
// import Sessions from "../pages/Sessions";
// import History from "../pages/History";
// import Setting from "../pages/Settings.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* <Route path="/settings" element={<Setting />} /> */}
      {/* <Route path="/history" element={<History />} /> */}
      {/* <Route path="/sessions" element={<Sessions />} /> */}
      <Route path="/schedule" element={<ScheduleReports />} />
      <Route path="/students" element={<Students />} />
      <Route path="/tutors" element={<Tutors />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Welcome />} />
    </Routes>
  );
}
