import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import getCart from "../../../utils/cart";
import axios from "axios";
import toast from "react-hot-toast";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhoneNumber] = useState("");



    useEffect(() => {
        if (location.state?.items) {
            setItems(location.state.items);
        } else {
            
            setItems(getCart());
        }
    }, [location.state]);

    const totalLabeled = items.reduce(
        (acc, item) =>
            acc + ((item.labeledPrice || item.price) * item.quantity),
        0
    );
    const totalCurrent = items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const totalDiscount = totalLabeled - totalCurrent;

    function placeOrder() {
        const orderData = {
            name : name,
            address : address,
            phoneNumber : phone,
            billItems:[],
            
        };
        for(let i = 0; i < items.length; i++){
            orderData.billItems[i] = {
                productId : items[i].productId,
                quantity : items[i].quantity,
                image: items[i].images?.[0] || null  // add featured image URL if exists
            }
        }
        const token = localStorage.getItem("token");
        axios.post(import.meta.env.VITE_BACKEND_URL + '/api/order', orderData, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then(
            (response) => {
                toast.success("Order placed successfully");
                navigate("/");
                console.log(response.data);
            }
        ).catch(
            (error) => {
                toast.error("Order failed");
                console.log(error);
            }
        )
        console.log(orderData);
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-start bg-gray-100 py-10">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 border-b pb-4">Checkout</h2>

                {items.length === 0 ? (
                    <p className="text-gray-500 text-center">No items to checkout.</p>
                ) : (
                    items.map((item, index) => {
                        const labeledPrice = item.labeledPrice || item.price;
                        const hasDiscount = labeledPrice > item.price;
                        const discountAmount = hasDiscount ? labeledPrice - item.price : 0;
                        const totalItemLabeled = labeledPrice * item.quantity;
                        const totalItemPrice = item.price * item.quantity;

                        return (
                            <div
                                key={index}
                                className="flex flex-col md:flex-row items-center justify-between border-b py-4 gap-4"
                            >
                                {/* Image */}
                                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border">
                                    <img
                                        src={item.images?.[0] || "/placeholder.jpg"}
                                        alt={item.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 md:px-4 text-center md:text-left">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>

                                    {hasDiscount && (
                                        <p className="text-sm text-gray-500 line-through">
                                            Labeled Price: Rs.{labeledPrice.toFixed(2)}
                                        </p>
                                    )}

                                    <p className="text-md text-gray-800 font-semibold">
                                        Current Price: Rs.{item.price.toFixed(2)}
                                    </p>

                                    <p className="text-sm text-gray-700">
                                        Quantity: {item.quantity}
                                    </p>

                                    {hasDiscount && (
                                        <p className="text-sm text-green-600">
                                            You Save: Rs.{discountAmount.toFixed(2)} per item
                                        </p>
                                    )}
                                </div>

                                {/* Total for this item */}
                                <div className="text-right font-semibold text-gray-800">
                                    Rs.{totalItemPrice.toFixed(2)}
                                </div>
                            </div>
                        );
                    })
                )}

                {/* Totals */}
                {items.length > 0 && (
                    <div className="mt-8 border-t pt-6 text-right space-y-2">
                        <div className="text-gray-600 text-md">
                            Total Labeled Price: Rs.{totalLabeled.toFixed(2)}
                        </div>
                        <div className="text-gray-800 font-semibold">
                            Total Current Price: Rs.{totalCurrent.toFixed(2)}
                        </div>
                        {totalDiscount > 0 && (
                            <div className="text-green-700 font-medium">
                                You Saved: Rs.{totalDiscount.toFixed(2)}
                            </div>
                        )}
                        <div  className="mt-8 border-t pt-6 text-right space-y-2">
                            <input type="text" placeholder="Name" value={name} className="border border-gray-300 rounded-md py-2 px-4 w-full" 
                            onChange={(e) => setName(e.target.value)}
                            />
                            <input type="text" placeholder="Address" value={address} className="border border-gray-300 rounded-md py-2 px-4 w-full" 
                            onChange={(e) => setAddress(e.target.value)}
                            />
                            <input type="number" placeholder="Phone Number" value={phone} className="border border-gray-300 rounded-md py-2 px-4 w-full"
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>
                        <button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white py-2 px-6 rounded"
                        onClick={placeOrder}
                        >
                            Place Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
