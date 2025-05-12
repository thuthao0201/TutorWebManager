import React, { useState, useEffect } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import "../styles/AddEditTutorModal.css";

export default function AddEditTutorModal({
  show,
  onClose,
  mode,
  tutor,
  onAdd,
  onUpdate,
  subjects,
  grades,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: [],
    grades: [],
    credentials: [],
    hourlyRate: "",
    bio: "",
    status: "active",
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (mode === "edit" && tutor) {
      setFormData({
        name: tutor.name,
        email: tutor.email,
        phone: tutor.phone,
        subjects: [...tutor.subjects],
        grades: [...tutor.grades],
        credentials: [...tutor.credentials],
        hourlyRate: tutor.hourlyRate,
        bio: tutor.bio,
        status: tutor.status,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subjects: [],
        grades: [],
        credentials: [],
        hourlyRate: "",
        bio: "",
        status: "active",
      });
    }
    setFormErrors({});
  }, [mode, tutor, show]);

  // Xử lý nhập liệu form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Xóa lỗi khi người dùng chỉnh sửa
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Xử lý checkbox (môn học, lớp)
  const handleCheckboxChange = (type, value) => {
    setFormData((prev) => {
      const currentItems = [...prev[type]];
      if (currentItems.includes(value)) {
        return {
          ...prev,
          [type]: currentItems.filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [type]: [...currentItems, value],
        };
      }
    });
  };

  // Thêm chứng chỉ mới
  const addCredential = () => {
    setFormData((prev) => ({
      ...prev,
      credentials: [
        ...prev.credentials,
        { title: "", institution: "", year: "" },
      ],
    }));
  };

  // Xóa chứng chỉ
  const removeCredential = (index) => {
    setFormData((prev) => ({
      ...prev,
      credentials: prev.credentials.filter((_, i) => i !== index),
    }));
  };

  // Cập nhật thông tin chứng chỉ
  const handleCredentialChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedCredentials = [...prev.credentials];
      updatedCredentials[index] = {
        ...updatedCredentials[index],
        [field]: value,
      };
      return {
        ...prev,
        credentials: updatedCredentials,
      };
    });
  };

  // Kiểm tra tính hợp lệ của form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Họ tên không được để trống";
    }

    if (!formData.email.trim()) {
      errors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email không hợp lệ";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Số điện thoại không được để trống";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    if (formData.subjects.length === 0) {
      errors.subjects = "Vui lòng chọn ít nhất một môn dạy";
    }

    if (formData.grades.length === 0) {
      errors.grades = "Vui lòng chọn ít nhất một lớp dạy";
    }

    if (!formData.hourlyRate) {
      errors.hourlyRate = "Học phí không được để trống";
    } else if (isNaN(formData.hourlyRate) || Number(formData.hourlyRate) <= 0) {
      errors.hourlyRate = "Học phí phải là số dương";
    }

    // Kiểm tra chứng chỉ
    const credentialsErrors = [];
    formData.credentials.forEach((credential, index) => {
      const credError = {};
      let hasError = false;

      if (!credential.title.trim()) {
        credError.title = "Tên chứng chỉ không được để trống";
        hasError = true;
      }

      if (!credential.institution.trim()) {
        credError.institution = "Nơi cấp không được để trống";
        hasError = true;
      }

      if (!credential.year.trim()) {
        credError.year = "Năm cấp không được để trống";
        hasError = true;
      } else if (!/^\d{4}$/.test(credential.year)) {
        credError.year = "Năm không hợp lệ";
        hasError = true;
      }

      if (hasError) {
        credentialsErrors[index] = credError;
      }
    });

    if (credentialsErrors.length > 0) {
      errors.credentials = credentialsErrors;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Xử lý lưu form
  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const processedData = {
      ...formData,
      hourlyRate: Number(formData.hourlyRate),
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
          {/* <button className="close-modal" onClick={onClose}>
            <FiX />
          </button> */}
        </div>
        <div className="modal-body">
          <form className="tutor-form">
            <div className="form-section">
              <h3>Thông tin cá nhân</h3>
              <div className="form-group">
                <label htmlFor="name">
                  Họ tên <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={formErrors.name ? "error" : ""}
                />
                {formErrors.name && (
                  <div className="error-message">{formErrors.name}</div>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={formErrors.email ? "error" : ""}
                  />
                  {formErrors.email && (
                    <div className="error-message">{formErrors.email}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Số điện thoại <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={formErrors.phone ? "error" : ""}
                  />
                  {formErrors.phone && (
                    <div className="error-message">{formErrors.phone}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="hourlyRate">
                  Học phí theo giờ (VNĐ) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  className={formErrors.hourlyRate ? "error" : ""}
                />
                {formErrors.hourlyRate && (
                  <div className="error-message">{formErrors.hourlyRate}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="bio">Giới thiệu bản thân</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>
            </div>

            <div className="form-section">
              <div className="form-row">
                <div className="form-group checkboxes">
                  <label>
                    Môn học <span className="required">*</span>
                  </label>
                  <div className="checkbox-container">
                    {subjects.map((subject, index) => (
                      <div key={index} className="checkbox-item">
                        <input
                          type="checkbox"
                          id={`subject-${index}`}
                          checked={formData.subjects.includes(subject)}
                          onChange={() =>
                            handleCheckboxChange("subjects", subject)
                          }
                        />
                        <label htmlFor={`subject-${index}`}>{subject}</label>
                      </div>
                    ))}
                  </div>
                  {formErrors.subjects && (
                    <div className="error-message">{formErrors.subjects}</div>
                  )}
                </div>

                <div className="form-group checkboxes">
                  <label>
                    Lớp dạy <span className="required">*</span>
                  </label>
                  <div className="checkbox-container">
                    {grades.map((grade, index) => (
                      <div key={index} className="checkbox-item">
                        <input
                          type="checkbox"
                          id={`grade-${index}`}
                          checked={formData.grades.includes(grade)}
                          onChange={() => handleCheckboxChange("grades", grade)}
                        />
                        <label htmlFor={`grade-${index}`}>{grade}</label>
                      </div>
                    ))}
                  </div>
                  {formErrors.grades && (
                    <div className="error-message">{formErrors.grades}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-header-with-button">
                <h3>Bằng cấp và chứng chỉ</h3>
                <button
                  type="button"
                  className="add-button"
                  onClick={addCredential}
                >
                  <FiPlus /> Thêm chứng chỉ
                </button>
              </div>

              {formData.credentials.length === 0 ? (
                <div className="no-credentials">
                  <p>Chưa có thông tin bằng cấp, chứng chỉ</p>
                  <button
                    type="button"
                    className="add-credential-button"
                    onClick={addCredential}
                  >
                    Thêm chứng chỉ
                  </button>
                </div>
              ) : (
                formData.credentials.map((credential, index) => (
                  <div key={index} className="credential-item">
                    <div className="credential-header">
                      <h4>Chứng chỉ {index + 1}</h4>
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeCredential(index)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    <div className="credential-form">
                      <div className="form-group">
                        <label>
                          Tên bằng/chứng chỉ <span className="required">*</span>
                        </label>
                        <input
                          type="text"
                          value={credential.title}
                          onChange={(e) =>
                            handleCredentialChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          className={
                            formErrors.credentials &&
                            formErrors.credentials[index]?.title
                              ? "error"
                              : ""
                          }
                        />
                        {formErrors.credentials &&
                          formErrors.credentials[index]?.title && (
                            <div className="error-message">
                              {formErrors.credentials[index].title}
                            </div>
                          )}
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>
                            Nơi cấp <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            value={credential.institution}
                            onChange={(e) =>
                              handleCredentialChange(
                                index,
                                "institution",
                                e.target.value
                              )
                            }
                            className={
                              formErrors.credentials &&
                              formErrors.credentials[index]?.institution
                                ? "error"
                                : ""
                            }
                          />
                          {formErrors.credentials &&
                            formErrors.credentials[index]?.institution && (
                              <div className="error-message">
                                {formErrors.credentials[index].institution}
                              </div>
                            )}
                        </div>
                        <div className="form-group">
                          <label>
                            Năm cấp <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            value={credential.year}
                            onChange={(e) =>
                              handleCredentialChange(
                                index,
                                "year",
                                e.target.value
                              )
                            }
                            className={
                              formErrors.credentials &&
                              formErrors.credentials[index]?.year
                                ? "error"
                                : ""
                            }
                          />
                          {formErrors.credentials &&
                            formErrors.credentials[index]?.year && (
                              <div className="error-message">
                                {formErrors.credentials[index].year}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {mode === "edit" && (
              <div className="form-section">
                <h3>Trạng thái tài khoản</h3>
                <div className="form-group">
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Hoạt động</option>
                    <option value="pending">Chờ xác nhận</option>
                    <option value="blocked">Đã khóa</option>
                  </select>
                </div>
              </div>
            )}
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
