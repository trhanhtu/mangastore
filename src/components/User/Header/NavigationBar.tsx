import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import apiHandler from "../../../apis/apiHandler";
import { Genre } from "../../../constrants/type";
import { ENDPOINTS } from "../../../constrants/webInfo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getRoles } from "@testing-library/react";

export default function NavigationBar() {

    const [genres, setGenres] = useState<Genre[]>([]);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const { userEmail, userAvatar, clearAuthInfo } = useAuth();

    const limit = 999; // Items per page

    const nav = useNavigate();

    // Fetch manga list based on current page
    useEffect(() => {
        const fetchGenreList = async () => {
            try {
                const result = await apiHandler.execute(
                    ENDPOINTS.GENRE_ENDPOINT,
                    `get-page?limit=${limit}`,
                    null,
                    "get"
                );
                setGenres(result.data.genres);
            } catch (err) {
                console.log(err);
            }
        };

        fetchGenreList();
    }, []);

    // Handle logout
    const handleLogout = () => {
        clearAuthInfo();
    };

    return (
        <div className="hidden lg:flex items-center gap-12">
            <a className="font-medium hover:scale-[110%] hover:border-b-2" href="/home">Trang chủ</a>
            {/* Dropdown for genres */}
            <a 
                className="font-medium z-20 hover:scale-[110%] relative"
                href="#"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
            >
                Thể loại <FontAwesomeIcon icon={faCaretDown} />
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className="absolute top-6 bg-slate-800 divide-y divide-gray-100 rounded-lg shadow w-64 max-h-96 overflow-y-scroll">
                        <ul className="z-10 py-2 text-lg">
                            {genres.map((genre) => (
                                <li key={genre._id}>
                                    <a 
                                        href={`/genres/${genre._id}`} 
                                        className="block px-4 py-3 text-white hover:bg-gray-100 hover:text-slate-800 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                        {genre.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </a>
            <div className="flex items-stretch gap-4">
                <SearchBar />
                {userEmail && userAvatar ? (
                    <div className="flex items-center">
                        <div 
                            className="relative flex items-center gap-2"
                            onClick={() => setIsUserDropdownOpen((prev) => !prev)} // Open dropdown on hover
                        >
                            <img 
                                src={userAvatar} 
                                alt="User Avatar" 
                                className="w-10 h-10 rounded-full cursor-pointer"
                            />
                            <span className="text-white">{userEmail}</span>
                            {/* User Dropdown Menu */}
                            {isUserDropdownOpen && (
                                <div className="absolute top-[34px] z-10 bg-slate-800 divide-y divide-gray-100 rounded-lg shadow w-40 mt-2">
                                    <ul className="py-2 text-lg">
                                        <li>
                                            <a 
                                                href="/profile" 
                                                className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-slate-800"
                                            >
                                                Profile
                                            </a>
                                        </li>
                                        {localStorage.getItem("role")=="66f18ac5ab25c97ba8d69eff" &&(<li >
                                            <a 
                                                href="/admin" 
                                                className="block px-4 py-2 text-white hover:bg-gray-100 hover:text-slate-800"
                                            >
                                                Quản lý 
                                            </a>
                                        </li>)}
                                        <li>
                                            <button 
                                                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-100 hover:text-slate-800"
                                                onClick={handleLogout}
                                            >
                                                Đăng xuất
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="cursor-pointer mx-4" onClick={() => nav('/notification')}>
                            <i className="fa-regular fa-bell text-2xl"></i>
                        </div>
                    </div>
                ) : (
                    <button 
                        type="button" 
                        className="hidden lg:block border-2 border-slate-500 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg px-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={() => nav('/login')}
                    >
                        Đăng nhập
                    </button>
                )}

            </div>
        </div>
    );
}
