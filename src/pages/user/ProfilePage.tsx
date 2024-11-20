import { useEffect, useState } from "react";
import DefaultLayoutUser from "../../layouts/DefaultLayoutUser/DefaultLayoutUser";
import apiHandler from "../../apis/apiHandler";
import { ENDPOINTS } from "../../constrants/webInfo";
import Loader from "../../components/User/Common/Loader";
import { User, Manga, ReadingHistory, MangaFollowing } from "../../constrants/type";
import { useNavigate } from "react-router-dom";

interface MangaReadingHistory {
    manga: Manga;
    chapters: ReadingHistory[];
}

interface FollowedMangaProps {
    followedManga: MangaFollowing[];
}

const MangaListTable = ({ readingHistory }: { readingHistory: MangaReadingHistory[] }) => (
    <div className="mt-8 w-full bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-2xl font-bold mb-4 text-white">Lịch sử đọc truyện</h3>
        {readingHistory.length ? (
            <table className="w-full text-left text-gray-300">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="py-2 px-4">Ảnh</th>
                        <th className="py-2 px-4">Tên truyện</th>
                        <th className="py-2 px-4">Chapters đã đọc</th>
                    </tr>
                </thead>
                <tbody>
                    {readingHistory.map(({ manga, chapters }) => (
                        <tr key={manga._id} className="border-b border-gray-700">
                            <td className="py-4 px-4">
                                <img
                                    src={manga.imageUrl}
                                    alt={manga.name}
                                    className="w-20 h-20 object-cover rounded"
                                />
                            </td>
                            <td className="py-4 px-4 font-semibold">{manga.name}</td>
                            <td className="py-4 px-4">
                                <ul className="list-disc">
                                    {chapters.map((chapter) => (
                                        <li key={chapter.title}>
                                            <a href={`/manga/${manga._id}/read?chapterNum=1`} className="text-blue-400 hover:underline cursor-pointer">
                                                {chapter.title} <span className="text-xs text-gray-400">(Đã đọc)</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p className="text-gray-300">Không có lịch sử đọc truyện.</p>
        )}
    </div>
);

const FollowedMangaTable = ({ followedManga }: FollowedMangaProps) => {
    return (
        <div className="mt-8 w-full bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold mb-4 text-white">Truyện đã theo dõi</h3>
            {followedManga.length ? (
                <table className="w-full text-left text-gray-300">
                    <thead>
                        <tr className="border-b border-gray-700">
                            <th className="py-2 px-4">Ảnh</th>
                            <th className="py-2 px-4">Tên truyện</th>
                            <th className="py-2 px-4">Chapter mới nhất</th>
                            <th className="py-2 px-4">Ngày cập nhật</th>
                        </tr>
                    </thead>
                    <tbody>
                        {followedManga.map((manga) => (
                            <tr key={manga._id} className="border-b border-gray-700">
                                <td className="py-4 px-4">
                                    <img
                                        src={manga.mangaImageUrl}
                                        alt={manga.mangaName}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                </td>
                                <td className="py-4 px-4 font-semibold">{manga.mangaName}</td>
                                <td className="py-4 px-4 text-blue-400 hover:underline cursor-pointer">
                                    <a href={`/manga/${manga._id}`}>
                                        {manga.latestChapterTitle}
                                    </a>
                                </td>
                                <td className="py-4 px-4 text-gray-400">
                                    {new Date(manga.latestChapterCreatedAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-300">Không có truyện nào trong danh sách theo dõi.</p>
            )}
        </div>
    );
};

export default function ProfilePage() {
    const userId = localStorage.getItem("userId");
    const userAvatar = localStorage.getItem("userAvatar");

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(false);
    const [readingHistory, setReadingHistory] = useState<MangaReadingHistory[]>([]);
    const [followedManga, setFollowedManga] = useState<MangaFollowing[]>([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);

                // Fetch user info
                const userResult = await apiHandler.execute(ENDPOINTS.USER_ENDPOINT, `get-user-byid?id=${userId}`, null, "get");
                const fetchedUser = userResult.data as User;
                setUser(fetchedUser);

                // Group reading history by manga
                const groupedHistory: MangaReadingHistory[] = [];
                fetchedUser.reading_history.forEach((historyItem) => {
                    let mangaHistory = groupedHistory.find(item => item.manga._id === historyItem.manga._id);
                    if (!mangaHistory) {
                        mangaHistory = { manga: historyItem.manga, chapters: [] };
                        groupedHistory.push(mangaHistory);
                    }
                    mangaHistory.chapters.push(historyItem);
                });

                setReadingHistory(groupedHistory);

                // Fetch followed manga list
                const followResult = await apiHandler.execute(ENDPOINTS.FOLLOWING_ENDPOINT, `get-library?id=${userId}`, null, "get");
                setFollowedManga(followResult.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <DefaultLayoutUser>
            <div className="min-h-screen">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="flex flex-col items-center p-8 min-h-screen">
                        <h1 className="text-3xl font-bold mb-6">Thông tin tài khoản</h1>
                        
                        {/* Profile Card */}
                        <div className="rounded-lg shadow-lg p-8 w-full max-w-sm text-center mb-8 bg-gray-900">
                            {userAvatar && (
                                <img 
                                    src={userAvatar} 
                                    alt="User Avatar" 
                                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-md"
                                />
                            )}
                            <h2 className="text-2xl font-semibold mb-2 text-white">{user?.email}</h2>
                        </div>

                        {/* Manga Reading History Table */}
                        <MangaListTable readingHistory={readingHistory} />

                        {/* Followed Manga List Table */}
                        <FollowedMangaTable followedManga={followedManga} />
                    </div>
                )}
            </div>
        </DefaultLayoutUser>
    );
}
