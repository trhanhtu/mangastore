import React, { useState } from 'react';

const PolicyPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center py-10 px-4">
      <div className="bg-gray-900 shadow-lg rounded-lg p-6 max-w-3xl w-full">
        <h1 className="text-2xl font-bold text-white mb-4">Chính Sách Sử Dụng</h1>
        <p className="text-white mb-6">
          Trang web đọc truyện của chúng tôi cam kết cung cấp nội dung chất lượng và tôn trọng quyền lợi của người dùng. 
          Để đảm bảo trải nghiệm tốt nhất, vui lòng đọc kỹ chính sách sử dụng.
        </p>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Xem chi tiết
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-blue-600 rounded-lg p-6 w-full max-w-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Chi Tiết Chính Sách</h2>
            <p className="text-white mb-6">
              - Người dùng cam kết không vi phạm bản quyền và sử dụng nội dung của trang web cho mục đích cá nhân.<br />
              - Mọi hành vi sao chép, phát tán nội dung không được phép sẽ bị xử lý theo quy định pháp luật.<br />
              - Chúng tôi cam kết bảo mật thông tin cá nhân của người dùng và không chia sẻ với bên thứ ba khi không có sự đồng ý.
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PolicyPage;
