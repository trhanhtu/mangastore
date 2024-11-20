import React, { useEffect, useState } from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import MenuItem from "./MenuItem";
import { RiArrowLeftWideFill, RiArrowRightWideFill } from "react-icons/ri";
import { FaUser, FaBook, FaClipboardList, FaTachometerAlt, FaChartLine, FaCog, FaSignOutAlt, FaTags, FaListAlt } from 'react-icons/fa';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
const menuItems = [
  {
    icon: FaUser, 
    name: 'Người dùng',
    key: 'Người dùng',
  },
  {
    icon: FaBook, 
    name: 'Truyện tranh',
    key: 'Truyện tranh',

  },
  // {
  //   icon: FaClipboardList, 
  //   name: 'Chương',
  // },
  {
    icon: FaListAlt, 
    name: 'Thể loại',
    key: 'Thể loại',
  },
  {
    icon: FaChartLine, 
    name: 'Thống kê',
    key: 'Thống kê',
  },
  {
    icon: FaSignOutAlt, 
    name: 'Logout',
    isLogout: false,
  },
];


const Sidebar = ({ isOpen, toggleSidebar, setIsOpen }: {isOpen:any, toggleSidebar:any, setIsOpen:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const navigate= useNavigate()
  const auth= useAuth()
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth<800){
      setIsOpen(false)
    }
    else{
      setIsOpen(true)
    }
  }

  window.addEventListener('resize', handleResize );
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <div className={`fixed left-0 top-0 h-full bg-slate-800 text-white transition-all flex flex-col duration-300
    dark: bg 
    ${isOpen ? "w-44" : "w-16 items-center"}`}>
      {/* sidebar logo */}
      <div className="flex items-center justify-center py-4">
        <LuLayoutDashboard   className={`text-2xl text-teal-700 transition-all ${isOpen ? "w-12" : "w-8"}`}/>
      </div>
      {/* menu list */}
      <div className="mt-6 flex-1">
        {
           menuItems.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            name={item.name}
            isOpen={isOpen}
            isLogout={item.isLogout}
            
            onClicked= {()=>{if (item.key){
              navigate("/admin/"+item.key)
            }
            else {
              auth.clearAuthInfo();
            }
          }}
          />
        ))
        }


        </div>
      {/* Toggle button */}
      <button
        onClick={toggleSidebar}
        className="m-2 flex items-center justify-center rounded-md bg-gray-700 p-3 text-2xl font-bold hover:bg-teal-500 duration-300"
      >
        {isOpen ? <RiArrowLeftWideFill /> : <RiArrowRightWideFill />}
      </button>
    </div>
  );
}

export default Sidebar;