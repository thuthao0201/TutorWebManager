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
import ConfirmNotification from "../components/ConfirmNotification";
import "../styles/Tutors.css";

export default function Tutors() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Modal states
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add, edit
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

  // Load dữ liệu gia sư
  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    setIsLoading(true);
    try {
      // Đoạn code này sẽ gọi API để lấy danh sách gia sư
      // Tạm thời sử dụng dữ liệu mẫu
      setTimeout(() => {
        const mockTutors = [
          {
            id: 1,
            name: "Nguyễn Văn An",
            email: "nguyenvanan@gmail.com",
            phone: "0912345678",
            subjects: ["Toán", "Lý"],
            grades: ["Lớp 10", "Lớp 11", "Lớp 12"],
            credentials: [
              {
                title: "Cử nhân Sư phạm Toán",
                institution: "ĐH Sư phạm Hà Nội",
                year: "2018",
              },
              {
                title: "Thạc sĩ Vật lý",
                institution: "ĐH Quốc gia Hà Nội",
                year: "2021",
              },
            ],
            hourlyRate: 200000,
            bio: "Giáo viên có 5 năm kinh nghiệm giảng dạy Toán và Lý THPT",
            joinDate: "01/03/2023",
            status: "active",
          },
          {
            id: 2,
            name: "Trần Thị Bình",
            email: "tranthibinh@gmail.com",
            phone: "0923456789",
            subjects: ["Văn", "Anh"],
            grades: ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
            credentials: [
              {
                title: "Cử nhân Ngôn ngữ Anh",
                institution: "ĐH Ngoại ngữ",
                year: "2019",
              },
            ],
            hourlyRate: 180000,
            bio: "Giáo viên trẻ nhiệt huyết với phương pháp giảng dạy hiện đại",
            joinDate: "15/05/2023",
            status: "active",
          },
          {
            id: 3,
            name: "Lê Văn Cường",
            email: "levancuong@gmail.com",
            phone: "0934567890",
            subjects: ["Hóa", "Sinh"],
            grades: ["Lớp 10", "Lớp 11", "Lớp 12"],
            credentials: [
              {
                title: "Cử nhân Sinh học",
                institution: "ĐH Khoa học Tự nhiên",
                year: "2017",
              },
              {
                title: "Chứng chỉ giảng dạy THPT",
                institution: "Sở GD&ĐT",
                year: "2018",
              },
            ],
            hourlyRate: 190000,
            bio: "Chuyên gia về hóa sinh, có kinh nghiệm luyện thi đại học",
            joinDate: "10/06/2023",
            status: "blocked",
          },
          {
            id: 4,
            name: "Phạm Thị Dung",
            email: "phamthidung@gmail.com",
            phone: "0945678901",
            subjects: ["Toán", "Tin học"],
            grades: ["Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9"],
            credentials: [
              {
                title: "Cử nhân CNTT",
                institution: "ĐH Bách khoa Hà Nội",
                year: "2020",
              },
            ],
            hourlyRate: 170000,
            bio: "Giáo viên Toán và Tin học với phương pháp giảng dạy trực quan",
            joinDate: "05/08/2023",
            status: "active",
          },
          {
            id: 5,
            name: "Hoàng Văn Em",
            email: "hoangvanem@gmail.com",
            phone: "0956789012",
            subjects: ["Sử", "Địa"],
            grades: ["Lớp 10", "Lớp 11", "Lớp 12"],
            credentials: [
              {
                title: "Cử nhân Sử học",
                institution: "ĐH Khoa học Xã hội và Nhân văn",
                year: "2019",
              },
            ],
            hourlyRate: 160000,
            bio: "Chuyên gia về lịch sử và địa lý Việt Nam và thế giới",
            joinDate: "20/09/2023",
            status: "active",
          },
        ];
        setTutors(mockTutors);
        setFilteredTutors(mockTutors);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu gia sư:", error);
      setIsLoading(false);
    }
  };

  // Lọc gia sư khi thay đổi bộ lọc
  useEffect(() => {
    filterTutors();
  }, [searchTerm, statusFilter, subjectFilter, tutors]);

  const filterTutors = () => {
    let results = tutors;

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      results = results.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tutor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tutor.phone.includes(searchTerm)
      );
    }

    // Lọc theo trạng thái
    if (statusFilter !== "all") {
      results = results.filter((tutor) => tutor.status === statusFilter);
    }

    // Lọc theo môn học
    if (subjectFilter !== "all") {
      results = results.filter((tutor) =>
        tutor.subjects.includes(subjectFilter)
      );
    }

    setFilteredTutors(results);
    setCurrentPage(1);
  };

  // Định dạng tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Xử lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTutors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);

  // Xử lý chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mở modal thêm mới
  const openAddModal = () => {
    setModalMode("add");
    setSelectedTutor(null);
    setShowAddEditModal(true);
  };

  // Mở modal chỉnh sửa
  const openEditModal = (tutor) => {
    setModalMode("edit");
    setSelectedTutor(tutor);
    setShowAddEditModal(true);
  };

  // Mở modal xác nhận xóa
  const openDeleteModal = (tutor) => {
    setSelectedTutor(tutor);
    setShowDeleteModal(true);
  };

  // Mở modal xác nhận khóa/mở khóa
  const openBlockModal = (tutor) => {
    setSelectedTutor(tutor);
    setShowBlockModal(true);
  };

  // Xử lý thêm gia sư mới
  const handleAddTutor = (newTutor) => {
    const tutorWithId = {
      id: tutors.length + 1,
      ...newTutor,
      joinDate: new Date().toLocaleDateString("vi-VN"),
    };

    setTutors((prev) => [...prev, tutorWithId]);
    setConfirmAction("Thêm gia sư thành công!");
    setShowAddEditModal(false);
  };

  // Xử lý cập nhật gia sư
  const handleUpdateTutor = (updatedTutor) => {
    const updatedTutors = tutors.map((tutor) => {
      if (tutor.id === selectedTutor.id) {
        return {
          ...tutor,
          ...updatedTutor,
        };
      }
      return tutor;
    });

    setTutors(updatedTutors);
    setConfirmAction("Cập nhật thông tin gia sư thành công!");
    setShowAddEditModal(false);
  };

  // Xử lý xóa gia sư
  const handleDeleteTutor = () => {
    const updatedTutors = tutors.filter(
      (tutor) => tutor.id !== selectedTutor.id
    );
    setTutors(updatedTutors);
    setConfirmAction("Đã xóa gia sư thành công!");
    setShowDeleteModal(false);
  };

  // Xử lý khóa/mở khóa tài khoản gia sư
  const handleToggleBlock = () => {
    const updatedTutors = tutors.map((tutor) => {
      if (tutor.id === selectedTutor.id) {
        const newStatus = tutor.status === "blocked" ? "active" : "blocked";
        return {
          ...tutor,
          status: newStatus,
        };
      }
      return tutor;
    });

    setTutors(updatedTutors);
    const actionText =
      selectedTutor.status === "blocked"
        ? "Đã mở khóa tài khoản gia sư thành công!"
        : "Đã khóa tài khoản gia sư thành công!";
    setConfirmAction(actionText);
    setShowBlockModal(false);
  };

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
              placeholder="Tìm kiếm theo tên, email, số điện thoại..."
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

            <button className="refresh-button" onClick={fetchTutors}>
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
                        <td>{tutor.name}</td>
                        <td>
                          <div>{tutor.email}</div>
                          <div>{tutor.phone}</div>
                        </td>
                        <td>{tutor.subjects.join(", ")}</td>
                        <td>
                          <div className="grade-cells">
                            {tutor.grades.slice(0, 1).map((grade, index) => (
                              <span key={index} className="grade-cell">
                                {grade}
                              </span>
                            ))}
                            {tutor.grades.length > 1 && (
                              <span className="more-grades">
                                +{tutor.grades.length - 1}
                              </span>
                            )}
                          </div>
                        </td>
                        <td>{formatCurrency(tutor.hourlyRate)}</td>
                        <td>{tutor.joinDate}</td>
                        <td>
                          <span className={`status-badge ${tutor.status}`}>
                            {tutor.status === "active" && "Hoạt động"}
                            {/* {tutor.status === "pending" && "Chờ xác nhận"} */}
                            {tutor.status === "blocked" && "Đã khóa"}
                          </span>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button
                              className="action-button info"
                              title="Xem chi tiết"
                              onClick={() => navigate(`/tutors/${tutor.id}`)}
                            >
                              <BiSolidUserDetail />
                            </button>
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

            {filteredTutors.length > itemsPerPage && (
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
        onToggleBlock={handleToggleBlock}
      />

      {/* <ConfirmNotification
        message={confirmAction}
        onClose={() => setConfirmAction(null)}
      /> */}
    </div>
  );
}
