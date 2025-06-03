import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import AdminProductsPage from './admin/products';
import { GoHome } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { HiOutlineCalculator } from "react-icons/hi";
import AddProductForm from './admin/addProductForm';
import AddNewButton from '../components/AddNewButton';
import EdtProductForm from './admin/editProduct';

export default function Dashboard() {
  return (
    <div className='h-screen flex flex-col'>
          <div className="absolute bottom-30 right-32">
            <AddNewButton/>
          </div>
      <div className='bg-white p-4 flex items-center justify-between'>
         <div className='bg-[url(/Hackstelligence.png)] bg-cover bg-center h-[45px] w-[145px] '></div>
         <div className='bg-[url(/logo.png)] bg-cover bg-center h-[45px] w-[145px] '></div>

      </div>
      <div className='w-full bg-white h-screen flex'>
        <div className='h-full w-[300px] bg-white'>
          <Link to="/dashboard" className='block '>
            <div className='bg-gray-100 border border-gray-300 py-2 px-4 m-2 rounded-lg flex items-center gap-2 text-[20px]'>
              <div>
              <p className='text-sm'>Company</p>
              <p>Viana Pvt Ltd</p>
              </div>
            </div>
          </Link>
          <Link to="/dashboard" className="block py-2 px-4 m-2 rounded-lg flex items-center gap-2 text-[20px] hover:bg-blue-100"><GoHome />Dashboard</Link>
          <Link to="/dashboard/users" className="block  py-2 px-4 m-2 rounded-lg flex items-center gap-2 text-[20px] hover:bg-blue-100"><HiOutlineUsers /> Users</Link>
          <Link to="/dashboard/products" className="block py-2 px-4 m-2 rounded-lg flex items-center gap-2 text-[20px] hover:bg-blue-100"><HiOutlineBuildingStorefront />Products</Link>
          <Link to="/dashboard/addProduct" className="block py-2 px-4 m-2 rounded-lg flex items-center gap-2 text-[20px] hover:bg-blue-100"><HiOutlineBuildingStorefront />Add Products</Link>
          <Link to="/dashboard/orders" className="block  py-2 px-4 m-2 rounded-lg flex items-center gap-2 text-[20px] hover:bg-blue-100"><HiOutlineCalculator />Orders</Link>
        </div>

      <div className="h-full flex-1 flex justify-start pr-10">
        <div className="bg-gray-100 w-full max-w-[calc(100%-5px)] rounded-lg px-10 py-5">
          <Routes>
            <Route path="dashboard" element={<h1>Dashboard</h1>} />
            <Route path="users" element={<h1>Users</h1>} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="addProduct" element= {<AddProductForm/>}/>
            <Route path="editProduct" element= {<EdtProductForm/>}/>
            <Route path="orders" element={<h1>Orders</h1>} />
            
          </Routes>
        </div>
      </div>
      </div>
        <div className='bg-white p-2'>footer

        </div>
    </div>
  );
}

