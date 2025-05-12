import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiAlertCircle,
  FiCheck,
  FiX,
  FiEye,
  FiChevronDown,
  FiCalendar,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/ScheduleReports.css";

export default function ScheduleReports() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolution, setResolution] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "reportDate",
    direction: "desc",
  });

  useEffect(() => {
    // Kiểm tra xác thực
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");
    // if (!token) {
    //   navigate("/login");
    //   return;
    // }

    loadReportsData();
  }, [navigate]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, statusFilter, dateRangeFilter, typeFilter, reports]);

  const loadReportsData = () => {
    setIsLoading(true);

    // Giả lập API call
    setTimeout(() => {
      // Mock data cho báo cáo vi phạm lịch dạy
      const mockReports = [
        {
          id: 1,
          reportType: "absence",
          tutorName: "Nguyễn Văn Anh",
          tutorId: 101,
          studentName: "Trần Thị B",
          studentId: 201,
          scheduledTime: "2024-05-02T15:30:00",
          reportDate: "2024-05-02T16:00:00",
          reportedBy: "student",
          reason: "Gia sư không tham gia buổi học đúng giờ",
          details:
            "Tôi đã đợi 30 phút nhưng gia sư không xuất hiện và không có thông báo gì.",
          status: "pending",
          resolution: "",
          resolvedDate: null,
          resolvedBy: null,
        },
        {
          id: 2,
          reportType: "late",
          tutorName: "Lê Văn C",
          tutorId: 102,
          studentName: "Phạm Thị Dung",
          studentId: 202,
          scheduledTime: "2024-05-04T17:00:00",
          reportDate: "2024-05-04T17:20:00",
          reportedBy: "student",
          reason: "Gia sư vào trễ hơn 15 phút",
          details:
            "Gia sư vào trễ 20 phút, không thông báo trước, làm mất thời gian học.",
          status: "resolved",
          resolution:
            "Đã liên hệ với gia sư và nhắc nhở về việc đúng giờ. Gia sư đã xin lỗi và cam kết không tái phạm. Đã hoàn trả 50% phí buổi học cho học sinh.",
          resolvedDate: "2024-05-05T10:15:00",
          resolvedBy: "Admin001",
        },
        {
          id: 3,
          reportType: "quality",
          tutorName: "Hoàng Văn Mạnh",
          tutorId: 103,
          studentName: "Mai Thị F",
          studentId: 203,
          scheduledTime: "2024-05-03T18:00:00",
          reportDate: "2024-05-03T19:30:00",
          reportedBy: "student",
          reason: "Chất lượng dạy không đạt yêu cầu",
          details:
            "Gia sư không chuẩn bị bài giảng, dạy không theo chương trình đã thỏa thuận trước.",
          status: "investigating",
          resolution: "",
          resolvedDate: null,
          resolvedBy: null,
        },
        {
          id: 4,
          reportType: "absence",
          tutorName: "Nguyễn Thị Bích Ngọc",
          tutorId: 104,
          studentName: "Trần Văn H",
          studentId: 204,
          scheduledTime: "2024-05-01T09:00:00",
          reportDate: "2024-05-01T09:35:00",
          reportedBy: "student",
          reason: "Gia sư không tham gia buổi học",
          details:
            "Đã đợi 30 phút nhưng gia sư không xuất hiện và không liên lạc được.",
          status: "resolved",
          resolution:
            "Đã hoàn tiền cho học sinh và cảnh cáo gia sư. Gia sư giải thích có vấn đề đột xuất về sức khỏe và đã cam kết thông báo trước trong các trường hợp tương tự.",
          resolvedDate: "2024-05-02T11:20:00",
          resolvedBy: "Admin002",
        },
        {
          id: 5,
          reportType: "behavior",
          tutorName: "Lê Thị NGọc Nhi",
          tutorId: 105,
          studentName: "Phạm Văn K",
          studentId: 205,
          scheduledTime: "2024-04-30T14:00:00",
          reportDate: "2024-04-30T15:15:00",
          reportedBy: "student",
          reason: "Gia sư có thái độ không tôn trọng",
          details:
            "Gia sư nói chuyện thiếu tôn trọng, có lời lẽ khiếm nhã trong buổi học.",
          status: "investigating",
          resolution: "",
          resolvedDate: null,
          resolvedBy: null,
        },
        {
          id: 6,
          reportType: "absence",
          tutorName: "Trần Văn Lợi",
          tutorId: 106,
          studentName: "Nguyễn Thị M",
          studentId: 206,
          scheduledTime: "2024-05-05T10:00:00",
          reportDate: "2024-05-05T10:40:00",
          reportedBy: "tutor",
          reason: "Học sinh không tham gia buổi học",
          details:
            "Học sinh không tham gia buổi học đã hẹn và không có thông báo trước.",
          status: "pending",
          resolution: "",
          resolvedDate: null,
          resolvedBy: null,
        },
        {
          id: 7,
          reportType: "technical",
          tutorName: "Phạm Minh Tuấn",
          tutorId: 107,
          studentName: "Lê Thị O",
          studentId: 207,
          scheduledTime: "2024-05-04T13:00:00",
          reportDate: "2024-05-04T13:45:00",
          reportedBy: "both",
          reason: "Sự cố kỹ thuật trong buổi học",
          details:
            "Gặp vấn đề về kết nối internet khiến buổi học bị gián đoạn nhiều lần.",
          status: "resolved",
          resolution:
            "Đã sắp xếp thời gian học bù cho học sinh. Đã hướng dẫn cả hai bên về cách khắc phục sự cố kỹ thuật.",
          resolvedDate: "2024-05-05T09:30:00",
          resolvedBy: "Admin001",
        },
        {
          id: 8,
          reportType: "quality",
          tutorName: "Mai Văn Phương",
          tutorId: 108,
          studentName: "Hoàng Thị Q",
          studentId: 208,
          scheduledTime: "2024-05-03T16:00:00",
          reportDate: "2024-05-03T17:30:00",
          reportedBy: "student",
          reason: "Nội dung dạy không đúng với mô tả",
          details:
            "Gia sư dạy không đúng với nội dung đã thỏa thuận, không giúp học sinh cải thiện kiến thức môn học.",
          status: "pending",
          resolution: "",
          resolvedDate: null,
          resolvedBy: null,
        },
        {
          id: 9,
          reportType: "behavior",
          tutorName: "Trần Thị Diệp",
          tutorId: 109,
          studentName: "Phạm Văn S",
          studentId: 209,
          scheduledTime: "2024-04-29T11:00:00",
          reportDate: "2024-04-29T12:15:00",
          reportedBy: "tutor",
          reason: "Học sinh có hành vi không phù hợp",
          details:
            "Học sinh không tập trung học, thường xuyên rời khỏi máy và có thái độ thiếu tôn trọng.",
          status: "resolved",
          resolution:
            "Đã liên hệ với phụ huynh và học sinh để nhắc nhở về quy tắc ứng xử trong giờ học. Học sinh đã cam kết cải thiện.",
          resolvedDate: "2024-04-30T14:20:00",
          resolvedBy: "Admin003",
        },
        {
          id: 10,
          reportType: "late",
          tutorName: "Nguyễn Văn Tài",
          tutorId: 110,
          studentName: "Lê Thị U",
          studentId: 210,
          scheduledTime: "2024-05-06T19:00:00",
          reportDate: "2024-05-06T19:25:00",
          reportedBy: "student",
          reason: "Gia sư vào muộn 20 phút",
          details:
            "Gia sư vào trễ 20 phút không thông báo trước, làm mất thời gian học của học sinh.",
          status: "investigating",
          resolution: "",
          resolvedDate: null,
          resolvedBy: null,
        },
      ];

      setReports(mockReports);
      setFilteredReports(mockReports);
      setIsLoading(false);
    }, 800);
  };

  const applyFilters = () => {
    let result = [...reports];

    // Filter by search term
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(
        (report) =>
          report.tutorName.toLowerCase().includes(search) ||
          report.studentName.toLowerCase().includes(search) ||
          report.reason.toLowerCase().includes(search) ||
          report.id.toString().includes(search)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((report) => report.status === statusFilter);
    }

    // Filter by report type
    if (typeFilter !== "all") {
      result = result.filter((report) => report.reportType === typeFilter);
    }

    // Filter by date range
    if (dateRangeFilter !== "all") {
      const now = new Date();
      let startDate;

      switch (dateRangeFilter) {
        case "today":
          startDate = new Date(now.setHours(0, 0, 0, 0));
          break;
        case "week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        default:
          startDate = null;
      }

      if (startDate) {
        result = result.filter(
          (report) => new Date(report.reportDate) >= startDate
        );
      }
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredReports(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleResolveReport = () => {
    if (!selectedReport || !resolution.trim()) return;

    // Giả lập API call
    setIsLoading(true);
    setTimeout(() => {
      const updatedReports = reports.map((report) => {
        if (report.id === selectedReport.id) {
          return {
            ...report,
            status: "resolved",
            resolution: resolution,
            resolvedDate: new Date().toISOString(),
            resolvedBy: "Admin001", // Normally would be the current user
          };
        }
        return report;
      });

      setReports(updatedReports);
      applyFilters();
      setShowResolveModal(false);
      setSelectedReport(null);
      setResolution("");
      setIsLoading(false);
    }, 800);
  };

  const handleInvestigateReport = (report) => {
    // Giả lập API call
    setIsLoading(true);
    setTimeout(() => {
      const updatedReports = reports.map((r) => {
        if (r.id === report.id) {
          return {
            ...r,
            status: "investigating",
          };
        }
        return r;
      });

      setReports(updatedReports);
      applyFilters();
      setIsLoading(false);
    }, 800);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateTimeString).toLocaleString("vi-VN", options);
  };

  const getReportTypeLabel = (type) => {
    const types = {
      absence: "Vắng mặt",
      late: "Đi trễ",
      quality: "Chất lượng giảng dạy",
      behavior: "Hành vi không phù hợp",
      technical: "Sự cố kỹ thuật",
      other: "Khác",
    };
    return types[type] || type;
  };

  const getStatusLabel = (status) => {
    const statuses = {
      pending: "Chờ xử lý",
      investigating: "Đang điều tra",
      resolved: "Đã xử lý",
    };
    return statuses[status] || status;
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: "pending",
      investigating: "investigating",
      resolved: "active",
    };
    return classes[status] || "";
  };

  const getReporterLabel = (reporter) => {
    const reporters = {
      student: "Học sinh",
      tutor: "Gia sư",
      both: "Cả hai bên",
      admin: "Quản trị viên",
    };
    return reporters[reporter] || reporter;
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="schedule-reports-container">
      <Sidebar />
      <Header />

      <div className="schedule-reports-content">
        <div className="schedule-reports-header">
          <h1>
            <FiAlertCircle /> Quản lý báo cáo vi phạm lịch dạy
          </h1>
          <button className="refresh-button" onClick={loadReportsData}>
            <FiRefreshCw />
            Làm mới dữ liệu
          </button>
        </div>

        <div className="reports-filters">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, lý do báo cáo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <div className="filter-item">
              <FiFilter />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="pending">Chờ xử lý</option>
                <option value="investigating">Đang điều tra</option>
                <option value="resolved">Đã xử lý</option>
              </select>
            </div>
            <div className="filter-item">
              <FiCalendar />
              <select
                value={dateRangeFilter}
                onChange={(e) => setDateRangeFilter(e.target.value)}
              >
                <option value="all">Tất cả thời gian</option>
                <option value="today">Hôm nay</option>
                <option value="week">7 ngày gần đây</option>
                <option value="month">30 ngày gần đây</option>
              </select>
            </div>
            <div className="filter-item">
              <FiChevronDown />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Tất cả loại báo cáo</option>
                <option value="absence">Vắng mặt</option>
                <option value="late">Đi trễ</option>
                <option value="quality">Chất lượng giảng dạy</option>
                <option value="behavior">Hành vi không phù hợp</option>
                <option value="technical">Sự cố kỹ thuật</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="reports-table-container">
            <table className="reports-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("id")}>ID</th>
                  <th onClick={() => handleSort("reportType")}>Loại báo cáo</th>
                  <th onClick={() => handleSort("tutorName")}>Gia sư</th>
                  <th onClick={() => handleSort("studentName")}>Học sinh</th>
                  <th onClick={() => handleSort("scheduledTime")}>
                    Thời gian lịch học
                  </th>
                  <th onClick={() => handleSort("reportDate")}>Ngày báo cáo</th>
                  <th onClick={() => handleSort("reportedBy")}>
                    Người báo cáo
                  </th>
                  <th onClick={() => handleSort("status")}>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((report) => (
                    <tr key={report.id}>
                      <td>{report.id}</td>
                      <td>{getReportTypeLabel(report.reportType)}</td>
                      <td>{report.tutorName}</td>
                      <td>{report.studentName}</td>
                      <td>{formatDateTime(report.scheduledTime)}</td>
                      <td>{formatDateTime(report.reportDate)}</td>
                      <td>{getReporterLabel(report.reportedBy)}</td>
                      <td>
                        <span
                          className={`status-badge ${getStatusBadgeClass(
                            report.status
                          )}`}
                        >
                          {getStatusLabel(report.status)}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="view-button"
                            onClick={() => {
                              setSelectedReport(report);
                              setShowDetailsModal(true);
                            }}
                            title="Xem chi tiết"
                          >
                            <FiEye />
                          </button>

                          {report.status === "pending" && (
                            <button
                              className="investigate-button"
                              onClick={() => handleInvestigateReport(report)}
                              title="Bắt đầu điều tra"
                            >
                              <FiSearch />
                            </button>
                          )}

                          {(report.status === "pending" ||
                            report.status === "investigating") && (
                            <button
                              className="resolve-button"
                              onClick={() => {
                                setSelectedReport(report);
                                setShowResolveModal(true);
                              }}
                              title="Xử lý báo cáo"
                            >
                              <FiCheck />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="no-data">
                      Không tìm thấy báo cáo nào phù hợp với điều kiện lọc
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {filteredReports.length > itemsPerPage && (
              <div className="pagination">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="page-button"
                >
                  &laquo;
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`page-button ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="page-button"
                >
                  &raquo;
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Xem chi tiết báo cáo */}
      {showDetailsModal && selectedReport && (
        <div className="modal-overlay">
          <div className="report-details-modal">
            <div className="modal-header">
              <h3>Chi tiết báo cáo #{selectedReport.id}</h3>
              <button
                className="close-button"
                onClick={() => setShowDetailsModal(false)}
              >
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="detail-row">
                <div className="detail-label">Trạng thái:</div>
                <div className="detail-value">
                  <span
                    className={`status-badge ${getStatusBadgeClass(
                      selectedReport.status
                    )}`}
                  >
                    {getStatusLabel(selectedReport.status)}
                  </span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Loại báo cáo:</div>
                <div className="detail-value">
                  {getReportTypeLabel(selectedReport.reportType)}
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Gia sư:</div>
                <div className="detail-value">
                  {selectedReport.tutorName} (ID: {selectedReport.tutorId})
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Học sinh:</div>
                <div className="detail-value">
                  {selectedReport.studentName} (ID: {selectedReport.studentId})
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Thời gian lịch học:</div>
                <div className="detail-value">
                  {formatDateTime(selectedReport.scheduledTime)}
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Ngày báo cáo:</div>
                <div className="detail-value">
                  {formatDateTime(selectedReport.reportDate)}
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Người báo cáo:</div>
                <div className="detail-value">
                  {getReporterLabel(selectedReport.reportedBy)}
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-label">Lý do báo cáo:</div>
                <div className="detail-value">{selectedReport.reason}</div>
              </div>

              <div className="detail-section">
                <div className="detail-label">Chi tiết báo cáo:</div>
                <div className="detail-value detail-text">
                  {selectedReport.details}
                </div>
              </div>

              {selectedReport.status === "resolved" && (
                <>
                  <div className="detail-section">
                    <div className="detail-label">Cách giải quyết:</div>
                    <div className="detail-value detail-text">
                      {selectedReport.resolution}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Ngày giải quyết:</div>
                    <div className="detail-value">
                      {formatDateTime(selectedReport.resolvedDate)}
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-label">Người xử lý:</div>
                    <div className="detail-value">
                      {selectedReport.resolvedBy}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                className="close-modal-button"
                onClick={() => setShowDetailsModal(false)}
              >
                Đóng
              </button>

              {(selectedReport.status === "pending" ||
                selectedReport.status === "investigating") && (
                <button
                  className="resolve-modal-button"
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowResolveModal(true);
                  }}
                >
                  Xử lý báo cáo
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Xử lý báo cáo */}
      {showResolveModal && selectedReport && (
        <div className="modal-overlay">
          <div className="resolve-report-modal">
            <div className="modal-header">
              <h3>Xử lý báo cáo #{selectedReport.id}</h3>
              <button
                className="close-button"
                onClick={() => setShowResolveModal(false)}
                disabled={isLoading}
              >
                <FiX />
              </button>
            </div>
            <div className="modal-body">
              <div className="report-summary">
                <p>
                  <strong>Loại báo cáo:</strong>{" "}
                  {getReportTypeLabel(selectedReport.reportType)}
                </p>
                <p>
                  <strong>Gia sư:</strong> {selectedReport.tutorName}
                </p>
                <p>
                  <strong>Học sinh:</strong> {selectedReport.studentName}
                </p>
                <p>
                  <strong>Lý do báo cáo:</strong> {selectedReport.reason}
                </p>
              </div>

              <div className="form-group resolution-input">
                <label>Cách giải quyết:</label>
                <textarea
                  value={resolution}
                  onChange={(e) => setResolution(e.target.value)}
                  rows={5}
                  placeholder="Nhập biện pháp xử lý báo cáo này..."
                  disabled={isLoading}
                />
                {resolution.trim() === "" && (
                  <p className="error-message">Vui lòng nhập cách giải quyết</p>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-button"
                onClick={() => setShowResolveModal(false)}
                disabled={isLoading}
              >
                Hủy
              </button>
              <button
                className="confirm-button"
                onClick={handleResolveReport}
                disabled={isLoading || !resolution.trim()}
              >
                {isLoading ? "Đang xử lý..." : "Xác nhận xử lý"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
