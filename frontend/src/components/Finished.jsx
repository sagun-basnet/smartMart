import React, { useEffect, useState } from "react";
import image from "../image/svg/thankyou.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Finished = () => {
  const { pid } = useParams(); // This is encoded array of product ids (base64)
  console.log("Encoded Product IDs:", pid);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const decodedIds = JSON.parse(atob(decodeURIComponent(pid)));
      const idsQuery = decodedIds.join(",");

      const response = await axios.post(
        "http://localhost:5555/api/get-products-by-ids",
        { ids: decodedIds }
      );

      console.log("Fetched products:", response.data);
      setProducts(response.data);
    } catch (err) {
      console.log("Error fetching multiple product details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pid]);

  return (
    <div className="flex justify-center items-center h-[100vh] w-full px-20">
      <div className="w-1/2">
        <img className="w-full h-full" src={image} alt="Booking Confirmed" />
      </div>
      <div className="w-1/2 flex flex-col items-center gap-4">
        <h1 className="text-6xl font-bold text-primary">Booking Confirmed</h1>
        <p className="text-lg text-center bg-primary p-1 font-bold">
          Your booking has been confirmed. Thank you for choosing us.
        </p>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {products.map((product, index) => {
              const images =
                product.images?.replace(/\\/g, "/").split(",") || [];
              return (
                <div key={index} className="border w-full mb-4 p-3">
                  <div className="flex justify-center gap-4">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={`http://localhost:5555${img}`}
                        alt="product"
                        className="w-[100px] h-[100px] object-cover border"
                      />
                    ))}
                  </div>
                  <div className="flex flex-col mt-2">
                    <p className="text-lg">Product Name: {product.title}</p>
                    <p className="text-lg">Price: Rs. {product.price}</p>
                  </div>
                </div>
              );
            })}
          </>
        )}

        <div className="flex border-2 w-full justify-evenly">
          <div className="flex flex-col items-center w-1/2 border-2">
            <h1 className="text-2xl font-bold">Shopping Details</h1>
            <p className="text-lg">Total Products: {products.length}</p>
          </div>
          <div className="w-1/2 flex flex-col justify-end items-center border-2">
            <h1 className="text-2xl font-bold">Contact Details</h1>
            <p className="text-lg">Name: Admin</p>
            <p className="text-lg">Email: smartmart@gmail.com</p>
            <p className="text-lg">Phone: 9845645612</p>
          </div>
        </div>

        <div className="flex">
          <Link to="/">
            <button className="bg-green-600 text-white p-2 px-4 rounded-md">
              Go To Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Finished;
