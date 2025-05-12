import React, { useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";

export default function ConfirmNotification({ message, onClose }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="confirm-notification">
      <div className="confirm-content">
        <FiCheck className="confirm-icon" />
        <span>{message}</span>
        <button className="close-confirm" onClick={onClose}>
          <FiX />
        </button>
      </div>
    </div>
  );
}
