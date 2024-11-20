import { Link, useNavigate } from "react-router-dom";
import { Author, Manga } from "../../../constrants/type";
import MangaTag from "./MangaTag";

export default function MangaCard({ item }: { item: Manga }) {

    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(`/manga/${item._id}`)}
            style={{ cursor: 'pointer' }}
            className="relative w-full max-w-xs mx-auto rounded-md overflow-hidden hover:scale-[95%] ease-linear duration-200"
        >
            {/* Image Section */}
            <img
                className="aspect-[2/3] object-cover w-full"
                src={item.imageUrl}
                alt={item.name}
            />
    
            {/* Info Layer */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-gray-900/75 to-transparent p-4">
                <MangaTag status={item.status} />
                <span>
                    <h5 className="text-md font-semibold tracking-tight text-white truncate">
                        {item.name}
                    </h5>
                </span>
                <div className="mt-2">
                    {item.author.map((author: Author, index) => (
                        <p className="text-sm font-normal text-gray-400 truncate" key={index}>
                            {author.name}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}