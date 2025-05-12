import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Welcome.css";

export default function Welcome() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="welcome-container">
      <h1>Chào mừng tới với Smart-Tutor</h1>
      <p>
        Đăng nhập tài khoản trung tâm để truy cập vào hệ thống kết nối gia sư
        thông minh
      </p>
      <button className="login-button" onClick={handleLogin}>
        Đăng nhập
      </button>
    </div>
  );
}
