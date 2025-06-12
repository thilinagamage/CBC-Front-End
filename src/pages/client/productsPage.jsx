import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import axios from "axios";
import ProductCard from "../../components/productCard";
import { Link } from "react-router-dom";

export default function ProductsPage() {
    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
        if (!productsLoaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + '/api/product')
                .then((response) => {
                    console.log("Response Data:", response.data);
                    const data = response.data || [];
                    setProductList(data);
                    setProductsLoaded(true);
                })
                .catch((error) => {
                    console.error("Failed to fetch products:", error);
                    setProductsLoaded(true);
                });
        }
    }, [productsLoaded]);

    return (
        <div className="w-full h-full bg-white p-4 flex flex-wrap justify-center">
            {
                productsLoaded ? (
                    productList.length > 0 ? (
                        productList.map((product, index) => (
                            <div key={product.productId || index}>
                                <Link>
                                </Link>
                                <ProductCard 
                                    product={product}
                                    className="border  bg-white rounded shadow"
                                />
                            </div>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )
                ) : (
                    <Loader />
                )
            }
        </div>
    );
}
