import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiCalendar,
  FiDollarSign,
  FiBarChart2,
  FiAlertCircle,
  FiClock,
  FiTrendingUp,
  FiChevronRight,
  FiRefreshCw,
  FiPieChart,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Dữ liệu tổng quan
  const [dashboardData, setDashboardData] = useState({
    tutorStats: {
      total: 56,
      active: 42,
      pending: 8,
      blocked: 6,
      newThisMonth: 12,
    },
    studentStats: {
      total: 128,
      active: 110,
      blocked: 18,
      newThisMonth: 24,
    },
    scheduleStats: {
      completed: 86,
      upcoming: 42,
      cancelled: 12,
      missed: 5,
    },
    revenueStats: {
      monthlyRevenue: 28500000,
      pendingPayments: 4200000,
      completedPayments: 24300000,
      percentIncrease: 18,
    },
  });

  // Dữ liệu gia sư mới
  const [newTutors, setNewTutors] = useState([
    {
      id: 1,
      name: "Nguyễn Văn Anh",
      subject: "Toán, Lý",
      joinDate: "05/05/2024",
      status: "active",
    },
    {
      id: 2,
      name: "Trần Thị Ngọc Linh",
      subject: "Hóa, Sinh",
      joinDate: "03/05/2024",
      status: "blocked",
    },
    {
      id: 3,
      name: "Lê Văn Cường",
      subject: "Tiếng Anh",
      joinDate: "01/05/2024",
      status: "active",
    },
    {
      id: 4,
      name: "Nguyễn Thị Hương",
      subject: "Văn, Địa",
      joinDate: "30/04/2024",
      status: "active",
    },
    {
      id: 5,
      name: "Phạm Văn Tài",
      subject: "Tin học",
      joinDate: "28/04/2024",
      status: "blocked",
    },
    {
      id: 6,
      name: "Trần Văn Bình",
      subject: "Thể dục",
      joinDate: "26/04/2024",
      status: "active",
    },
  ]);

  // Dữ liệu học sinh mới
  const [newStudents, setNewStudents] = useState([
    {
      id: 1,
      name: "Phạm Thị Dung",
      grade: "Lớp 10",
      joinDate: "04/05/2024",
    },
    {
      id: 2,
      name: "Hoàng Văn Mạnh",
      grade: "Lớp 12",
      joinDate: "02/05/2024",
    },
    {
      id: 3,
      name: "Vũ Thị Mai",
      grade: "Lớp 11",
      joinDate: "01/05/2024",
    },
    {
      id: 4,
      name: "Nguyễn Văn Tùng",
      grade: "Lớp 9",
      joinDate: "30/04/2024",
    },
    {
      id: 5,
      name: "Trần Thị Hương",
      grade: "Lớp 8",
      joinDate: "28/04/2024",
    },
  ]);

  // Dữ liệu vi phạm lịch dạy
  const [scheduleViolations, setScheduleViolations] = useState([
    {
      id: 1,
      tutorName: "Nguyễn Văn Sâm",
      studentName: "Trần Thị Yến",
      scheduledTime: "02/05/2024 15:30",
      reason: "Không tham gia buổi học",
      status: "unresolved",
    },
    {
      id: 2,
      tutorName: "Lê Văn Mạnh",
      studentName: "Phạm Thị Hồng Nhung",
      scheduledTime: "04/05/2024 17:00",
      reason: "Vào trễ hơn 15 phút",
      status: "resolved",
    },
  ]);

  // Dữ liệu thanh toán gần đây
  const [recentPayments, setRecentPayments] = useState([
    {
      id: 1,
      studentName: "Phạm Thị Dung",
      tutorName: "Nguyễn Văn Anh",
      amount: 1200000,
      date: "05/05/2024",
      status: "completed",
    },
    {
      id: 2,
      studentName: "Hoàng Văn Mạnh",
      tutorName: "Lê Văn Cường",
      amount: 800000,
      date: "04/05/2024",
      status: "pending",
    },
  ]);

  useEffect(() => {
    // Kiểm tra xác thực
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");
    // if (!token) {
    //   navigate("/login");
    //   return;
    // }

    // Giả lập tải dữ liệu
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = () => {
    setIsLoading(true);

    // Giả lập API call
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const renderStatsCard = (icon, title, value, detail, color) => {
    return (
      <div className="stats-card">
        <div className={`stats-icon ${color}`}>{icon}</div>
        <div className="stats-info">
          <h3>{title}</h3>
          <p className="stats-value">{value}</p>
          <p className="stats-detail">{detail}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="home-container">
      <Sidebar />
      <Header />

      {/* <header className="header">
        <div className="header-icons">
          <FaBell />
          <RxAvatar />
        </div>
      </header> */}

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Tổng quan hệ thống</h1>
          <button className="refresh-button" onClick={loadDashboardData}>
            <FiRefreshCw />
            Làm mới dữ liệu
          </button>
        </div>
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            <div className="stats-overview">
              {renderStatsCard(
                <FiUserCheck />,
                "Gia sư",
                dashboardData.tutorStats.total,
                <>
                  <span className="highlight">
                    {dashboardData.tutorStats.active}
                  </span>{" "}
                  đang hoạt động
                  <span className="highlight green">
                    {" "}
                    +{dashboardData.tutorStats.newThisMonth}
                  </span>{" "}
                  mới
                </>,
                "primary"
              )}

              {renderStatsCard(
                <FiUsers />,
                "Học sinh",
                dashboardData.studentStats.total,
                <>
                  <span className="highlight">
                    {dashboardData.studentStats.active}
                  </span>{" "}
                  đang hoạt động
                  <span className="highlight green">
                    {" "}
                    +{dashboardData.studentStats.newThisMonth}
                  </span>{" "}
                  mới
                </>,
                "info"
              )}

              {renderStatsCard(
                <FiCalendar />,
                "Buổi học tháng này",
                dashboardData.scheduleStats.completed +
                  dashboardData.scheduleStats.upcoming,
                <>
                  <span className="highlight">
                    {dashboardData.scheduleStats.completed}
                  </span>{" "}
                  đã hoàn thành{" "}
                  <span className="highlight green">
                    +{dashboardData.scheduleStats.upcoming}
                  </span>{" "}
                  sắp tới
                </>,
                "success"
              )}
              {renderStatsCard(
                <FiDollarSign />,
                "Doanh thu tháng",
                formatCurrency(
                  dashboardData.revenueStats.monthlyRevenue
                ).replace("₫", "VNĐ"),
                <>
                  <span className="highlight green">
                    +{dashboardData.revenueStats.percentIncrease}%
                  </span>{" "}
                  so với tháng trước
                </>,
                "warning"
              )}
            </div>
            <div className="dashboard-row">
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>
                    <FiUserCheck /> Gia sư mới
                  </h3>
                  <button
                    className="view-all-button"
                    onClick={() => navigate("/tutors")}
                  >
                    Xem tất cả <FiChevronRight />
                  </button>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Môn dạy</th>
                        <th>Ngày tham gia</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newTutors.slice(0, 3).map((tutor) => (
                        <tr key={tutor.id}>
                          <td>{tutor.name}</td>
                          <td>{tutor.subject}</td>
                          <td>{tutor.joinDate}</td>
                          <td>
                            <span className={`status-badge ${tutor.status}`}>
                              {tutor.status === "active" && "Hoạt động"}
                              {tutor.status === "pending" && "Chờ xác nhận"}
                              {tutor.status === "blocked" && "Đã khóa"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3>
                    <FiUsers /> Học sinh mới
                  </h3>
                  <button
                    className="view-all-button"
                    onClick={() => navigate("/students")}
                  >
                    Xem tất cả <FiChevronRight />
                  </button>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      {" "}
                      <tr>
                        <th>Tên</th>
                        <th>Lớp</th>
                        <th>Ngày tham gia</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newStudents.slice(0, 3).map((student) => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.grade}</td>
                          <td>{student.joinDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="dashboard-row">
              <div className="dashboard-card">
                <div className="card-header">
                  <h3>
                    <FiAlertCircle /> Vi phạm lịch dạy gần đây
                  </h3>
                  <button
                    className="view-all-button"
                    onClick={() => navigate("/schedule")}
                  >
                    Xem tất cả <FiChevronRight />
                  </button>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Gia sư</th>
                        <th>Học sinh</th>
                        <th>Thời gian</th>
                        <th>Lý do</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleViolations.slice(0, 3).map((violation) => (
                        <tr key={violation.id}>
                          <td>{violation.tutorName}</td>
                          <td>{violation.studentName}</td>
                          <td>{violation.scheduledTime}</td>
                          <td>{violation.reason}</td>
                          <td>
                            <span
                              className={`status-badge ${
                                violation.status === "resolved"
                                  ? "active"
                                  : "pending"
                              }`}
                            >
                              {violation.status === "resolved"
                                ? "Đã xử lý"
                                : "Chưa xử lý"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h3>
                    <FiDollarSign /> Thanh toán gần đây
                  </h3>
                  <button
                    className="view-all-button"
                    onClick={() => navigate("/payments")}
                  >
                    Xem tất cả <FiChevronRight />
                  </button>
                </div>
                <div className="card-body">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Học sinh</th>
                        <th>Gia sư</th>
                        <th>Số tiền</th>
                        <th>Ngày</th>
                        <th>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPayments.slice(0, 3).map((payment) => (
                        <tr key={payment.id}>
                          <td>{payment.studentName}</td>
                          <td>{payment.tutorName}</td>
                          <td>{formatCurrency(payment.amount)}</td>
                          <td>{payment.date}</td>
                          <td>
                            <span
                              className={`status-badge ${
                                payment.status === "completed"
                                  ? "active"
                                  : "pending"
                              }`}
                            >
                              {payment.status === "completed"
                                ? "Hoàn thành"
                                : "Chờ xử lý"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
