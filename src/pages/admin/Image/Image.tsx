// Import các thư viện cần thiết
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ImageApi from '../../../apis/ImageApi';
import { motion } from 'framer-motion';

// Khai báo URL của API mà dữ liệu sẽ được gửi đến
const API_URL = "https://researchdevzone.azurewebsites.net" as const;

const ImageUpload: React.FC = () => {
  const { chapterID = "" } = useParams<{ chapterID: string }>();
  // Sử dụng state để lưu trữ danh sách file ảnh được chọn từ máy tính
  const [images, setImages] = useState<FileList | null>(null);
  // State để lưu tên của manga mà người dùng nhập vào
  const [mangaName, setMangaName] = useState<string>('');
  // State để lưu tiêu đề của chapter mà người dùng nhập vào
  const [chapterTitle, setChapterTitle] = useState<string>('');
  // State để lưu kết quả upload ảnh, bao gồm thông báo thành công hay thất bại
  const [uploadResult, setUploadResult] = useState<string>('');
  const [imageLinks, setImageLinks] = useState<string[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const insertPosition= useRef(-1)
  // Hàm xử lý sự kiện khi người dùng chọn file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImages(event.target.files); // Cập nhật danh sách file ảnh vào state
  };

  // Hàm xử lý upload ảnh lên server
  const handleUpload = async () => {
    // Kiểm tra nếu chưa có đủ thông tin cần thiết: mangaName, chapterTitle và danh sách ảnh
    if (!images || !mangaName || !chapterTitle) {
    
      setUploadResult('Vui lòng nhập tên manga, tiêu đề chapter và chọn ảnh.');
      return;
    }

    // Tạo một đối tượng FormData để chứa dữ liệu sẽ gửi đi
    const formData = new FormData();
    // Thêm từng file ảnh vào formData
    Array.from(images).forEach((file) => {
      formData.append('images', file);
    });

    try {
      // Gửi request POST đến API với formData và các thông tin cần thiết
      const response = await axios.post(
        `${API_URL}/files/convert-computer-images-to-link?mangaName=${mangaName}&chapterTitle=${chapterTitle}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }, // Xác định content-type để server biết dữ liệu dạng nào
        }
      );
      // Nếu upload thành công, cập nhật thông báo thành công cùng với danh sách file đã upload
      setUploadResult(`Tải lên thành công! danh sách các link: ${JSON.stringify(response.data.data.fileIds)}`);
      if (modalIsOpen)
        insertImage(chapterID,response.data.data.fileIds,insertPosition.current);
      else
        appendImageLink(chapterID,response.data.data.fileIds);
    } catch (error) {
      // Nếu có lỗi xảy ra trong quá trình upload, hiển thị thông báo lỗi
      setUploadResult('Tải lên thất bại: ' + error);
    }
  };

  useEffect(() => {
    

    if (chapterID) {
      loadImages();
    }
  }, [chapterID]);
  const loadImages = async () => {
    try {
      const response = await ImageApi.read(chapterID);
      setImageLinks(response.data.imageLinks); // assuming imageLinks is an array of URLs
    } catch (error) {
      console.error("Failed to load images.");
    }
  };
  async function deleteImage(chapterID: string, index: number): Promise<void> {
    const service= await ImageApi.deleteImage(chapterID,index);
    loadImages();
    console.log("Failed to load images.", service);
    
  }
  async function appendImageLink(chapterID: string, imageArray: string[]) {

    for(let i=0 ; i<imageArray.length ;i++){
      const service= await ImageApi.append(chapterID,imageArray[i]);
      loadImages();
      console.log("Thêm ảnh thành công", service);
    }
    alert("Thêm ảnh thành công !");
  }
  async function insertImage(chapterID: string, imageArray: string[], index: number) {

    for(let i=0 ; i<imageArray.length ;i++){
      const service= await ImageApi.insert(chapterID,imageArray[i], index);
      loadImages();
      console.log("Thêm ảnh thành công", service);
    }
    alert("Thêm ảnh thành công !");
  }
  return (
    <div>
      <h2>Tải lên ảnh cho Manga</h2>
      <input
        className='text-black'
        type="text"
        placeholder="Tên Manga"
        value={mangaName}
        onChange={(e) => setMangaName(e.target.value)}
      />
      <input
        type="text"
        className='text-black'
        placeholder="Tiêu đề Chapter"
        value={chapterTitle}
        onChange={(e) => setChapterTitle(e.target.value)}
      />
    
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Tải lên ảnh</button>
      {uploadResult && <p>{uploadResult}</p>}

      <motion.div className="flex-1 rounded-xl bg-white p-5 dark:bg-slate-600 dark:text-slate-300">
        <div className="overflow-hidden">
          <h2>Chapter Images</h2>
          <table className="min-w-full table-fixed">
            <thead>
              <tr className="text-sm md:text-base">
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Tên Ảnh</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-4/12">Ảnh</th>
                <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {imageLinks.map((link, index) => (
                <tr className="border-b border-slate-200 text-sm md:text-base" key={index}>
                  <td className="px-4 py-3 font-medium">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{`Image ${index + 1}`}</td>
                  <td className="px-4 py-3">
                    <img src={link} alt={`Image ${index + 1}`} className="w-20 h-auto" />
                  </td>
                  <td className="px-4 py-3 space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => window.open(link, "_blank")}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 w-full sm:w-auto"
                    >
                      Xem
                    </button>
                    <button
                      onClick={() => {setModalIsOpen(true); 
                                      insertPosition.current= index
                      }}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-full sm:w-auto"
                    >
                      Chèn
                    </button>
                    <button
                      onClick={() => deleteImage(chapterID,index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2>Tải lên ảnh cho Manga</h2>
            <input
              className='text-black'
              type="text"
              placeholder="Tên Manga"
              value={mangaName}
              onChange={(e) => setMangaName(e.target.value)}
            />
            <input
              type="text"
              className='text-black'
              placeholder="Tiêu đề Chapter"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
            />
            <input type="file" multiple accept="image/*" onChange={handleFileChange} />
            <button onClick={handleUpload} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Tải lên ảnh</button>
            {uploadResult && <p>{uploadResult}</p>}
            <button onClick={() => setModalIsOpen(false)} className="bg-red-500 text-white px-3 py-1 rounded mt-2">Đóng</button>
          </div>
        </div>
      )}


    </div>
    
  );
};


export default ImageUpload;


