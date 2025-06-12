import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProductCard({ product, className }) {
  const [hoverImage, setHoverImage] = useState(null);
      const handleMouseEnter = () => {
        if (product.galleryimages && product.galleryimages.length > 0) {
            setHoverImage(product.galleryimages[0]); // set to first gallery image
        }
    };

    const handleMouseLeave = () => {
        setHoverImage(null); // revert back to original image
    };
  return (
    

    <div className="mt-4 mb-4 w-[350px] h-full "  onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
    
        <div className="flex items-center justify-center bg-white group ">
          <div className="w-80 h-[550px] hover:border border-blue-200 rounded-lg shadow-md p-4">

            {/* Discount Badge */}
              <Link to={"/overview/"+product.productId}>
                <div className="relative">
                  <span className="absolute top-2 left-2 bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    -20%
                  </span>
                  {/* Wishlist Icon */}
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                      />
                    </svg>
                  </button>
                  {/* Product Image */}
                  <div>
                      <div className="relative w-full h-[380px] overflow-hidden rounded mb-4 ">
                        {/* Main image */}
                        <img
                          src={product.images}
                          alt={product.name}
                          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:-translate-x-full"
                        />

                        {/* Hover image slides in */}
                        {product.galleryimages && product.galleryimages.length > 0 && (
                          <img
                            src={product.galleryimages[0]}
                            alt={product.name + ' alt'}
                            className="absolute top-0 left-full w-full h-full object-cover transition-transform duration-500 group-hover:-translate-x-full"
                          />
                        )}
                      </div>
                  </div>
                </div>
              </Link>

            {/* Product Details */}
            <div className="mt-4">
              <Link to={"/overview/"+product.productId}>
                <h2 className="text-gray-800 font-medium text-xl">
                {product.name}
                </h2>
              
              </Link>
              
           
              
              {/* Pricing */}
              <div className="flex items-end justify-between">
                <div className="flex items-baseline space-x-2 mt-2">
                  <span className="text-black text-3xl font-semibold">Rs.{product.price}</span>
                  <span className="text-gray-400 text-xl line-through">Rs.{product.labeledPrice.toFixed(2)}</span>
                </div>
                <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shadow text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l14 1l-1 7h-13" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>


    </div>
  )
}
