import axios from "axios"
import { useEffect, useState } from "react"
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import AddNewButton from "../../components/AddNewButton";


export default function AdminProductsPage(){

    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(
        () => {
          if(!loaded){
                        axios.get(import.meta.env.VITE_BACKEND_URL + '/api/product').then(
            (response) => {
                console.log(response.data)
                setProducts(response.data)
                setLoaded(true)
                    }
                )
          }

        }
        ,
        [loaded]
    )

    async function deleteProduct(id){
      const token = localStorage.getItem('token')
      if(token == null){
        toast.error("You are not authorized. Please log in.");
        return;  
      }
      try {
        await axios.delete(import.meta.env.VITE_BACKEND_URL + '/api/product/' + id , {
          headers: {
            Authorization: "Bearer " + token 
          }
        })
        setLoaded(false)
        toast.success("Product deleted successfully")
      } catch (error) {
        console.log(error)
        toast.error("Error deleting product")
      }



    }

    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(products.length / itemsPerPage);



    return(
        <div>
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">Products</h3>
          </div>
        <div className="bg-white p-5 rounded-2xl">
            <div className="mb-4">
               <Link to={"/dashboard/addProduct"} className="bg-blue-700 p-2 rounded-lg   text-white hover:bg-blue-600 transition duration-150 cursor-pointer"> New Product</Link>
            </div>
            <div className="w-full h-full">
           
              
              <div className="overflow-x-auto rounded-lg shadow-md">
               {loaded && <table className="min-w-full text-left text-sm text-gray-700">
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
                      {currentItems.map((product, index) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-6 py-4 font-medium text-gray-900">{indexOfFirstItem + index + 1}</td>
                          <td className="px-6 py-4">{product.productId}</td>
                          <td className="px-6 py-4">{product.name}</td>
                          <td className="px-6 py-4">{product.description}</td>
                          <td className="px-6 py-4">{product.stock}</td>
                          <td className="px-6 py-4 text-green-600 font-semibold">Rs.{product.labeledPrice}</td>
                          <td className="px-6 py-4 text-green-600 font-semibold">Rs.{product.price}</td>
                          <td className="px-6 py-4 flex gap-2">
                            <div className="p-1 rounded-lg text-blue-600 text-[23px] hover:bg-blue-800 hover:text-white transition duration-150">
                               
                               <CiEdit className="cursor-pointer" onClick={
                                () => {
                                 navigate("/dashboard/editProduct/",{
                                   state: product
                                 })
                                }
                               }/>
                               
                             
                            </div>
                            <div className="p-1 rounded-lg text-red-600 text-[23px] hover:bg-red-800 hover:text-white transition duration-150">
                              <AiOutlineDelete className="cursor-pointer" onClick={()=>{deleteProduct(product.productId)}}/>
                            </div>
                            
                            
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  
                </table>}
                {
                  !loaded && <Loader/>
                }
                
                <div className="flex justify-center mt-4 mb-4 gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

          </div>
       </div>
       </div>
    )
}