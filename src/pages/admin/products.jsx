import axios from "axios"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";


export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    useEffect(
        () => {
            axios.get(import.meta.env.VITE_BACKEND_URL + '/api/product').then(
            (response) => {
                console.log(response.data)
                setProducts(response.data)
                    }
                )
        }
        ,
        []
    )



    return(
        <div>
          <div className="mb-10">
            <h3 className="text-2xl font-semibold">Products</h3>
          </div>
        <div className="bg-white p-5 rounded-2xl">
            <div className="mb-4">
               <Link to={"/dashboard/addProduct"} className="bg-blue-700 p-2 rounded-lg   text-white hover:bg-blue-600 transition duration-150 cursor-pointer"> New Product</Link>
            </div>
            <div className="w-full h-full">
           
              
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="min-w-full text-left text-sm text-gray-700">
                  <thead className="bg-gray-100 text-black">
                    <tr>
                      <th className="px-6 py-3">#</th>
                      <th className="px-6 py-3">Product ID</th>
                      <th className="px-6 py-3">Product Name</th>
                      <th className="px-6 py-3">Description</th>
                      <th className="px-6 py-3">Stock</th>
                      <th className="px-6 py-3">Labled Price (Rs.)</th>
                      <th className="px-6 py-3">Price (Rs.)</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product, index) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                        <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4">{product.productId}</td>
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">{product.description}</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">Rs.{product.labeledPrice}</td>
                        <td className="px-6 py-4 text-green-600 font-semibold">Rs.{product.price}</td>
                        <td className="px-6 py-4 flex gap-2"><a href=""><FaRegEdit /></a><a href=""><AiOutlineDelete /></a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

          </div>
       </div>
       </div>
    )
}