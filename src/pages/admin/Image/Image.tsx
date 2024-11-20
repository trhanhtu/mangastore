// import React, { useState, ChangeEvent } from 'react';

// interface Image {
//   id: number;
//   url: string;
// }

// const ImageManager: React.FC = () => {
//   const [images, setImages] = useState<Image[]>([]);
//   const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
//   const [isImageModalOpen, setIsImageModalOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);
//   const [imageToUpdateId, setImageToUpdateId] = useState<number | null>(null);

  
//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFiles = Array.from(e.target.files);
//       setNewImageFiles(selectedFiles);
//     }
//   };

  
//   const addImages = () => {
//     const newImages: Image[] = [];

//     newImageFiles.forEach((file, index) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const newImage: Image = { id: Date.now() + index, url: reader.result as string };
//         newImages.push(newImage);

        
//         if (newImages.length === newImageFiles.length) {
//           setImages([...images, ...newImages]);
//           setNewImageFiles([]); 
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

  
//   const handleImageClick = (imageUrl: string) => {
//     setSelectedImage(imageUrl);
//     setIsImageModalOpen(true);
//   };

  
//   const closeImageModal = () => {
//     setIsImageModalOpen(false);
//     setSelectedImage(null);
//   };

  
//   const handleUpdateFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && imageToUpdateId !== null) {
//       const file = e.target.files[0];
//       const reader = new FileReader();

//       reader.onloadend = () => {
       
//         const updatedImages = images.map((image) =>
//           image.id === imageToUpdateId ? { ...image, url: reader.result as string } : image
//         );
//         setImages(updatedImages);
//         setImageToUpdateId(null); 
//       };

//       reader.readAsDataURL(file);
//     }
//   };

  
//   const triggerFileInputForUpdate = (id: number) => {
//     setImageToUpdateId(id);
//     document.getElementById('update-file-input')?.click();
//   };

 
//   const deleteImage = (id: number) => {
//     setImages(images.filter((image) => image.id !== id));
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Image Management</h2>

//       {/* Form to add new images */}
//       <form className="mb-4 space-y-4">
//         <div>
//           <label className="block font-semibold">Select Images:</label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             multiple
//             className="border p-2 rounded w-full text-black"
//           />
//         </div>
//         <button
//           type="button"
//           onClick={addImages}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add Images
//         </button>
//       </form>

     
//       <table className="min-w-full table-fixed">
//         <thead>
//           <tr className="text-sm md:text-base">
//             <th className="px-4 py-2 text-left font-semibold text-slate-400 w-1/12">ID</th>
//             <th className="px-4 py-2 text-left font-semibold text-slate-400 w-3/12">Image</th>
//             <th className="px-4 py-2 text-left font-semibold text-slate-400 w-5/12">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {images.map((image) => (
//             <tr className="border-b border-slate-200 text-sm md:text-base" key={image.id}>
//               <td className="px-4 py-3 font-medium">{image.id}</td>
//               <td className="px-4 py-3 font-medium">
//                 <img
//                   src={image.url}
//                   alt={`Image ${image.id}`}
//                   className="w-24 h-24 object-cover cursor-pointer"
//                   onClick={() => handleImageClick(image.url)} 
//                 />
//               </td>
//               <td className="px-4 py-3 space-y-2 sm:space-y-0 sm:space-x-2">
//                 {/* Button to update the image */}
//                 <button
//                   onClick={() => triggerFileInputForUpdate(image.id)} 
//                   className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 w-full sm:w-auto"
//                 >
//                   Update
//                 </button>
//                 {/* Button to delete the image */}
//                 <button
//                   onClick={() => deleteImage(image.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 w-full sm:w-auto"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Hidden file input for updating images */}
//       <input
//         id="update-file-input"
//         type="file"
//         className="hidden"
//         onChange={handleUpdateFileChange}
//       />

//       {/* Image Modal */}
//       {isImageModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-4 rounded relative">
//             <button
//               className="absolute top-2 right-2 text-red-600 text-4xl w-10 h-10 flex items-center justify-center hover:text-red-800"
//               onClick={closeImageModal}
//             >
//               &times; {/* Close button */}
//             </button>
//             {selectedImage && (
//               <img
//                 src={selectedImage}
//                 alt="Enlarged Image"
//                 className="max-w-full max-h-[80vh] object-contain"
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageManager;


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


