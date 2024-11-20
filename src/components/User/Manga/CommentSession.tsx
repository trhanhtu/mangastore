import React, { useEffect, useState, useCallback } from "react";
import { ENDPOINTS } from "../../../constrants/webInfo";
import apiHandler from "../../../apis/apiHandler";
import { Comment } from "../../../constrants/type";
import defaultAvatar from "../../../assets/images/account.png";
import Modal from "../Common/Modal";

const CommentSection = React.memo(({ mangaId }: { mangaId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddComment, setShowAddComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const userId = localStorage.getItem("userId");

  // Fetch comments once
  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiHandler.execute(
        ENDPOINTS.COMMENT_ENDPOINT,
        `get-comment-section-for-manga?id=${mangaId}`,
        null,
        "get"
      );
      setComments(result.data.comments || []);
    } catch (err) {
      setError("Failed to load comments.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [mangaId, loading]);

  useEffect(() => {
    fetchComments();
  }, []);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    if (!userId) {
      setError("User not logged in.");
      return;
    }

    try {
      const result = await apiHandler.execute(
        ENDPOINTS.COMMENT_ENDPOINT,
        `create`,
        { manga: mangaId, user: userId, text: newComment, isReturnNewData: true },
        "post"
      );

      // Add new comment to the top of the list
      const newAddedComment = result.data; // Assuming API returns the new comment
      setComments((prevComments) => [
        { ...newAddedComment, _idUser: newAddedComment.user },
        ...prevComments,
      ]);

      setNewComment("");
      setShowAddComment(false);
    } catch (err: any) {
      const errorMsg = JSON.parse(err.message);
      setModalContent(errorMsg.message || "Lỗi không xác định.");
      setModalVisible(true);
    }
  };

  const handleDeleteComment = async (id: string) => {
    try {
      await apiHandler.execute(
        ENDPOINTS.COMMENT_ENDPOINT,
        `delete-commentById`,
        { idComment: id },
        "delete"
      );
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== id)
      );
    } catch (err) {
      setError("Failed to delete comment.");
      console.error(err);
    }
  };

  const handleUpdateComment = async () => {
    if (!editCommentText.trim() || !editCommentId) return;
    try {
      await apiHandler.execute(
        ENDPOINTS.COMMENT_ENDPOINT,
        `update?id=${editCommentId}`,
        { text: editCommentText },
        "put"
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === editCommentId
            ? { ...comment, text: editCommentText }
            : comment
        )
      );
      setEditCommentId(null);
      setEditCommentText("");
    } catch (err: any) {
      const errorMsg = JSON.parse(err.message);
      setModalContent(errorMsg.message || "Lỗi không xác định.");
      setModalVisible(true);
    }
  };

  return (
    <div className="mt-8 w-full bg-gray-800 p-6 rounded-md shadow-lg">
      {modalVisible && (
        <Modal
          title="Đã xảy ra lỗi"
          content={modalContent}
          onConfirm={() => setModalVisible(false)}
        />
      )}
      <h3 className="text-2xl font-bold text-white mb-2">Bình luận</h3>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className="flex items-start space-x-4 p-4 bg-gray-700 rounded-md"
          >
            <img
              src={defaultAvatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-white font-semibold">{comment.userName}</p>
              {editCommentId === comment._id ? (
                <div>
                  <textarea
                    value={editCommentText}
                    onChange={(e) => setEditCommentText(e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white rounded-md"
                  />
                  <button
                    onClick={handleUpdateComment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md mt-2"
                  >
                    Cập nhật
                  </button>
                  <button
                    onClick={() => setEditCommentId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md mt-2 ml-2"
                  >
                    Hủy
                  </button>
                </div>
              ) : (
                <p className="text-gray-300">{comment.text}</p>
              )}
              {comment._idUser === userId && (
                <>
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="text-red-500 mt-2 border border-red-500 px-2 py-1 rounded-md hover:bg-red-500 hover:text-white transition"
                  >
                    Xóa
                  </button>
                  <button
                    onClick={() => {
                      setEditCommentId(comment._id);
                      setEditCommentText(comment.text);
                    }}
                    className="text-blue-500 mt-2 ml-4 border border-blue-500 px-2 py-1 rounded-md hover:bg-blue-500 hover:text-white transition"
                  >
                    Chỉnh sửa
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      {loading && (
        <p className="text-gray-300 mt-4">Đang tải bình luận...</p>
      )}
      {!loading && comments.length === 0 && (
        <p className="text-gray-300 mt-4">Không có bình luận nào.</p>
      )}
      {userId && (
        <>
          {showAddComment ? (
            <div className="mt-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-md"
                placeholder="Viết bình luận của bạn..."
              />
              <button
                onClick={handleAddComment}
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
              >
                Gửi bình luận
              </button>
              <button
                onClick={() => setShowAddComment(false)}
                className="mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Hủy
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowAddComment(true)}
              className="flex mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 transition"
            >
              Viết bình luận
            </button>
          )}
        </>
      )}
    </div>
  );
});

export default CommentSection;
