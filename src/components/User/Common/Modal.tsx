import React from "react";

interface ModalProps {
  title: string;
  content: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, content, onConfirm, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
        <p className="text-gray-700 mb-6">{content}</p>
        <div className="flex justify-end gap-4">
          {onClose && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={onClose}
            >
              Hủy
            </button>
          )}
          {onConfirm && (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={onConfirm}
            >
              Đồng ý
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
