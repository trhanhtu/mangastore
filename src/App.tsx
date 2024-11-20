import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { 
  HomeAdminPage,
  LoginPage,
  MangaDetailPage,
  MangaListPage,
  MangaReadPage,
  NotificationPage,
  ProfilePage,
} from './pages/index';
import StoreAuth from './pages/user/StoreAuth';
import PolicyPage from './pages/user/PolicyPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StoreAuth />} />
      <Route path='/home' element={<MangaListPage />} />
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/genres/:genreId' element={<MangaListPage />} />
      <Route path='/manga/:id' element={<MangaDetailPage />} />
      <Route path='/manga/:id/read' element={<MangaReadPage />} />
      <Route path='/notification' element={<NotificationPage />} />
      <Route path='/policy' element={<PolicyPage />} />
      <Route path='/admin/*' element={<HomeAdminPage />} />
      
      <Route path='/login' element={<LoginPage />} />
      {/* Thêm một trang 404 */}
      <Route path='*' element={<h1>404 - Page Not Found</h1>} />
    </Routes>
  );
}

export default App;
