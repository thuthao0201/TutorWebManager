import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import "../styles/AddEditTutorModal.css";

// Utility function to generate random password
const generatePassword = (length = 8) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export default function AddEditTutorModal({
  show,
  onClose,
  mode,
  tutor,
  onAdd,
  onUpdate,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    introduce: "",
    specialized: "",
    degree: "",
    field: "",
    hasCertificate: false,
    subjects: [],
    availableSchedule: [], // Mỗi phần tử là { day: "Thứ Hai", timeSlots: ["7:00-9:00"] }
    experiences: "",
    classPrice: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // Danh sách ngày cố định bằng tiếng Việt
  const daysOfWeek = [
    { name: "Thứ Hai", value: "Monday" },
    { name: "Thứ Ba", value: "Tuesday" },
    { name: "Thứ Tư", value: "Wednesday" },
    { name: "Thứ Năm", value: "Thursday" },
    { name: "Thứ Sáu", value: "Friday" },
    { name: "Thứ Bảy", value: "Saturday" },
    { name: "Chủ Nhật", value: "Sunday" },
  ];

  // Danh sách ca học
  const timeSlots = [
    "7:00-9:00",
    "9:30-11:30",
    "13:00-15:00",
    "15:30-17:30",
    "19:00-21:00",
  ];

  // Danh sách khối cấp học
  const gradeLevels = [
    {
      value: "cap1",
      label: "Cấp 1",
      grades: ["1", "2", "3", "4", "5"],
    },
    { value: "cap2", label: "Cấp 2", grades: ["6", "7", "8", "9"] },
    { value: "cap3", label: "Cấp 3", grades: ["10", "11", "12"] },
  ];

  const availableSubjects = [
    "Toán",
    "Tiếng Anh",
    "Vật Lý",
    "Hóa Học",
    "Sinh Học",
    "Ngữ Văn",
    "Lịch Sử",
    "Địa Lý",
    "Tin Học",
  ];

  // Danh sách nhóm ngày
  const dayGroups = [
    {
      value: "weekdays",
      label: "Giữa tuần",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    {
      value: "weekend",
      label: "Cuối tuần",
      days: ["Saturday", "Sunday"],
    },
    {
      value: "allweek",
      label: "Cả tuần",
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    },
  ];

  // Danh sách ca học theo thời gian
  const timePeriods = [
    {
      value: "morning",
      label: "Ca sáng",
      slots: ["7:00-9:00", "9:30-11:30"],
    },
    {
      value: "afternoon",
      label: "Ca chiều",
      slots: ["13:00-15:00", "15:30-17:30"],
    },
    {
      value: "evening",
      label: "Ca tối",
      slots: ["19:00-21:00"],
    },
  ];

  // Thêm state để quản lý việc chọn nhóm ngày và ca
  const [scheduleSelection, setScheduleSelection] = useState({
    dayGroup: "",
    timePeriods: [],
  });

  useEffect(() => {
    if (mode === "edit" && tutor) {
      setFormData({
        name: tutor.userId.name,
        email: tutor.userId.email,
        phone: tutor.userId.phone,
        introduce: tutor.introduce || "",
        specialized: tutor.specialized || "",
        degree: tutor.degree || "",
        field: tutor.field || "",
        hasCertificate: tutor.hasCertificate || false,
        subjects: [...tutor.subjects],
        availableSchedule: [...tutor.availableSchedule],
        experiences: tutor.experiences || "",
        classPrice: tutor.classPrice || "",
      });

      // Convert existing schedule to selection format for editing
      const allDays = tutor.availableSchedule.map((schedule) => schedule.day);
      const allTimeSlots = [
        ...new Set(
          tutor.availableSchedule.flatMap((schedule) => schedule.timeSlots)
        ),
      ];

      setScheduleSelection({
        dayGroup: getDayGroupFromDays(allDays),
        timePeriods: getTimePeriodsFromSlots(allTimeSlots),
      });
    } else {
      // Auto-generate password for new tutors
      const autoPassword = generatePassword();
      setFormData({
        name: "",
        email: "",
        password: autoPassword,
        phone: "",
        introduce: "",
        specialized: "",
        degree: "",
        field: "",
        hasCertificate: false,
        subjects: [],
        availableSchedule: [{ day: "", timeSlots: [] }],
        experiences: "",
        classPrice: "",
      });
      setScheduleSelection({ dayGroup: "", timePeriods: [] });
    }
    setFormErrors({});
  }, [mode, tutor, show]);

  // Convert selections back to original format for submission
  const convertSelectionToSchedule = () => {
    const schedule = [];

    if (
      scheduleSelection.dayGroup &&
      scheduleSelection.timePeriods.length > 0
    ) {
      const selectedDayGroup = dayGroups.find(
        (group) => group.value === scheduleSelection.dayGroup
      );
      const allTimeSlots = [];

      scheduleSelection.timePeriods.forEach((periodValue) => {
        const period = timePeriods.find((p) => p.value === periodValue);
        if (period) {
          allTimeSlots.push(...period.slots);
        }
      });

      if (selectedDayGroup) {
        selectedDayGroup.days.forEach((day) => {
          schedule.push({
            day: day,
            timeSlots: allTimeSlots,
          });
        });
      }
    }

    return schedule;
  };

  // Utility functions to convert between formats
  const getDayGroupFromDays = (days) => {
    if (days.length === 7) return "allweek";
    if (
      days.includes("Saturday") &&
      days.includes("Sunday") &&
      days.length === 2
    )
      return "weekend";
    if (!days.includes("Saturday") && !days.includes("Sunday"))
      return "weekdays";
    return "";
  };

  const getTimePeriodsFromSlots = (slots) => {
    const periods = [];
    const morningSlots = ["7:00-9:00", "9:30-11:30"];
    const afternoonSlots = ["13:00-15:00", "15:30-17:30"];
    const eveningSlots = ["19:00-21:00"];

    if (slots.some((slot) => morningSlots.includes(slot)))
      periods.push("morning");
    if (slots.some((slot) => afternoonSlots.includes(slot)))
      periods.push("afternoon");
    if (slots.some((slot) => eveningSlots.includes(slot)))
      periods.push("evening");

    return periods;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleScheduleChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSchedule = [...prev.availableSchedule];
      updatedSchedule[index] = {
        ...updatedSchedule[index],
        [field]: value,
      };
      return { ...prev, availableSchedule: updatedSchedule };
    });
  };

  const addSubject = () => {
    setFormData((prev) => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", gradeLevel: "", grades: [] }],
    }));
  };

  const removeSubject = (index) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index),
    }));
  };

  const handleSubjectChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedSubjects = [...prev.subjects];
      if (field === "gradeLevel") {
        const selectedLevel = gradeLevels.find(
          (level) => level.value === value
        );
        updatedSubjects[index] = {
          ...updatedSubjects[index],
          gradeLevel: value,
          grades: selectedLevel ? selectedLevel.grades : [],
        };
      } else {
        updatedSubjects[index][field] = value;
      }
      return { ...prev, subjects: updatedSubjects };
    });
  };

  const handleScheduleSelectionChange = (field, value) => {
    setScheduleSelection((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) errors.name = "Họ tên không được để trống";
    if (!formData.email.trim()) errors.email = "Email không được để trống";
    if (!formData.phone.trim())
      errors.phone = "Số điện thoại không được để trống";
    if (!formData.classPrice) errors.classPrice = "Học phí không được để trống";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Convert schedule selection back to original format
    const convertedSchedule = convertSelectionToSchedule();

    const processedData = {
      ...formData,
      availableSchedule: convertedSchedule,
      classPrice: Number(formData.classPrice),
    };

    if (mode === "add") {
      onAdd(processedData);
    } else {
      onUpdate(processedData);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container tutor-form-modal">
        <div className="modal-header">
          <h2>
            {mode === "add" ? "Thêm gia sư mới" : "Chỉnh sửa thông tin gia sư"}
          </h2>
        </div>
        <div className="modal-body">
          <form className="tutor-form">
            {/* Các trường thông tin cá nhân */}
            <div className="edit-form-group">
              <label>Họ tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={mode === "edit"}
              />
            </div>
            <div className="edit-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={mode === "edit"} // Không cho sửa email khi ở chế độ edit
              />
            </div>
            {mode === "add" && (
              <div className="edit-form-group">
                <label>Mật khẩu </label>
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  readOnly
                  style={{ backgroundColor: "#f5f5f5" }}
                />
                {/* <small style={{ color: "#666", fontSize: "12px" }}>
                  Mật khẩu được tạo tự động.
                </small> */}
              </div>
            )}
            <div className="edit-form-group">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-form-group">
              <label>Giới thiệu</label>
              <textarea
                name="introduce"
                value={formData.introduce}
                onChange={handleInputChange}
                rows="5"
              ></textarea>
            </div>
            <div className="edit-form-group">
              <label>Chuyên ngành</label>
              <input
                type="text"
                name="specialized"
                value={formData.specialized}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-form-group">
              <label>Trình độ</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
              />
            </div>

            <div className="edit-form-group">
              <label>Học phí theo giờ (VNĐ)</label>
              <input
                type="number"
                name="classPrice"
                value={formData.classPrice}
                onChange={handleInputChange}
              />
            </div>
            <div className="edit-form-group">
              <label>Kinh nghiệm</label>
              <textarea
                name="experiences"
                value={formData.experiences}
                onChange={handleInputChange}
                rows="5"
              ></textarea>
            </div>
            <div className="edit-form-group certificate-group">
              <label>Chứng chỉ:</label>
              <div className="toggle-options">
                <button
                  type="button"
                  className={`toggle-button ${
                    formData.hasCertificate ? "active" : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      hasCertificate: true,
                    }))
                  }
                >
                  Đã có
                </button>
                <button
                  type="button"
                  className={`toggle-button ${
                    !formData.hasCertificate ? "active" : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      hasCertificate: false,
                    }))
                  }
                >
                  Chưa có
                </button>
              </div>
            </div>

            <div className="edit-form-group subjects-group">
              <h4>Môn học và khối dạy</h4>
              <div className="subjects-list">
                {formData.subjects.map((subject, index) => (
                  <div key={index} className="subjects-item">
                    <div className="subject-form-group">
                      <label>Môn</label>
                      <select
                        value={subject.name}
                        onChange={(e) =>
                          handleSubjectChange(index, "name", e.target.value)
                        }
                      >
                        <option value="">Chọn môn</option>
                        {availableSubjects.map((subj, i) => (
                          <option key={i} value={subj}>
                            {subj}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="subject-form-group">
                      <label>Khối</label>
                      <select
                        value={subject.gradeLevel}
                        onChange={(e) =>
                          handleSubjectChange(
                            index,
                            "gradeLevel",
                            e.target.value
                          )
                        }
                      >
                        <option value="">Chọn khối</option>
                        {gradeLevels.map((level, i) => (
                          <option key={i} value={level.value}>
                            {level.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* {subject.grades && subject.grades.length > 0 && (
                      <div className="subject-form-group">
                        <label>Lớp dạy</label>
                        <div className="grades-display">
                          {subject.grades.map((grade, gradeIndex) => (
                            <span key={gradeIndex} className="grade-tag">
                              Lớp {grade}
                            </span>
                          ))}
                        </div>
                      </div>
                    )} */}
                    <button
                      type="button"
                      className="remove-subject-button"
                      onClick={() => removeSubject(index)}
                    >
                      Xóa
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-subject-button"
                  onClick={addSubject}
                >
                  + Thêm môn học
                </button>
              </div>
            </div>

            {/* Lịch dạy */}
            <div className="form-section">
              <h3>Lịch dạy</h3>
              <div className="schedule-item">
                <div className="edit-form-group">
                  <label>Ngày dạy</label>
                  <select
                    value={scheduleSelection.dayGroup}
                    onChange={(e) =>
                      handleScheduleSelectionChange("dayGroup", e.target.value)
                    }
                  >
                    <option value="">Chọn ngày dạy</option>
                    {dayGroups.map((group, i) => (
                      <option key={i} value={group.value}>
                        {group.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="edit-form-group">
                  <label>Ca dạy</label>
                  <select
                    multiple
                    value={scheduleSelection.timePeriods}
                    onChange={(e) =>
                      handleScheduleSelectionChange(
                        "timePeriods",
                        Array.from(
                          e.target.selectedOptions,
                          (option) => option.value
                        )
                      )
                    }
                  >
                    {timePeriods.map((period, i) => (
                      <option key={i} value={period.value}>
                        {period.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Hủy
          </button>
          <button className="save-button" onClick={handleSubmit}>
            {mode === "add" ? "Thêm gia sư" : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
