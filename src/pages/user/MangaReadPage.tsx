import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
import { Chapter, Manga } from "../../constrants/type";
import { ENDPOINTS } from "../../constrants/webInfo";
import apiHandler from "../../apis/apiHandler";
import Loader from "../../components/User/Common/Loader";
import BreadCrumb from "../../components/User/Common/BreadCrumb";
import CommentSection from "../../components/User/Manga/CommentSession";
import { useAuth } from "../../context/AuthContext";

const MangaReadPage = () => {

    const { id } = useParams<{ id: string }>();

    const { userId } = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const [manga, setManga] = useState<Manga>();

    const [chapters, setChapters] = useState<Chapter[]>([]);

    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(() => {
        const chapterNum = parseInt(new URLSearchParams(location.search).get("chapterNum") || "1");
        return chapterNum - 1;
    });

    useEffect(() => {
        const fetchChapters = async () => {
            try {
                setLoading(true);
                let result = await apiHandler.execute(ENDPOINTS.MANGA_ENPOINT, `get-manga-byid?id=${id}`, null, "get");
                setManga(result.data);
                result = await apiHandler.execute(
                    ENDPOINTS.CHAPTER_ENDPOINT, 
                    `get-page?mangaId=${id}&limit=999&orderType=ASC`, 
                    null, 
                    "get"
                );
                setChapters(result.data.chapters);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchChapters();
    }, [id]);

    useEffect(() => {
        navigate(`?chapterNum=${currentPage + 1}`, { replace: true });
        addReadingHistory();
        window.scrollTo({ top: 0, behavior: "smooth" }); // Cuộn về đầu trang
    }, [currentPage, navigate]);

    const addReadingHistory = async () => {
        if (userId && chapters[currentPage]) {
            const addHistoryRequest = {
                idUser: userId,
                idChapter: chapters[currentPage]._id,
            };
            try {
                await apiHandler.execute(ENDPOINTS.USER_ENDPOINT, 'add-reading-history', addHistoryRequest, 'post');
                console.log("Reading history added:", addHistoryRequest);
            } catch (error) {
                console.error("Failed to add reading history:", error);
            }
        }
    };

    const handleNextChapter = () => {
        if (currentPage < chapters.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousChapter = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <DefaultLayoutUser>
            <div className="min-h-screen flex flex-col items-center justify-center">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {/* Breadcrumb */}
                        <BreadCrumb items={[
                            { label: 'Trang chủ', href: '/', icon: <i className="fa-solid fa-house"></i> },
                            { label: manga ? manga.name : '', href: `/manga/${manga?._id}`, icon: <i className="fa-solid fa-book-open-reader"></i> },
                            { label: chapters[currentPage] ? chapters[currentPage].title : '', href: `/manga/${manga?._id}/read?chapterNum=${currentPage+1}` },
                        ]} />
                        <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-md">
                            <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">
                                {chapters[currentPage]?.title}
                            </h1>
                            <div className="bg-blue-100 text-blue-500 p-2 rounded mb-4 text-sm">
                                <p>Sử dụng mũi tên trái (←) hoặc phải (→) để chuyển chapter</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded ${currentPage === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={handlePreviousChapter}
                                    disabled={currentPage === 0}
                                >
                                    ← Chap trước
                                </button>
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded ${currentPage >= chapters.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={handleNextChapter}
                                    disabled={currentPage >= chapters.length - 1}
                                >
                                    Chap sau →
                                </button>
                            </div>
                        </div>

                        {/* Image Manga */}
                        <div className="flex flex-col items-center my-4 w-full max-w-3xl">
                            {chapters[currentPage]?.imageLinks.map((url, index) => (
                                <div key={index} className="border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden mb-4">
                                    <img src={url} alt={`Page ${index + 1}`} className="w-full h-auto" />
                                </div>
                            ))}
                        </div>

                        <div className="w-full max-w-3xl p-6 rounded-lg shadow-md">
                            <div className="flex justify-between items-center">
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded ${currentPage === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={handlePreviousChapter}
                                    disabled={currentPage === 0}
                                >
                                    ← Chap trước
                                </button>
                                <button
                                    className={`bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded ${currentPage >= chapters.length - 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                                    onClick={handleNextChapter}
                                    disabled={currentPage >= chapters.length - 1}
                                >
                                    Chap sau →
                                </button>
                            </div>

                            {/* Scroll to Top Button */}
                            <button
                            onClick={scrollToTop}
                                className="fixed right-10 bottom-10 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full shadow-md focus:outline-none"
                                title="Scroll to top"
                            >
                                <i className="fa-solid fa-arrow-up"></i>
                            </button>
                        </div>

                        {/* Comment Section */}
                        <CommentSection mangaId={id as string} />
                    </>
                )}
            </div>
        </DefaultLayoutUser>
    );
};

export default MangaReadPage;
