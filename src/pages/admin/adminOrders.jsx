import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [order, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [modelIsDisplaying, setModelIsDisplaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayingOrder, setDisplayingOrder] = useState(null);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/order", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          console.log(response.data);
          setOrders(response.data);
          setLoaded(true);
        });
    }
  }, [loaded]);

  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = order.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(order.length / itemsPerPage);

  function chnageOrderStatus(orderId, status) {
    const token = localStorage.getItem("token"); 
    axios.put(
      import.meta.env.VITE_BACKEND_URL + "/api/order/" + orderId,
      {
        status: status,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(() => {
        toast.success("Status changed successfully");
        setLoaded(false);
      })
  }
  return (
    <div>
      <div className="mb-5">
        <h3 className="text-2xl font-semibold">Orders</h3>
      </div>
      <div className="bg-white p-5 rounded-2xl">

        <div className="w-full h-full">
          <div className="overflow-x-auto rounded-lg shadow-md">
            {loaded && (
              <table className="min-w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-100 text-black">
                  <tr>
                    <th className=" text-center px-2 py-3">#</th>
                    <th className=" py-3">Order ID</th>
                    <th className=" py-3">Customer Name</th>
                    <th className=" py-3">Address</th>
                    <th className=" py-3">Email</th>
                    <th className=" py-3">Phone</th>
                    <th className=" py-3">Total (Rs.)</th>
                    <th className=" py-3">Date</th>
                    <th className=" py-3">Status</th>
                    <th className=" py-3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentItems.map((order, index) => (
                    <tr
                       key={order.orderId || order.id || index}
                      
                    >
                      <td className="text-center px-2 py-3 font-medium text-gray-900">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className=" py-2">{order.orderId}</td>
                      <td className=" py-2">{order.name}</td>
                      <td className=" py-2">{order.address}</td>
                      <td className=" py-2">{order.email}</td>
                      <td className=" py-2">{order.phoneNumber}</td>
                      <td className=" py-2">{order.total.toFixed(2)}</td>
                      <td className=" py-2">
                        {new Date(order.date).toDateString()}
                      </td>
                      <td className=" py-2">
                          <select value={order.status} onChange={(e) => chnageOrderStatus(order.orderId, e.target.value)}>
                            <option value={"Pending"}>Pending</option>
                            <option value={"Delivered"}>Delivered</option>
                            <option value={"Cancelled"}>Cancelled</option>
                            <option value={"Processing"}>Processing</option>
                            
                            
                          </select>

                      </td>

                      <td className=" py-2 flex gap-2">
                        <div className="p-1 rounded-lg text-blue-600 text-[23px] hover:bg-blue-800 hover:text-white transition duration-150">
                          <CiEdit className="cursor-pointer" />
                        </div>
                        <div className="p-1 rounded-lg text-red-600 text-[23px] hover:bg-red-800 hover:text-white transition duration-150">
                          <AiOutlineDelete
                            className="cursor-pointer" />
                        </div>
                        <div>
                          <button
                            className="p-1 rounded-lg text-green-600 text-[23px] hover:bg-green-800 hover:text-white transition duration-150"
                            onClick={() => {
                              setDisplayingOrder(order);
                              setModelIsDisplaying(true);
                            }}
                          >
                            <AiOutlineEye />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {modelIsDisplaying && (
              <div className="fixed inset-0  bg-[#00000090] bg-opacity-50 flex justify-center items-center z-50">
                <div className="relative bg-white rounded shadow-lg   max-w-[600px] max-h-[650px] w-[600px] h-[650px]">
                  <button
                    className="cursor-pointer absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-[30px] h-[30px] flex items-center justify-center shadow-md hover:bg-red-600"
                    onClick={() => setModelIsDisplaying(false)}
                  >
                    <IoMdClose />
                  </button>
                  <div className="items-center justify-center text-center p-2">
                    <h2 className="text-2xl font-semibold">
                      Order Information
                    </h2>
                  </div>
                  <div className="h-[150px] w-full ">
                    <div className="h-full w-full bg-blue-600 pl-5 pt-2">
                      <h3 className="text-[20px] text-white font-semibold">
                        Order ID : {displayingOrder.orderId}
                      </h3>
                      <h3 className="text-[20px] text-white font-semibold">
                        Date : {new Date(displayingOrder.date).toDateString()}
                      </h3>
                      <h3 className="text-[20px] text-white font-semibold">
                        Status : {displayingOrder.status}
                      </h3>
                      <h3 className="text-[20px] text-white font-semibold">
                        Total : {displayingOrder.total.toFixed(2)}
                      </h3>
                    </div>
                  </div>
                  <div className="h-[450px] w-full  overflow-y-scroll p-5">
                    {displayingOrder.billItems.map((item, index) => {
                        const labeledPrice = item.labeledPrice || item.price;
                        const hasDiscount = labeledPrice > item.price;
                        const discountAmount = hasDiscount ? labeledPrice - item.price : 0;
                        const totalLabeled = labeledPrice * item.quantity;
                        const totalPrice = item.price * item.quantity;

                         const key = item.id || item.productId || `${item.name}-${index}`;
                         console.log("Order Item:", item);

                      return (

                        
                         <div key={key} className="flex flex-col md:flex-row items-center justify-between border-b py-4 gap-4">
                          {/* Image */}
                          <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <img
                               src={item.image || "/placeholder.jpg"}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 md:px-4 text-center md:text-left">
                            <h3 className="text-lg font-semibold">
                              {item.name}
                            </h3>

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
                                You Save: Rs.{discountAmount.toFixed(2)} per
                                item
                              </p>
                            )}
                          </div>

                          {/* Subtotal */}
                          <div className="text-right font-semibold text-gray-800">
                            Rs.{totalPrice.toFixed(2)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {!loaded && <Loader />}

            <div className="flex justify-center mt-4 mb-4 gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
