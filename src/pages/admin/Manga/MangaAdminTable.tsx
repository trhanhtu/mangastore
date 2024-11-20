import React, { useEffect, useState } from "react"
import { MangaTableProps } from "../../../constrants/type"
import Pagination from "../../../components/Admin/Pagination/Pagination"
import MangaApi from "../../../apis/MangaApi";
import { DTOManga, SelectedManga } from "../../../constrants/apiResponse";
import { useManga } from './MangaHook';


export const MangaAdminTable: React.FC<MangaTableProps & {  fetchManga: (page: number) => Promise<void>
 }> = (
    { openModal, setCurrentSelectedManga, currentPage, handlePageChange, totalPages, rows, fetchManga, setCurrentPage }
) => {



    const [row, setRow] = useState<DTOManga[]>([]);

    async function handleDeleteMangaInComponent(_id: string) {
        try {
            await MangaApi.handleDeleteManga(_id, setRow);
            console.log(`Deleted manga with ID: ${_id}`);
            fetchManga(currentPage); 
            
            
        } catch (error) {
            console.error("Error deleting manga:", error);
        }
    }

    return (
        <React.Fragment>
            <table className="min-w-full table-fixed">
                <thead>
                    <tr className="text-sm md:text-base">
                        {/* <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th> */}
                        <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Tên</th>
                        <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Ảnh</th>
                        <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Tóm tắt</th>
                        <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Thể loại</th>
                        <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Chương</th>
                        <th className="px-4 py-2 text-left font-semibold text-slate-400 w-2/12">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((manga) => (
                        <tr className="border-b border-slate-200 text-sm md:text-base" key={manga._id}>
                            {/* <td className="px-4 py-3 font-medium">{manga._id}</td> */}
                            <td className="px-4 py-3 font-medium">
                                {manga.isDeleted ? (
                                    <span className="text-red-500">(Đã xóa) {manga.name}</span>
                                ) : (
                                    manga.name
                                )}
                            </td>
                            <td className="px-4 py-3">
                                <img
                                    src={manga.imageUrl}
                                    alt={manga.name}
                                    className=" object-cover rounded cursor-pointer"
                                />
                            </td>
                            <td className="px-4 py-3 max-w-xs overflow-hidden whitespace-nowrap overflow-ellipsis">
                                {manga.summary.split('\n').map((line, index) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </td>
                            <td className="px-4 py-3 font-medium">
                                {manga.genreName}
                            </td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => window.open(`/admin/Truyện tranh/${manga._id}/Chương`, '_blank')}
                                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                >
                                    Chi tiết
                                </button>
                            </td>
                            <td className="px-4 py-3">
                                <button
                                    onClick={() => {
                                        const editManga = convertDTOMangaToSelectedManga(manga);
                                        setCurrentSelectedManga(editManga);
                                        openModal();
                                    }}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    Sửa
                                </button>
                                {manga.isDeleted ? (
                                    <button
                                        onClick={() => handleDeleteMangaInComponent(manga._id)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-900"
                                    >
                                        Khôi phục
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDeleteMangaInComponent(manga._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Xóa
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </React.Fragment>
    );
};
function convertDTOMangaToSelectedManga(manga: DTOManga): SelectedManga {
    const selectedManga: SelectedManga = {
        _id: "",
        name: "",
        summary: "",
        imageUrl: "",
        author: [],
        publisher: "",
        genres: [],
        views: 0,
        isDeleted: false,
        status: 0
    }
    selectedManga._id = manga._id;
    selectedManga.name = manga.name;
    selectedManga.imageUrl = manga.imageUrl;
    selectedManga.summary = manga.summary;
    selectedManga.genres = manga.genreName.map((genrename) => {

        return {
            _id: "",
            name: genrename
        }
    })
    return selectedManga;
}
