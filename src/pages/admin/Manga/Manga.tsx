import React, { } from 'react';
import { motion } from 'framer-motion';
import Title from '../../../components/Admin/Title/Title';
import MangaModal from './MangaModal';
import { useManga } from './MangaHook';
import { MangaAdminTable } from './MangaAdminTable';




const StoryboardTable: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    openModal,
    currentSelectedManga,
    setCurrentSelectedManga,
    currentPage,
    handlePageChange,
    rows,
    totalPages,
    fetchManga,
    setCurrentPage
  } = useManga();

  return (
    <motion.div className="container mx-auto p-4">
      <Title>Storyboard Management Table</Title>
      {isModalOpen && (
        <MangaModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          currentSelectedManga={currentSelectedManga}
          setCurrentSelectedManga={setCurrentSelectedManga}
          currentPage={currentPage}
          fetchManga={fetchManga}
        />
      )}
      <div className="overflow-hidden">
        <div className="flex justify-between mb-4">
          <button onClick={openModal} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Thêm truyện mới
          </button>
        </div>
      </div>
      <MangaAdminTable rows={rows} openModal={openModal} setCurrentSelectedManga={setCurrentSelectedManga} currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange}  fetchManga={fetchManga}
      setCurrentPage={setCurrentPage}/>
    </motion.div>
  )
}

export default StoryboardTable;
