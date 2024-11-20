import { useEffect, useState } from "react";
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
import apiHandler from "../../apis/apiHandler";
import { Notification } from "../../constrants/type";
import { ENDPOINTS } from "../../constrants/webInfo";
import Loader from "../../components/User/Common/Loader";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const result = await apiHandler.execute(
        ENDPOINTS.NOTIFICATION_ENDPOINT,
        `get-notificationByIdUser?idUser=${userId}`,
        null,
        "get"
      );

      result.data && setNotifications(result.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      setLoading(true);
      await apiHandler.execute(
        ENDPOINTS.NOTIFICATION_ENDPOINT,
        `update-viewed-byIdUser`,
        { idUser: userId },
        "put"
      );
      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <DefaultLayoutUser>
      <div className="min-h-screen p-6">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-100 mb-6">Thông báo</h1>
            {notifications.length ? (
              <ul className="space-y-4">
                {notifications.map((notification) => {
                  // Kiểm tra nếu content chứa "||"
                  let imageUrl, text;
                  if (notification.content.includes("||")) {
                    [imageUrl, text] = notification.content.split("||");
                  } else {
                    text = notification.content; // Nếu không có "||", toàn bộ chuỗi là text
                  }

                  return (
                    <li
                      key={notification._id}
                      className={`flex items-center p-4 rounded-lg shadow-md transition transform hover:scale-[1.02] cursor-pointer ${
                        notification.isRead
                          ? "bg-gray-100 text-gray-500"
                          : "bg-white text-gray-800 border-l-4 border-blue-500"
                      }`}
                      onClick={() =>
                        !notification.isRead && handleMarkAsRead(notification._id)
                      }
                    >
                      <div className="flex-shrink-0">
                        {notification.isRead ? (
                          <i className="fa-solid fa-check fa-bell text-2x h-6 w-6 text-blue-500"></i>
                        ) : (
                          <i className="fa-regular fa-bell text-2x h-6 w-6 text-blue-500"></i>
                        )}
                      </div>
                      <div className="ml-4">
                        {/* Hiển thị ảnh nếu có imageUrl */}
                        {imageUrl && (
                          <img
                            src={imageUrl.trim()}
                            alt="Notification"
                            className="w-16 h-16 object-cover rounded-md mb-2"
                          />
                        )}
                        {/* Hiển thị nội dung văn bản */}
                        <p className="text-lg font-medium">{text?.trim()}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {new Date(notification.createdAt as Date).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="text-center py-12">
                <i className="fa-regular fa-bell h-16 w-16 text-gray-300 mx-auto" />
                <p className="text-gray-500 mt-4">Bạn không có thông báo nào.</p>
              </div>
            )}
          </>
        )}
      </div>
    </DefaultLayoutUser>
  );
};

export default NotificationPage;
