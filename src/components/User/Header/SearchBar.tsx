import { useState, useEffect } from "react";
import apiHandler from "../../../apis/apiHandler";
import { ENDPOINTS } from "../../../constrants/webInfo";
import { Manga } from "../../../constrants/type";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

    const nav = useNavigate()

    const [searchValue, setSearchValue] = useState("");

    const [mangaList, setMangaList] = useState<Manga[]>([]);

    // Hàm cập nhật giá trị tìm kiếm
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    // Hàm điều hướng khi nhấp vào một manga trong danh sách
    const handleMangaClick = (mangaId: string) => {
        nav(`/manga/${mangaId}`); // Chuyển hướng đến trang manga
        setSearchValue(""); // Xóa giá trị tìm kiếm
        setMangaList([]); // Xóa danh sách manga
    };

    // Hàm fetch dữ liệu dựa trên giá trị tìm kiếm
    useEffect(() => {
        const fetchMangaList = async () => {
            if (!searchValue.trim()) {
                setMangaList([]); // Clear the list if searchValue is empty
                return;
            }
            try {
                const result = await apiHandler.execute(
                    ENDPOINTS.MANGA_ENPOINT,
                    `get-all?searchValue=${searchValue}`,
                    null,
                    "get"
                );
                setMangaList(result.data.docs);
            } catch (err) {
                console.log("Error fetching manga list:", err);
            }
        };

        // Debounce: Chờ 500ms trước khi gọi API để tránh gọi quá nhiều lần khi người dùng đang nhập
        const delayDebounce = setTimeout(() => {
            fetchMangaList();
        }, 200);

        return () => clearTimeout(delayDebounce); // Clear timeout if searchValue changes
    }, [searchValue]);

    return (
        <div className="relative hidden lg:flex items-center">
            <div className="flex px-4 py-3 rounded-md border-2 border-slate-500 overflow-hidden max-w-md mx-auto font-[sans-serif]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="20px"
                    className="fill-white mr-3 rotate-90">
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                    </path>
                </svg>
                <input
                    type="text"
                    placeholder="Tên truyện cần tìm..."
                    className="w-full outline-none bg-transparent text-white text-sm"
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            {mangaList.length > 0 && (
                <div className="absolute z-10 top-full mt-1 w-[300px] max-w-xl bg-slate-700 text-white rounded-md shadow-lg overflow-hidden">
                    <ul className="max-h-60 w-[300px] overflow-y-auto">
                        {mangaList.map((manga) => (
                            <li
                                key={manga._id}
                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-slate-600"
                                onClick={() => handleMangaClick(manga._id)}
                            >
                                <img
                                    src={manga.imageUrl} // Đường dẫn hình ảnh từ API
                                    alt={manga.name}
                                    className="w-20 h-20 object-cover rounded mr-3"
                                />
                                <span>{manga.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
