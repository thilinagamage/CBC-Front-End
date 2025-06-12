import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Loader from "../../components/Loader";
import ImageSlider from "../../components/imageSlider";
import ProductDetails from "../../components/productDetail";
import PageBanner from "../../components/pageBanner";
import getCart, { addToCart } from "../../../utils/cart";
import toast from "react-hot-toast";

export default function ProductOverview() {
    const params = useParams();
    const navigate = useNavigate();
    console.log(params.id)
    if(params.id == null){
        navigate('/products');
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(
        () => {
            if(status == "loading"){
                axios.get(import.meta.env.VITE_BACKEND_URL + '/api/product/' + params.id)
                .then((response) => {
                    
                    setProduct(response.data);
                    setStatus("loaded");
                })
                .catch((error) => {
                    console.error("Failed to fetch products:", error);
                    setStatus("error");
                });
            }
        }
    )


    return (
        <div className="w-full  flex flex-wrap justify-center  ">

        {
            status == "loading" && <Loader/>
            
        }
        {
            status == "loaded" && <div className="w-[80%] h-full flex ">
                 
                <div>
 
                </div>
                <div className="h-full w-[50%] ">
                    <ImageSlider
                    images={product.product?.images}
                    galleryimages={product.product?.galleryimages}
                    />
                </div>
                <div className="h-full w-[50%]">
                <ProductDetails
                
                name={product.product?.name}
                price={product.product?.price}
                labeledPrice={product.product?.labeledPrice}
                description={product.product?.description}
                />
                    <div className="flex gap-2">
                        <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded cursor-pointer"
                        onClick={() =>{
                            addToCart(product.product);
                            toast.success("Product added to cart");
                        }}
                           
                        
                        >Add to Cart</button>
                        <button className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded cursor-pointer"
                        onClick={() => {
    const productToBuy = {
      ...product.product,
      quantity: 1,
    };
    navigate('/checkout', {
      state: {
        items: [productToBuy],
      },
    });
  }}
                        >Buy Now</button>
                    </div>
                 </div>
                

            </div>
        }
        {
            status == "error" && <div w-full h-full>Erorr</div>
        }
        </div>
    )
}