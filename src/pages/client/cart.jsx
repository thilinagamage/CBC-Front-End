import { RiDeleteBinLine } from "react-icons/ri";
import getCart, { addToCart, removeFromCart } from "../../../utils/cart";
import { useEffect, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!cartLoaded) {
      const cart = getCart();
      setCart(cart);
      setCartLoaded(true);
    }
  }, [cartLoaded]);

  return (
    <div className="w-full min-h-screen flex justify-center items-start bg-gray-100 py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 border-b pb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => {
            const labeledPrice = item.labeledPrice || item.price;
            const hasDiscount = labeledPrice > item.price;
            const discountAmount = hasDiscount ? labeledPrice - item.price : 0;
            const totalLabeled = labeledPrice * item.quantity;
            const totalPrice = item.price * item.quantity;
            const totalDiscount = hasDiscount
              ? discountAmount * item.quantity
              : 0;

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

                {/* Product Info */}
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

                  {hasDiscount && (
                    <p className="text-sm text-green-600">
                      You Save: Rs.{discountAmount.toFixed(2)} per item
                    </p>
                  )}
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      addToCart(item, -1);
                      setCartLoaded(false);
                    }}
                  >
                    <FiMinus />
                  </button>
                  <span className="px-2 py-1 border rounded">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => {
                      addToCart(item, 1);
                      setCartLoaded(false);
                    }}
                  >
                    <GoPlus />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right font-semibold text-gray-800">
                  Rs.{totalPrice.toFixed(2)}
                </div>

                {/* Delete */}
                <div
                  className="text-right text-1xl rounded-full bg-red-800 p-2 text-white hover:bg-red-600 cursor-pointer"
                  onClick={() => {
                    removeFromCart(item.productId);
                    setCartLoaded(false);
                  }}
                >
                  <RiDeleteBinLine />
                </div>
              </div>
            );
          })
        )}

        {/* Totals */}
        {cart.length > 0 &&
          (() => {
            const totalLabeled = cart.reduce(
              (acc, item) =>
                acc + (item.labeledPrice || item.price) * item.quantity,
              0
            );
            const totalCurrent = cart.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            );
            const totalDiscount = totalLabeled - totalCurrent;

            return (
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
              </div>
            );
          })()}

        <button
          className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded cursor-pointer"
          onClick={() => {
            navigate("/checkout", {
              state: {
                items: cart,
              },
            });
          }}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
