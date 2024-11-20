import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="mx-auto p-4 bg-gray-800 text-white flex flex-col items-center">
            <p className="text-center">
                Chào mừng bạn đến với Mangastore - nơi cung cấp những bộ truyện tranh tuyệt vời nhất. 
                Khám phá các thể loại yêu thích và tìm kiếm những câu chuyện mới mỗi ngày!
            </p>
            <div className="mt-4">
                <Link to="/home" className="text-blue-400 hover:text-blue-300">Trang chủ</Link> | 
                <Link to="/policy" className="text-blue-400 hover:text-blue-300"> Giới thiệu</Link> | 
                <Link to="https://mail.google.com/mail/?view=cm&fs=1&to=MangaStore@gmail.com&su=Xin%20chào%20website%20truyện%20tranh.%20Tôi%20cần%20liên%20hệ%20với%20bạn" target="_blank" className="text-blue-400 hover:text-blue-300"> Liên hệ</Link>
            </div>
            <div className="mt-4">
                <p>&copy; {new Date().getFullYear()} Mangastore. Tất cả quyền được bảo lưu.</p>
            </div>
        </div>
    );
}
