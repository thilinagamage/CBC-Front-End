import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import ProductVariableForm from "../../components/ProductVariableForm";

export default function AddProductForm() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productAltName, setProductAltName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [stock, setStock] = useState("");
  const [labeledPrice, setLabeledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const navigate = useNavigate();

  async function handleSubmit() {
    const promisesArray =  []

    for(let i = 0; i < galleryImages.length; i++){
      console.log(galleryImages[i])
    }
return
    const productAltNamesInArray = productAltName.split(",");
    const product = {
      productId: productId,
      name: productName,
      altNames: productAltNamesInArray,
      description: productDescription,
      stock: stock,
      labeledPrice: labeledPrice,
      price: price,
      images: [
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      ],
    };

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not authorized. Please log in.");
      return;
    }
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/product/", product, {
        headers: { Authorization: "Bearer " + token },
      })
      .then(() => {
        toast.success("Product added successfully");
        navigate("/dashboard/products");
      })
      .catch(() => {
        toast.error("Faild to add product");
      });
    console.log("Token:", token);
  }

  return (
    <div>
      <div className="mb-10">
        <h3 className="text-2xl font-semibold">Add Product</h3>
      </div>
      <div className="flex flex-raw gap-4">
        <div className="bg-white p-5 rounded-2xl w-[60%]">
          <h2 className="text-2xl mb-5">Product Information</h2>

          <label htmlFor="">Product ID</label>
          <input
            id="product-id"
            name="product-id"
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
            }}
            type="text"
            placeholder="Product ID"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"
          />

          <label htmlFor="">Product Name</label>
          <input
            id="product-name"
            name="product-name"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
            }}
            type="text"
            placeholder="Product Name"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"
          />

          <label htmlFor="">Product Alternative Name</label>
          <input
            id="product-alt-name"
            name="product-alt-name"
            value={productAltName}
            onChange={(e) => {
              setProductAltName(e.target.value);
            }}
            type="text"
            placeholder="Product Name"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"
          />

          <label htmlFor="">Product Description</label>
          <textarea
            id="product-description"
            value={productDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
            name="product-description"
            type="text"
            placeholder="Product description"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"
          ></textarea>

          <label htmlFor="">Stock</label>
          <input
            id="stock"
            name="stock"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
            }}
            type="number"
            placeholder="Stock"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"
          />
          <div className="flex flex-row justify-between gap-2">

              <div className="w-full">
                <div className="w-full">
                    <label htmlFor="">Labeled Price</label>
                    <input
                      id="labeled-price"
                      name="labeled-price"
                      value={labeledPrice}
                      onChange={(e) => {
                        setLabeledPrice(e.target.value);
                      }}
                      type="number"
                      placeholder="Labeled Price"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                          focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor=""> Price</label>
                    <input
                      id="-price"
                      name="price"
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      type="number"
                      placeholder="Price"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
                          focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 mb-5"
                    />
                  </div>
              </div>

                             <div className=" mb-5">
                  <h4 className="mb-2">Featured Image</h4>
                    <div class="flex items-center  w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center p-10 h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"> Photo 1</p>
                            </div>
                            <input id="dropzone-file" type="file" onChange={(e) => setFeaturedImage(e.target.files[0])} class="hidden" />
                        </label>
                    </div> 
                    
                </div>
          </div>


          
        </div>
        <div className="bg-white p-5 rounded-2xl w-[40%]" style={{ maxHeight: '700px', overflowY: 'auto' }}>
          <h2 className="text-2xl mb-5">Product Images</h2>
          

                <div className="">
                    <ProductVariableForm/>
                    <div class="flex items-center justify-start gap-2  w-full">                
                    </div>                    
                </div>

        </div>
      </div>
      <div className="mt-6 gap-2 flex">
        <Link
          to=""
          onClick={handleSubmit}
          className="bg-blue-700 p-3 rounded-lg  text-sm
               text-white hover:bg-blue-600 transition duration-150 cursor-pointer gap"
        >
          Save Product
        </Link>
        <Link
          to=""
          className="bg-red-700 p-3 rounded-lg  text-sm
               text-white hover:bg-red-600 transition duration-150 cursor-pointer"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
