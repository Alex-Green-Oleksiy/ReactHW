import React from "react";
import { MODAL_TEXT } from "@/constants/ui";
import "@/components/DeleteConfirmModal.css";

const DeleteConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Підтвердження видалення",
    message = MODAL_TEXT.DELETE_CONFIRMATION,
    confirmText = MODAL_TEXT.DEFAULT_CONFIRM,
    cancelText = MODAL_TEXT.DEFAULT_CANCEL
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="delete-modal-overlay" onClick={handleBackdropClick}>
            <div className="delete-modal">
                <div className="delete-modal-content">
                    <div className="delete-modal-header">
                        <div className="delete-icon">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                            </svg>
                        </div>
                        <h3>{title}</h3>
                    </div>

                    <div className="delete-modal-body">
                        <p>{message}</p>
                    </div>

                    <div className="delete-modal-actions">
                        <button
                            className="delete-modal-btn cancel-btn"
                            onClick={onClose}
                        >
                            {cancelText}
                        </button>
                        <button
                            className="delete-modal-btn confirm-btn"
                            onClick={handleConfirm}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
