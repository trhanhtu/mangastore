import { useEffect, useState } from "react";
import MangaApi from "../../../apis/MangaApi";
import { DTOManga, SelectedManga } from "../../../constrants/apiResponse";

const mangaData: SelectedManga = {
    _id: '',
    name: 'không có',
    summary: 'không có',
    imageUrl: 'không có',
    author: [],
    genres: [],
    isDeleted: false,
    publisher: "không có",
    views: 0,
    status: 0
};
export const useManga = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentSelectedManga, setCurrentSelectedManga] = useState<SelectedManga>(mangaData);
    const [rows, setRows] = useState<DTOManga[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        fetchManga(currentPage);
    }, [currentPage]);

    const fetchManga = async (page: number) => {
        try {
            const response = await MangaApi.getAllManga({
                page,
                limit: 10,
            });
            const { docs, totalPages } = response.data;
            setRows(docs);
            
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching manga:', error);
            setRows([]);
        }
    };
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentSelectedManga(mangaData);
    }
    return {
        isModalOpen,
        closeModal,
        openModal,
        currentSelectedManga,
        setCurrentSelectedManga,
        handlePageChange,
        currentPage,
        totalPages,
        rows,
        fetchManga,
        setCurrentPage

    }
}