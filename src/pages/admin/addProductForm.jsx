import { Link } from "react-router-dom";


export default function AddProductForm() {
    return (
        <div>
          <div className="mb-10">
            <h3 className="text-2xl font-semibold">Add Product</h3>
          </div>
          <div className="flex flex-raw gap-4">
            
            <div className="bg-white p-5 rounded-2xl w-[60%]">
                <h2 className="text-2xl mb-5">Product Information</h2>
                
                <label htmlFor="">Product Name</label>
                <input id="product-name"  name="product-name"  type="text" placeholder="Product Name" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"/>
               
                <label htmlFor="">Product Description</label>
                <textarea id="product-description"  name="product-description"  type="text" placeholder="Product description" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5">
                </textarea>
                
                <label htmlFor="">Stock</label>
                <input id="stock"  name="stock"  type="number" placeholder="Stock" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"/>
  
                <label htmlFor="">Labeled Price</label>
                <input id="labeled-price"  name="labeled-price"  type="number" placeholder="Labeled Price" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"/>
  
                <label htmlFor=""> Price</label>
                <input id="-price"  name="price"  type="number" placeholder="Price" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"/>

            </div>
            <div className="bg-white p-5 rounded-2xl w-[40%]">
                 <h2 className="text-2xl mb-5">Product Images</h2>
            </div>

          </div>
            <div className="mt-6 gap-2 flex">
              <Link to="" className="bg-blue-700 p-3 rounded-lg  text-sm
               text-white hover:bg-blue-600 transition duration-150 cursor-pointer gap">Save Product</Link>
              <Link to="" className="bg-red-700 p-3 rounded-lg  text-sm
               text-white hover:bg-red-600 transition duration-150 cursor-pointer">Cancel</Link>
            </div>
          
        </div>
    )
}