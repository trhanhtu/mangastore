import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Genre } from '../../constrants/apiResponse';
import Pagination from '../../components/Admin/Pagination/Pagination';
import GenreApi from '../../apis/GenreApi';

const emptyData: Genre = {
  _id: '',
  name: '',
  slug: '',
  isDeleted: false,
  createdAt: '',
  updatedAt: ''
};

const itemsPerPage = 10;

const GenreTable: React.FC = () => {
  const [rows, setRows] = useState<Genre[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<Genre>(emptyData);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchGenres(currentPage);
  }, [currentPage]);

  const fetchGenres = async (page: number) => {
    try {
      const response = await GenreApi.getAll(
        page,
        10,
      );
      setTotalPages(response.data.totalPages);
      setRows(response.data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSelectedGenre((prev) => ({ ...prev, name: value }));
  };

  const addGenre = async () => {
    try {
      const response = await GenreApi.add(selectedGenre.name);
      console.log('Genre added successfully', response);
      fetchGenres(currentPage);
    } catch (error) {
      console.error('Error adding genre:', error);
    }
  };

  const updateGenre = async (genreId: string) => {
    try {
      const response = await GenreApi.update(selectedGenre.name, genreId);
      console.log('Genre updated successfully', response);
      setIsEditing(false);
      setSelectedGenre(emptyData);
      fetchGenres(currentPage);
    } catch (error) {
      console.error('Error updating genre:', error);
    }
  };

  const handleEditClick = (genre: Genre) => {
    setSelectedGenre(genre);
    setIsEditing(true);
  };

  // Calculate paginated data
  // const totalPages = Math.ceil(rows.length / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý thể loại</h2>

      <form className="mb-4 space-y-4">
        <div>
          <label className="block font-semibold">Tên thể loại:</label>
          <input
            type="text"
            name="name"
            value={selectedGenre.name || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full text-black"
            placeholder="Enter genre name"
          />
        </div>

        <button
          type="button"
          onClick={() => (isEditing ? updateGenre(selectedGenre._id) : addGenre())}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Cập nhật' : 'Thêm'}
        </button>
      </form>

      <motion.div className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300">
        <div className="overflow-hidden">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="text-sm md:text-base">
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Tên</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((genre) => (
                <tr className="border-b border-slate-200 text-sm md:text-base" key={genre._id}>
                  <td className="px-4 py-3 font-medium">{genre._id}</td>
                  <td className={`px-4 py-3 font-medium ${genre.isDeleted ? 'line-through text-red-700' : ''}`}>
                    {genre.name}
                  </td>
                  <td className="px-4 py-3 space-y-2 sm:space-y-0 sm:space-x-2">

                    <button
                      onClick={() => handleEditClick(genre)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full sm:w-auto "
                    >
                      Chỉnh Sửa
                    </button>
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

export default GenreTable;
