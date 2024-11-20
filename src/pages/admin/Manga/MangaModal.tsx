import React, { ChangeEvent, useState, useEffect } from 'react';
import { DTOManga, GenrePair, SelectedManga } from '../../../constrants/apiResponse';
import { motion } from 'framer-motion';
import GenreApi from '../../../apis/GenreApi';
import MangaApi from '../../../apis/MangaApi';

interface MangaModalProps {
    isOpen: boolean;
    closeModal: () => void;
    currentSelectedManga: SelectedManga;
    setCurrentSelectedManga: React.Dispatch<React.SetStateAction<SelectedManga>>;
    fetchManga: (page: number) => Promise<void>
    currentPage: number
}

const MangaModal: React.FC<MangaModalProps> = ({
    isOpen,
    closeModal,
    currentSelectedManga,
    setCurrentSelectedManga,
    currentPage,
    fetchManga
}) => {
    const [genres, setGenres] = useState<GenrePair[]>([]);

    useEffect(() => {
        if (isOpen) {
            fetchGenres();
        }
    }, [isOpen]);

    const fetchGenres = async () => {
        try {
            const response = await GenreApi.getAllGenres();
            setGenres(response.data.genres);
            const newCurrentSelectedManga = findGenreIdForCurrentManga(currentSelectedManga, response.data.genres);
            setCurrentSelectedManga(newCurrentSelectedManga);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedGenres: GenrePair[] = Array.from(event.target.selectedOptions, (option) => ({
            _id: option.value,
            name: option.text
        }));
        setCurrentSelectedManga({ ...currentSelectedManga, genres: selectedGenres });
    };

    const handleSaveManga = async () => {
        try {
            if (currentSelectedManga._id) {
                // Update existing manga
                const response = await MangaApi.updateManga(currentSelectedManga);
                console.log('Manga updated successfully:', response.data);
            } else {
                // Add new manga
                const response = await MangaApi.addManga(currentSelectedManga);
                console.log('Manga added successfully:', response.data);
            }
        } catch (error: any) {
            console.error('Error saving manga:', error.response?.data || error.message);
        } finally {
            fetchManga(currentPage);
            closeModal();
        }
    };



    return (
        <div>
            {isOpen && genres && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <motion.div className="bg-white p-4 rounded relative w-1/3">
                        <button
                            className="absolute top-2 right-2 text-red-600 text-2xl w-8 h-8 flex items-center justify-center hover:text-red-800"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-lg text-black font-bold mb-4">
                            {currentSelectedManga._id ? 'Edit Manga' : 'Add Manga'}
                        </h2>
                        <div>
                            <label className="block mb-2 text-black">Name:</label>
                            <input
                                type="text"
                                value={currentSelectedManga.name}
                                onChange={(e) => setCurrentSelectedManga({ ...currentSelectedManga, name: e.target.value })}
                                className="border p-2 rounded w-full mb-4 text-black"
                                placeholder="Enter manga name"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-black">Image URL:</label>
                            <input
                                type="text"
                                value={currentSelectedManga.imageUrl}
                                onChange={(e) => setCurrentSelectedManga({ ...currentSelectedManga, imageUrl: e.target.value })}
                                className="border p-2 rounded w-full mb-4 text-black"
                                placeholder="Enter image URL"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-black">Summary:</label>
                            <textarea
                                value={currentSelectedManga.summary}
                                onChange={(e) => setCurrentSelectedManga({ ...currentSelectedManga, summary: e.target.value })}
                                className="border p-2 rounded w-full mb-4 text-black"
                                placeholder="Enter manga summary"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-black">Genres:</label>
                            <select
                                multiple
                                value={currentSelectedManga.genres.map((genre) => genre._id)}
                                onChange={handleGenreChange}
                                className="border p-2 rounded w-full mb-4 text-black"
                            >
                                {genres.map((genre) => (
                                    <option key={genre._id} value={genre._id}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleSaveManga}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            {currentSelectedManga._id ? 'Update Manga' : 'Add Manga'}
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default MangaModal;

function findGenreIdForCurrentManga(currentSelectedManga: SelectedManga, genres: GenrePair[]): SelectedManga {
    const newGenre = currentSelectedManga.genres.map((theloai) => {
        return genres.find((g) => g.name === theloai.name) ?? { _id: "", name: "" };
    }
    )
    return { ...currentSelectedManga, genres: newGenre }
}