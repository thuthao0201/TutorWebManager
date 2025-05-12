import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FiUser, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
// import logo from "../assets/react.svg"; // Thay đổi đường dẫn logo nếu cần

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin đăng nhập");
      return;
    }

    // try {
    //   setIsLoading(true);
    //   setError("");

    //   await new Promise((resolve) => setTimeout(resolve, 1500));

    //   if (email === "admin@smarttutor.com" && password === "admin123") {
    //     if (rememberMe) {
    //       localStorage.setItem("adminToken", "sample-token-value");
    //     } else {
    //       sessionStorage.setItem("adminToken", "sample-token-value");
    //     }

    navigate("/home");
    //       } else {
    //         setError("Email hoặc mật khẩu không chính xác");
    //       }
    //     } catch (err) {
    //       setError(
    //         "Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại sau."
    //       );
    //       console.error("Login error:", err);
    //     } finally {
    //       setIsLoading(false);
    //     }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="login-form-container">
          <div className="login-logo">
            {/* <img src={logo} alt="Smart Tutor Logo" /> */}
            <h1>SMART TUTOR</h1>
            <h2>Hệ Thống Quản Lý Trung Tâm</h2>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <h3>Đăng nhập bằng tài khoản quản trị viên</h3>

            {error && (
              <div className="error-message">
                <FiAlertCircle />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <p> Email</p>
              <div className="input-container">
                {/* <FiUser className="input-icon" /> */}
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Nhập email của bạn"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <p> Mật khẩu</p>

              <div className="input-container">
                {/* <FiLock className="input-icon" /> */}
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu của bạn"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
              </div>
              <a href="#" className="forgot-password">
                Quên mật khẩu?
              </a>
            </div>

            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
