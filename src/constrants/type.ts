import { DTOManga, SelectedManga } from "./apiResponse";

interface AbstractModel {
    isDeleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface User extends AbstractModel {
    _id: string;
    email: string;
    reading_history: ReadingHistory[];
}

export interface ReadingHistory {
    manga: Manga;
    title: string;
}

export interface Author extends AbstractModel {
    _id: string;
    name: string;
}

export interface Publisher extends AbstractModel {
    _id: string;
    name: string;
    __v: number;
}

export interface Genre extends AbstractModel {
    _id: string;
    name: string;
    slug: string;
}

export interface Chapter extends AbstractModel {
    _id: string;
    chapterNum: number;
    manga: string,
    title: string,
    isDeleted: boolean,
    imageLinks: string[]
}

export interface Manga extends AbstractModel {
    _id: string;
    name: string;
    summary: string;
    imageUrl: string;
    author: [Author];
    publisher: Publisher;
    genres: [Genre];
    views: number;
    publish_date: Date;
    status: number;
    __v: number;
    followersCount: number;
    rating: number;
}

export interface MangaFollowing {
    _id: string;
    idManga: string;
    mangaName: string;
    mangaImageUrl: string;
    latestChapterId: string;
    latestChapterTitle: string;
    latestChapterCreatedAt: string;
}

export interface Comment extends AbstractModel {
    _id: string;
    _idUser: string | null;
    userName: string;
    text: string;
}

export interface Rating extends AbstractModel {
    _id?: string;
    star: number;
    user: string;
    manga: string
}

export interface Notification extends AbstractModel {
    _id: string;
    content: string;
    isRead: boolean;
    isViewed: boolean;
    user: string;
}

export interface MangaTableProps {
    openModal: () => void,
    setCurrentSelectedManga: React.Dispatch<React.SetStateAction<SelectedManga>>
    currentPage: number,
    totalPages: number,
    handlePageChange: (page: number) => void,
    rows: DTOManga[],
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}