import React from 'react'
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

function AddNewButton() {
  return (
    <div className='ml-10 relative'>
        <div className="flex items-center absolute left-2  top-3.5">
          <div className=" justify-center  w-10 h-10  border-blue-500 border-t-transparent bg-blue-600 rounded-full animate-ping ">
           
          </div>
        </div>
        <div  className="text-6xl absolute top-1 w-12 h-12bg-blue-700 text-white rounded-full  ">
          <Link to={"/dashboard/addProduct"}><IoAddCircleOutline className='bg-blue-700 rounded-full' /></Link>
        </div>

       </div>

    
  )
}

export default AddNewButton
