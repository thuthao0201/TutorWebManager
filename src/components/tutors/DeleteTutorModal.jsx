import React from "react";
import { FiX, FiTrash2 } from "react-icons/fi";

export default function DeleteTutorModal({ show, onClose, tutor, onDelete }) {
  if (!show || !tutor) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container confirm-modal">
        <div className="modal-header">
          <h2>Xác nhận xóa gia sư</h2>
          {/* <button className="close-modal" onClick={onClose}>
            <FiX />
          </button> */}
        </div>
        <div className="modal-body">
          {/* <div>
            <FiTrash2 />
          </div> */}
          <p className="confirm-message">
            Bạn có chắc chắn muốn xóa gia sư{" "}
            <strong>{tutor.userId.name}</strong>?
          </p>
          <p className="confirm-description">
            Hành động này không thể hoàn tác và sẽ xóa tất cả dữ liệu liên quan
            đến tài khoản này.
          </p>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Hủy
          </button>
          <button className="delete-button" onClick={() => onDelete()}>
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
