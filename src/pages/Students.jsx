import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiUserX,
  FiUserCheck,
  FiTrash2,
  FiFilter,
  FiRefreshCw,
  FiEdit,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles/Students.css";

export default function Students() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Kiểm tra xác thực
    const token =
      localStorage.getItem("adminToken") ||
      sessionStorage.getItem("adminToken");
    // if (!token) {
    //   navigate("/login");
    //   return;
    // }

    loadStudentsData();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = students;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.phone.includes(searchTerm) ||
          student.grade.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((student) => student.status === statusFilter);
    }

    setFilteredStudents(result);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, students]);

  const loadStudentsData = () => {
    setIsLoading(true);

    // Giả lập API call
    setTimeout(() => {
      const mockStudents = [
        {
          id: 1,
          name: "Phạm Thị Dung",
          email: "dungpt@gmail.com",
          phone: "0912345678",
          grade: "Lớp 10",
          joinDate: "04/05/2024",
          status: "active",
        },
        {
          id: 2,
          name: "Hoàng Văn Mạnh",
          email: "manhhv@gmail.com",
          phone: "0923456789",
          grade: "Lớp 12",
          joinDate: "02/05/2024",
          status: "active",
        },
        {
          id: 3,
          name: "Vũ Thị Mai",
          email: "maivu@gmail.com",
          phone: "0934567890",
          grade: "Lớp 11",
          joinDate: "01/05/2024",
          status: "active",
        },
        {
          id: 4,
          name: "Nguyễn Văn Tùng",
          email: "tungnv@gmail.com",
          phone: "0945678901",
          grade: "Lớp 9",
          joinDate: "30/04/2024",
          status: "active",
        },
        {
          id: 5,
          name: "Trần Thị Hương",
          email: "huongtt@gmail.com",
          phone: "0956789012",
          grade: "Lớp 8",
          joinDate: "28/04/2024",
          status: "active",
        },
        {
          id: 6,
          name: "Lê Thành Nam",
          email: "namlt@gmail.com",
          phone: "0967890123",
          grade: "Lớp 10",
          joinDate: "25/04/2024",
          status: "blocked",
        },
        {
          id: 7,
          name: "Nguyễn Thị Lan",
          email: "lannt@gmail.com",
          phone: "0978901234",
          grade: "Lớp 11",
          joinDate: "22/04/2024",
          status: "active",
        },
        {
          id: 8,
          name: "Trần Văn Hiếu",
          email: "hieutv@gmail.com",
          phone: "0989012345",
          grade: "Lớp 12",
          joinDate: "20/04/2024",
          status: "blocked",
        },
        {
          id: 9,
          name: "Phạm Thanh Trúc",
          email: "trucpt@gmail.com",
          phone: "0990123456",
          grade: "Lớp 10",
          joinDate: "18/04/2024",
          status: "active",
        },
        {
          id: 10,
          name: "Vũ Đình Trọng",
          email: "trongvd@gmail.com",
          phone: "0901234567",
          grade: "Lớp 9",
          joinDate: "15/04/2024",
          status: "active",
        },
        {
          id: 11,
          name: "Nguyễn Thị Hồng",
          email: "hongnt@gmail.com",
          phone: "0912345677",
          grade: "Lớp 8",
          joinDate: "12/04/2024",
          status: "active",
        },
        {
          id: 12,
          name: "Trần Quốc Bảo",
          email: "baotq@gmail.com",
          phone: "0923456788",
          grade: "Lớp 10",
          joinDate: "10/04/2024",
          status: "blocked",
        },
      ];

      setStudents(mockStudents);
      setFilteredStudents(mockStudents);
      setIsLoading(false);
    }, 800);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
  };

  const confirmAction = (type, student) => {
    setActionType(type);
    setSelectedStudent(student);
    setShowConfirmModal(true);
  };

  const executeAction = () => {
    if (!selectedStudent) return;

    if (actionType === "block") {
      // Block student
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, status: "blocked" }
            : student
        )
      );
    } else if (actionType === "unblock") {
      // Unblock student
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...student, status: "active" }
            : student
        )
      );
    } else if (actionType === "delete") {
      // Delete student
      setStudents(
        students.filter((student) => student.id !== selectedStudent.id)
      );
    }

    setShowConfirmModal(false);
    setSelectedStudent(null);
    setActionType(null);
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="students-container">
      <Sidebar />
      <Header />

      <div className="students-content">
        <div className="students-header">
          <h1>Quản lý Học sinh</h1>
          <div className="students-actions">
            <button className="refresh-button" onClick={loadStudentsData}>
              <FiRefreshCw />
              Làm mới dữ liệu
            </button>
          </div>
        </div>

        <div className="students-filters">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="filter-group">
            <div className="filter-item">
              <FiFilter />
              <select value={statusFilter} onChange={handleFilterChange}>
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hoạt động</option>
                <option value="blocked">Đã khóa</option>
              </select>
            </div>
            <button
              className="reset-filter-button"
              onClick={handleResetFilters}
            >
              Đặt lại bộ lọc
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="students-table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên học sinh</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  {/* <th>Lớp</th> */}
                  <th>Ngày tham gia</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.phone}</td>
                      {/* <td>{student.grade}</td> */}
                      <td>{student.joinDate}</td>
                      <td>
                        <span className={`status-badge ${student.status}`}>
                          {student.status === "active" && "Hoạt động"}
                          {student.status === "blocked" && "Đã khóa"}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {/* <button className="edit-button">
                            <FiEdit title="Chỉnh sửa" />
                          </button> */}
                          {student.status === "active" ? (
                            <button
                              className="block-button"
                              onClick={() => confirmAction("block", student)}
                              title="Khóa tài khoản"
                            >
                              <FiUserX />
                            </button>
                          ) : (
                            <button
                              className="unblock-button"
                              onClick={() => confirmAction("unblock", student)}
                              title="Mở khóa tài khoản"
                            >
                              <FiUserCheck />
                            </button>
                          )}
                          <button
                            className="delete-button"
                            onClick={() => confirmAction("delete", student)}
                            title="Xóa tài khoản"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      Không tìm thấy dữ liệu học sinh phù hợp
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {filteredStudents.length > itemsPerPage && (
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

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h3>Xác nhận</h3>
            {actionType === "block" && (
              <p>
                Bạn có chắc chắn muốn khóa tài khoản học sinh{" "}
                <strong>{selectedStudent.name}</strong>?
              </p>
            )}
            {actionType === "unblock" && (
              <p>
                Bạn có chắc chắn muốn mở khóa tài khoản học sinh{" "}
                <strong>{selectedStudent.name}</strong>?
              </p>
            )}
            {actionType === "delete" && (
              <p>
                Bạn có chắc chắn muốn xóa tài khoản học sinh{" "}
                <strong>{selectedStudent.name}</strong>? Hành động này không thể
                hoàn tác.
              </p>
            )}
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setShowConfirmModal(false)}
              >
                Hủy
              </button>
              <button className="confirm-button" onClick={executeAction}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
