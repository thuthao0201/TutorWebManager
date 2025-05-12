import React from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";

export default function BlockTutorModal({
  show,
  onClose,
  tutor,
  onToggleBlock,
}) {
  if (!show || !tutor) return null;

  const isBlocked = tutor.status === "blocked";

  return (
    <div className="modal-overlay">
      <div className="modal-container confirm-modal">
        <div className="modal-header">
          <h2>
            {isBlocked
              ? "Xác nhận mở khóa tài khoản"
              : "Xác nhận khóa tài khoản"}
          </h2>
          <button className="close-modal" onClick={onClose}>
            <FiX />
          </button>
        </div>
        <div className="modal-body">
          <div className="confirm-icon warning">
            <FiAlertCircle />
          </div>
          <p className="confirm-message">
            {isBlocked
              ? `Bạn có chắc chắn muốn mở khóa tài khoản của gia sư ${tutor.name}?`
              : `Bạn có chắc chắn muốn khóa tài khoản của gia sư ${tutor.name}?`}
          </p>
          <p className="confirm-description">
            {isBlocked
              ? "Gia sư sẽ có thể đăng nhập và sử dụng lại tài khoản sau khi được mở khóa."
              : "Gia sư sẽ không thể đăng nhập và sử dụng tài khoản sau khi bị khóa."}
          </p>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Hủy
          </button>
          <button
            className={isBlocked ? "unblock-button" : "block-button"}
            onClick={onToggleBlock}
          >
            {isBlocked ? "Mở khóa" : "Khóa"}
          </button>
        </div>
      </div>
    </div>
  );
}
