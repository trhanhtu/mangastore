import React from 'react'
import Header from '../Header/Header';
import { Route,  Routes } from 'react-router-dom';
import Analysis from '../../../pages/admin/Analysis/Analysis';
import User from '../../../pages/admin/User/User';
import Manga from '../../../pages/admin/Manga/Manga';
import Chapter from '../../../pages/admin/Chapter/Chapter';
import ImageManager from '../../../pages/admin/Image/Image';
import GenreTable from '../../../pages/Genre/Genre';





const MainContent = ({ isOpen, toggleDarkMode, darkMode }: {isOpen: boolean, toggleDarkMode: () => void, darkMode: boolean}) => {
  return (
      <div
          className={`min-h-screen flex-1 bg-slate-200 ${isOpen ? "md:ml-44" : "ml-16"} transition-all duration-300 dark:bg-slate-800`}
      >
          <div className={`text-${darkMode ? 'white' : 'black'}`}>
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
              <Routes>
                  <Route path='/' element={<User />}/>
                  <Route path='Thống kê' element={<Analysis />} />
                  <Route path='Người dùng' element={<User />} />
                  <Route path='Truyện tranh' element={<Manga />} />
                  <Route path='Truyện tranh/:mangaID/Chương' element={<Chapter />} />
                  <Route path='Chương/:chapterID/Ảnh' element={<ImageManager />} />
                  <Route path='Thể loại' element={<GenreTable />} />
              </Routes>
          </div>
      </div>
  );
};
export default MainContent;
