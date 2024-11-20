import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Title from "../Title/Title";
import { MangaDoc2 } from "../../../constrants/apiResponse";
import AnalysisApi from "../../../apis/AnalysisApi";
import { FaStar } from "react-icons/fa"; // Import star icon from react-icons

const Table = ({ variants }: { variants: any }) => {
  const [topMangaData, setTopMangaData] = useState<MangaDoc2[]>([]);

  useEffect(() => {
    const fetchTopRatedManga = async () => {
      try {
        const response = await AnalysisApi.getStatisticsRating();
        if (response.message === "Thành công") {
          // Only use the top 5 mangas
          const data = response.data.docs.slice(0, 5);
          setTopMangaData(data);
        }
      } catch (error) {
        console.error("Failed to fetch top rated manga:", error);
      }
    };

    fetchTopRatedManga();
  }, []);

  return (
    <motion.div 
      variants={variants}
      className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300"
    >
      <Title>Top truyện có lượt rating cao nhất</Title>
      <table className="min-w-full">
        <thead>
          <tr className="text-sm md:text-base">
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Top</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Tên</th>
            <th className="px-4 py-2 text-left font-semibold text-slate-400">Rating</th>
          </tr>
        </thead>
        <tbody>
          {topMangaData.map((item, index) => (
            <tr className="border-b border-slate-200 text-sm md:text-base" key={item._id}>
              <td className="px-4 py-3 font-medium">Top {index + 1}</td>
              <td className="px-4 py-3 font-medium">{item.name}</td>
              <td className="px-4 py-3 font-medium flex items-center">
                {item.rating.toFixed(2)} <FaStar className="ml-1 text-yellow-500" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Table;
