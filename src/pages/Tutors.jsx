import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiUserPlus,
  FiEdit,
  FiTrash2,
  FiLock,
  FiUnlock,
  FiSearch,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { BiSolidUserDetail } from "react-icons/bi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddEditTutorModal from "../components/tutors/AddEditTutorModal";
import DeleteTutorModal from "../components/tutors/DeleteTutorModal";
import BlockTutorModal from "../components/tutors/BlockTutorModal";
// import ConfirmNotification from "../components/ConfirmNotification";
import "../styles/Tutors.css";
import { ApiClient } from "../config/api";

export default function Tutors() {
  const api = ApiClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [sortFilter, setSortFilter] = useState("newest");
  const [isFeaturedFilter, setIsFeaturedFilter] = useState(false);
  const [isNewFilter, setIsNewFilter] = useState(false);
  const [followedFilter, setFollowedFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal states
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);

  const subjects = [
    "Toán",
    "Vật lý",
    "Hóa học",
    "Sinh học",
    "Ngữ văn",
    "Tiếng Anh",
    "Lịch sử",
    "Địa lí",
    "Tin học",
  ];

  const grades = [
    "Lớp 1",
    "Lớp 2",
    "Lớp 3",
    "Lớp 4",
    "Lớp 5",
    "Lớp 6",
    "Lớp 7",
    "Lớp 8",
    "Lớp 9",
    "Lớp 10",
    "Lớp 11",
    "Lớp 12",
  ];

  useEffect(() => {
    fetchTutors();
  }, []);

  // Use debounced effect for search to prevent too many API calls
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchTutorsWithFilters();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, subjectFilter, gradeFilter, sortFilter]);

  const fetchTutors = async (filterParams = {}) => {
    setIsLoading(true);
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();

      if (filterParams.isFeatured !== undefined) {
        queryParams.append("isFeatured", filterParams.isFeatured);
      }
      if (filterParams.sort) {
        queryParams.append("sort", filterParams.sort);
      }
      if (filterParams.subject && filterParams.subject !== "all") {
        queryParams.append("subject", filterParams.subject);
      }
      if (filterParams.grade && filterParams.grade !== "all") {
        queryParams.append("grade", filterParams.grade);
      }
      if (filterParams.isNew !== undefined) {
        queryParams.append("isNew", filterParams.isNew);
      }
      if (filterParams.search && filterParams.search.trim()) {
        queryParams.append("search", filterParams.search.trim());
      }
      if (filterParams.followed !== undefined) {
        queryParams.append("followed", filterParams.followed);
      }
      if (filterParams.status && filterParams.status !== "all") {
        queryParams.append("status", filterParams.status);
      }

      const apiUrl = queryParams.toString()
        ? `/api/tutors?${queryParams.toString()}`
        : "/api/tutors";

      console.log("API URL:", apiUrl); // Debug log
      const response = await api.get(apiUrl);

      if (response.status === "success") {
        setTutors(response.data);
        setFilteredTutors(response.data);
      }
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu gia sư:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTutorsWithFilters = () => {
    const filterParams = {
      search: searchTerm || undefined,
      subject: subjectFilter !== "all" ? subjectFilter : undefined,
      grade: gradeFilter !== "all" ? gradeFilter : undefined,
      status: statusFilter !== "all" ? statusFilter : undefined,
      sort: sortFilter,
      isFeatured: isFeaturedFilter || undefined,
      isNew: isNewFilter || undefined,
      followed: followedFilter || undefined,
    };

    // Remove undefined values
    Object.keys(filterParams).forEach(
      (key) => filterParams[key] === undefined && delete filterParams[key]
    );

    fetchTutors(filterParams);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("vi-VN", options).format(
      new Date(dateString)
    );
  };

  // Định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Xử lý phân trang
  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTutors.slice(indexOfFirstItem, indexOfLastItem);

  // Xử lý chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const openAddModal = () => {
    setModalMode("add");
    setSelectedTutor(null);
    setShowAddEditModal(true);
  };

  const openEditModal = (tutor) => {
    setModalMode("edit");
    setSelectedTutor(tutor);
    setShowAddEditModal(true);
  };

  const openDeleteModal = (tutor) => {
    setSelectedTutor(tutor);
    setShowDeleteModal(true);
  };

  const openBlockModal = (tutor) => {
    setSelectedTutor(tutor);
    setShowBlockModal(true);
  };

  const handleAddTutor = async (newTutor) => {
    try {
      const response = await api.post("/api/tutors", newTutor);
      console.log("Response:", response);
      if (response.status === "success") {
        setTutors((prev) => [...prev, response.data]);
        setFilteredTutors((prev) => [...prev, response.data]);
        setConfirmAction("Thêm gia sư thành công!");
      } else {
        console.error("Lỗi khi thêm gia sư:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi thêm gia sư:", error);
    } finally {
      setShowAddEditModal(false);
    }
  };

  const handleUpdateTutor = async (updatedTutor) => {
    try {
      const response = await api.patch(
        `/api/tutors/${selectedTutor._id}`,
        updatedTutor
      );

      if (response.status === "success") {
        const updatedTutors = tutors.map((tutor) =>
          tutor._id === selectedTutor._id ? response.data : tutor
        );
        setTutors(updatedTutors);
        setFilteredTutors(updatedTutors);
        setConfirmAction("Cập nhật thông tin gia sư thành công!");
      } else {
        console.error("Lỗi khi cập nhật gia sư:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật gia sư:", error);
    } finally {
      setShowAddEditModal(false);
    }
  };

  const handleDeleteTutor = async () => {
    try {
      const response = await api.del(`/api/tutors/${selectedTutor._id}`); // Thay đường dẫn bằng API thực tế
      if (response.status === "success") {
        const updatedTutors = tutors.filter(
          (tutor) => tutor._id !== selectedTutor._id
        );
        setTutors(updatedTutors);
        setFilteredTutors(updatedTutors);
        setConfirmAction("Đã xóa gia sư thành công!");
      } else {
        console.error("Lỗi khi xóa gia sư:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi xóa gia sư:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  // Xử lý khóa/mở khóa tài khoản gia sư
  const handleToggleBlock = async () => {
    try {
      const newStatus =
        selectedTutor.status === "blocked" ? "active" : "blocked";
      const response = await api.patch(`/tutors/${selectedTutor.id}/status`, {
        status: newStatus,
      }); // Thay đường dẫn bằng API thực tế
      if (response.status === "success") {
        const updatedTutors = tutors.map((tutor) =>
          tutor._id === selectedTutor._id
            ? { ...tutor, status: newStatus }
            : tutor
        );
        setTutors(updatedTutors);
        setFilteredTutors(updatedTutors);
        const actionText =
          newStatus === "active"
            ? "Đã mở khóa tài khoản gia sư thành công!"
            : "Đã khóa tài khoản gia sư thành công!";
        setConfirmAction(actionText);
      } else {
        console.error(
          "Lỗi khi cập nhật trạng thái gia sư:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái gia sư:", error);
    } finally {
      setShowBlockModal(false);
    }
  };
  // const handleToggleBlock = () => {
  //   const updatedTutors = tutors.map((tutor) => {
  //     if (tutor.id === selectedTutor.id) {
  //       const newStatus = tutor.status === "blocked" ? "active" : "blocked";
  //       return {
  //         ...tutor,
  //         status: newStatus,
  //       };
  //     }
  //     return tutor;
  //   });

  //   setTutors(updatedTutors);
  //   const actionText =
  //     selectedTutor.status === "blocked"
  //       ? "Đã mở khóa tài khoản gia sư thành công!"
  //       : "Đã khóa tài khoản gia sư thành công!";
  //   setConfirmAction(actionText);
  //   setShowBlockModal(false);
  // };

  return (
    <div className="tutors-container">
      <Sidebar />
      <Header />

      <div className="tutors-content">
        <header className="content-header">
          <h1>Quản lý gia sư</h1>
          <button className="add-tutor-button" onClick={openAddModal}>
            <FiUserPlus /> Thêm gia sư
          </button>
        </header>

        <div className="filter-section">
          <div className="search-bar">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm tên, email, số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="filter-controls">
            <div className="filter-item">
              <label>Trạng thái:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                <option value="active">Hoạt động</option>
                {/* <option value="pending">Chờ xác nhận</option> */}
                <option value="blocked">Đã khóa</option>
              </select>
            </div>

            <div className="filter-item">
              <label>Môn học:</label>
              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="filter-item">
              <label>Lớp:</label>
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
              >
                <option value="all">Tất cả</option>
                {grades.map((grade, index) => (
                  <option key={index} value={grade.replace("Lớp ", "")}>
                    {grade}
                  </option>
                ))}
              </select>
            </div> */}

            <div className="filter-item">
              <label>Sắp xếp:</label>
              <select
                value={sortFilter}
                onChange={(e) => setSortFilter(e.target.value)}
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="price_low">Giá thấp đến cao</option>
                <option value="price_high">Giá cao đến thấp</option>
              </select>
            </div>

            <button
              className="refresh-button"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSubjectFilter("all");
                setGradeFilter("all");
                setSortFilter("newest");
                fetchTutors();
              }}
            >
              <FiRefreshCw /> Làm mới
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            <div className="tutors-table-container">
              <table className="tutors-table">
                <thead>
                  <tr>
                    <th>Họ tên</th>
                    <th>Liên hệ</th>
                    <th>Môn dạy</th>
                    <th>Lớp dạy</th>
                    <th>Học phí/giờ</th>
                    <th>Ngày tham gia</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((tutor) => (
                      <tr key={tutor.id}>
                        <td>{tutor.userId.name}</td>
                        <td>
                          <div>{tutor.userId.email}</div>
                          <div>{tutor.userId.phone}</div>
                        </td>
                        <td>
                          {tutor.subjects
                            .map((subject) => subject.name)
                            .join(", ")}
                        </td>
                        <td>
                          <div className="grade-cells">
                            {tutor.subjects[0].grades
                              .slice(0, 1)
                              .map((grade, index) => (
                                <span key={index} className="grade-cell">
                                  Lớp {grade}
                                </span>
                              ))}
                            {tutor.subjects[0].grades.length > 1 && (
                              <span className="more-grades">
                                +{tutor.subjects[0].grades.length - 1}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>{formatCurrency(tutor.classPrice)}</td>
                        <td>{formatDate(tutor.createdAt)}</td>
                        <td>
                          <span
                            className={`status-badge ${
                              tutor.hasCertificate ? "active" : "blocked"
                            }`}
                          >
                            {tutor.hasCertificate ? "Hoạt động" : "Đã khóa"}
                            {/* {tutor.status === "active" && "Hoạt động"} */}
                            {/* {tutor.status === "pending" && "Chờ xác nhận"} */}
                            {/* {tutor.status === "blocked" && "Đã khóa"} */}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            {/* <button
                              className="action-button info"
                              title="Xem chi tiết"
                              onClick={() => navigate(`/tutors/${tutor._id}`)}
                            >
                              <BiSolidUserDetail />
                            </button> */}
                            <button
                              className="action-button edit"
                              title="Chỉnh sửa"
                              onClick={() => openEditModal(tutor)}
                            >
                              <FiEdit />
                            </button>
                            <button
                              className="action-button delete"
                              title="Xóa"
                              onClick={() => openDeleteModal(tutor)}
                            >
                              <FiTrash2 />
                            </button>
                            <button
                              className={`action-button ${
                                tutor.status === "blocked" ? "unblock" : "block"
                              }`}
                              title={
                                tutor.status === "blocked" ? "Mở khóa" : "Khóa"
                              }
                              onClick={() => openBlockModal(tutor)}
                            >
                              {tutor.status === "blocked" ? (
                                <FiUnlock />
                              ) : (
                                <FiLock />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="no-data">
                        Không có dữ liệu gia sư phù hợp với điều kiện tìm kiếm
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {filteredTutors.length > itemsPerPage && ( // Phân trang
              <div className="pagination">
                <button
                  className={`pagination-button ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FiChevronLeft />
                </button>
                <div className="page-numbers">
                  {[...Array(totalPages).keys()].map((number) => (
                    <button
                      key={number + 1}
                      className={`page-number ${
                        currentPage === number + 1 ? "active" : ""
                      }`}
                      onClick={() => paginate(number + 1)}
                    >
                      {number + 1}
                    </button>
                  ))}
                </div>
                <button
                  className={`pagination-button ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  onClick={() =>
                    currentPage < totalPages && paginate(currentPage + 1)
                  }
                  disabled={currentPage === totalPages}
                >
                  <FiChevronRight />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AddEditTutorModal
        show={showAddEditModal}
        onClose={() => setShowAddEditModal(false)}
        mode={modalMode}
        tutor={selectedTutor}
        onAdd={handleAddTutor}
        onUpdate={handleUpdateTutor}
        subjects={subjects}
        grades={grades}
      />

      <DeleteTutorModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        tutor={selectedTutor}
        onDelete={handleDeleteTutor}
      />

      <BlockTutorModal
        show={showBlockModal}
        onClose={() => setShowBlockModal(false)}
        tutor={selectedTutor}
        onToggleBlock={() => handleToggleBlock(selectedTutor)}
      />

      {/* <ConfirmNotification
        message={confirmAction}
        onClose={() => setConfirmAction(null)}
      /> */}
    </div>
  );
}
