import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import ApiService from '../../../apis/apiService';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import { Base, User } from '../../../constrants/apiResponse';

const userService = new ApiService<Base<User[]>>('users');

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(7); // Số lượng mục mỗi trang

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userService.getAllUser('/get-all');
      setUsers(response.data.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Dữ liệu được hiển thị trong trang hiện tại
  const currentPageData = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(users.length / pageSize);

  const softDeleteUser = async (_id: string) => {
    try {
      const response = await userService.deleteUser(_id);
      console.log('User status updated successfully:', response);
      fetchUsers();
    } catch (err: any) {
      console.error('Failed to update user status:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Management Table</h2>
      <motion.div className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300">
        <div className="overflow-hidden">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="text-sm md:text-base">
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">Role</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Name</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Email</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageData.map((user) => (
                <tr className="border-b border-slate-200 text-sm md:text-base" key={user._id}>
                  <td className="px-4 py-3 font-medium">{user.role.name}</td>
                  <td className={`px-4 py-3 font-medium ${user.isDeleted ? 'line-through text-red-700' : ''}`}>
                    {user.userName}
                  </td>
                  <td className="px-4 py-3 font-medium truncate">{user.email}</td>
                  <td className="px-4 py-3 font-medium flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
                    {!user.isDeleted ? (
                      <button
                        onClick={() => softDeleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                      >
                        Xóa
                      </button>
                    ) : (
                      <button
                        onClick={() => softDeleteUser(user._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto"
                      >
                        Khôi phục
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UserTable;
