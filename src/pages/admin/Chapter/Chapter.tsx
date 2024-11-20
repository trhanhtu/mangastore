import React, { useState, useEffect, ChangeEvent } from 'react';
import Pagination from '../../../components/Admin/Pagination/Pagination';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Chapter, ChapterData } from '../../../constrants/apiResponse';
import ChapterApi from "../../../apis/ChapterApi";

const emptyData: Chapter = {
  _id: '',
  title: '',
  chapterNum: 0,
  updatedAt: new Date(),
  isDeleted: false
};
const ChapterTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { mangaID = "" } = useParams<{ mangaID: string }>();
  
  const [rows, setRows] = useState<Chapter[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(emptyData);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Fetch chapters data
  useEffect(() => {
    if (mangaID ) {
      fetchChapters();
    }
  }, [currentPage, mangaID]);

  const fetchChapters = async () => {
    try {
      const response = await ChapterApi.getPaginatedChapters({
        mangaId: mangaID,
        filter: "title,chapterNum,updatedAt,isDeleted",
        page: currentPage,
        limit: 10
      });
      setRows(response.data.chapters);
      console.log(response.data.chapters)
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    console.log('Changed to page:', page);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {  value } = e.target;
    setSelectedChapter((prev) => ({ ...prev, title: value }));
  };

  const viewImages = (id: string) => {
    console.log('Redirecting to episode management page for storyboard:', id);
    window.open(`/admin/Chương/${id}/Ảnh`, '_blank');
  };

  const addChapter = async () => {
    try {
      const response = await ChapterApi.addChapter(selectedChapter.title, mangaID);
        
      console.log('Chapter added successfully:', response);
      
    } catch (error) {
      console.error('Error adding chapter:', error);
    }
    if (mangaID ) {
      fetchChapters();
      
    }
  };
  const updateChapter = async (chapterId: string) => {
    try {
      const response = await ChapterApi.updateChapter(selectedChapter.title, chapterId);
      console.log('Chapter updated successfully:', response);
      setIsEditing(false);
      setSelectedChapter(emptyData);
      fetchChapters();
    } catch (error) {
      console.error('Error updating chapter:', error);
    }
  };
  const handleEditClick = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setIsEditing(true);
  };
  const deleteChapter = async (chapterId: string, chapterIsdelete: boolean) => {
    try {
      
      const response = await ChapterApi.deleteChapter(!chapterIsdelete, chapterId);
      console.log('Chapter deleted successfully:', response);
      setSelectedChapter(emptyData);
      fetchChapters();
    } catch (error) {
      console.error('Error updating chapter:', error);
    }
  };
 

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chapter Management Table</h2>

      <form className="mb-4 space-y-4">
        <div>
          <label className="block font-semibold">Name:</label>
          <input
            type="text"
            name="title"
            value={selectedChapter.title || ''}
            onChange={handleChange}
            className="border p-2 rounded w-full text-black"
            placeholder="Enter chapter name"
          />
        </div>
        
        
        <button
          type="button"
          onClick={() => isEditing  ? updateChapter(selectedChapter._id) : addChapter()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Update Chapter' : 'Add Chapter'}
        </button>
      </form>

      <motion.div className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300">
        <div className="overflow-hidden">
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="text-sm md:text-base">
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Name</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Creation Date</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Photos</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((chapter) => (
                <tr className="border-b border-slate-200 text-sm md:text-base" key={chapter._id}>
                  <td className="px-4 py-3 font-medium">{chapter._id}</td>
                  <td className={`px-4 py-3 font-medium ${chapter.isDeleted ? 'line-through text-red-700' : ''}`}>
                    {chapter.title}
                  </td>
                  <td className="px-4 py-3 font-medium">{formatDateToString(chapter.updatedAt ?? new Date())}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => viewImages(chapter._id ?? "")}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Chi tiết ảnh
                    </button>
                  </td>
                  <td className="px-4 py-3 space-y-2 sm:space-y-0 sm:space-x-2">
                    {!chapter.isDeleted ? (
                      <>
                        <button
                          onClick={() => handleEditClick(chapter)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full sm:w-auto"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => deleteChapter(chapter._id,chapter.isDeleted)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                        >
                          Xóa
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => deleteChapter(chapter._id,chapter.isDeleted)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
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
export default ChapterTable;
function formatDateToString(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date: Expected instance of Date or valid date string');
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

