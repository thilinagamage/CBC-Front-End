
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../../utils/mediaUpload";

export default function EdtProductForm() {
  const locationData = useLocation(); 
  const navigate = useNavigate();

  if(locationData.state == null){
    toast.error("Please select product to edit.");
    //window.location.href = "/dashboard/products";
    navigate('/dashboard/products');
  }
  const [productId, setProductId] = useState(locationData.state.productId);
  const [productName, setProductName] = useState(locationData.state.name);
  const [productAltName, setProductAltName] = useState(locationData.state.altNames.join(","));
  const [productDescription, setProductDescription] = useState(locationData.state.description);
  const [stock, setStock] = useState(locationData.state.stock);
  const [labeledPrice, setLabeledPrice] = useState(locationData.state.labeledPrice);
  const [price, setPrice] = useState(locationData.state.price);
  const [file, setFile] = useState(null);	
const [featuredImagePreview, setFeaturedImagePreview] = useState(
  Array.isArray(locationData.state.images) ? locationData.state.images[0] : null
);
const [galleryImages, setGalleryImages] = useState(
  locationData.state.galleryimages?.map((url) => ({ file: null, preview: url })) || []
);


 

const handleGalleryChange = (e) => {
  const files = Array.from(e.target.files);
  const totalFiles = galleryImages.length + files.length;

  if (totalFiles > 5) {
    alert("You can upload a maximum of 5 images.");
    return;
  }

  const imagePreviews = files.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  setGalleryImages((prev) => [...prev, ...imagePreviews]);
};




  async function handleSubmit() {
    
             const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You are not authorized. Please log in.");
    return;
  }

  try {
    // Upload featured image
const featuredImageUrl = file
  ? await mediaUpload(file)
  : featuredImagePreview; // use existing image if not changed



    // Upload gallery images
   const galleryUrls = await Promise.all(
  galleryImages.map(async ({ file, preview }) => {
    if (file) {
      return await mediaUpload(file); // new file
    } else {
      return preview; // already uploaded image
    }
  })
);


    const productAltNamesInArray = productAltName.split(",");

    const product = {
      productId: productId,
      name: productName,
      altNames: productAltNamesInArray,
      description: productDescription,
      stock: Number(stock),
      labeledPrice: Number(labeledPrice),
      price: Number(price),
      images: [featuredImageUrl],
      galleryimages: galleryUrls,
    };
console.log(product)
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/product/${productId}`, product, {
      headers: { Authorization: "Bearer " + token },
    });

    toast.success("Product updated successfully");
    navigate("/dashboard/products");
  } catch (error) {
    console.error("Submit error:", error);
    toast.error("Failed to update product");
  }
  }

  
    useEffect(() => {
    return () => {
      if (featuredImagePreview && typeof featuredImagePreview === 'string') {
        URL.revokeObjectURL(featuredImagePreview);
      }
    };
  }, [featuredImagePreview]);

  return (
    <div>
      <div className="mb-5">
        <h3 className="text-2xl font-semibold">Edit Prodconsuct</h3>
      </div>
      <div className="flex flex-raw gap-4">
        <div className="bg-white p-5 rounded-2xl w-[60%]">
          <h2 className="text-2xl mb-5">Product Information</h2>

          <label htmlFor="">Product ID</label>
          <input disabled
            id="product-id"
            name="product-id"
            value={productId}
            onChange={(e) => {
              setProductId(e.target.value);
            }}
            type="text"
            placeholder="Product ID"
            className="block cursor-not-allowed w-full rounded-md bg-blue-50 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 
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


          <div id="single-produt-info">
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

                  <div className="w-full flex flex-row gap-4">
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


              </div>  

          </div>

          
        </div>

        <div className="bg-white  p-5 rounded-2xl w-[40%]" >
          <h2 className="text-2xl mb-5">Product Images</h2>
          

              <div className="">
                    <div className="flex items-center justify-start gap-2  w-full"> 
                      <div className="mb-5">
                        <h4 className="mb-2 font-medium text-gray-800">Featured Image</h4>
                        <div className="relative w-full">
                          <label htmlFor="featured-image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl 
                              bg-gray-50 hover:bg-gray-100 transition duration-200 cursor-pointer"  >
                                  {featuredImagePreview ? (
                                  <img  src={featuredImagePreview} alt="Preview" className="object-cover w-full h-full rounded-xl" />
                                    ) : (
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg  className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"  >
                                      <path strokeLinecap="round" strokeLinejoin="round"  d="M7 16V4m0 0l-4 4m4-4l4 4M17 8v12m0 0l-4-4m4 4l4-4" />
                                    </svg>
                                    <p className="text-sm text-gray-500">
                                      <span className="font-semibold">Click to upload</span> or drag & drop
                                    </p>
                                  </div>
                                )}
                               <input
                                  type="file"
                                  id="featured-image-upload"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const selectedFile = e.target.files[0];
                                    if (selectedFile) {
                                      setFile(selectedFile);
                                      setFeaturedImagePreview(URL.createObjectURL(selectedFile));
                                    }
                                  }}
                                  className="hidden"
                                />
                          </label>
                        </div>
                      </div>                  
                    </div>                    
              </div>
              <div className="">
<div className="w-full">
  <h4 className="text-lg font-medium mb-2">Product Image Gallery</h4>
  
  <div className="flex flex-wrap gap-4 mb-2">
    {galleryImages.map((img, index) => (
      <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden shadow-sm">
        <img
          src={img.preview}
          alt={`Gallery Preview ${index}`}
          className="object-cover w-full h-full"
        />
        <button
          type="button"
          className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
          onClick={() => {
            const updatedGallery = [...galleryImages];
            updatedGallery.splice(index, 1);
            setGalleryImages(updatedGallery);
          }}
        >
          ✕
        </button>
 </div>
    ))}

    {/* Upload New Images */}
    {galleryImages.length < 5 && (
      <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
        <span className="text-gray-400 text-sm">+</span>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleGalleryChange}
          className="hidden"
        />
      </label>
    )}
  </div>

  <p className="text-sm text-gray-500">You can upload up to 5 images.</p>
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
          Update Product
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