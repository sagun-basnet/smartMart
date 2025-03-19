import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { AuthContext } from "../context/authContext";

import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import { get } from "../utils/api";
import { post } from "../utils/api";

const Checkout = () => {
  const { id } = useParams();
  // console.log(id, "pid");

  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.id);

  const [products, setProducts] = useState([]);
  const [esewa, setEsewa] = useState({});

  // console.log(parseInt(products?.price), "From esewa state");

  const [img, setImg] = useState("");
  // console.log(esewa?.signature);
  // console.log(esewa?.uuid);

  const loadEsewa = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5555/api/verifyEsewa/${parseInt(id)}`
      );
      setEsewa(response.data);
      console.log(response.data, 33);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadEsewa();
  }, []);
  function splitImagePaths(imageString) {
    // Check if imageString is not null before splitting
    return imageString ? imageString.split(",") : [];
  }

  const loadData = async () => {
    try {
      const response = await get(`/api/get-products-by-id/${parseInt(id)}`);

      setProducts(response);
      setImg(splitImagePaths(response.images)[0]);
    } catch (err) {
      console.log("error aayo data fetch garda: ".err);
    }
  };
  // console.log(img);

  useEffect(() => {
    loadData();
  }, []);
  const str = String(products[0]?.images);
  const beforeComma = str.slice(0, str.indexOf(","));

  const navigation = useNavigate();

  function formatNumberCustom(number) {
    if (!number) {
      return ""; // Return empty string if number is undefined or null
    }

    // Convert the number to a string and reverse it for easier manipulation
    let numStr = number.toString().split("").reverse().join("");

    // Group the reversed string into the first 3 digits and the rest in pairs of 2
    let firstPart = numStr.slice(0, 3); // First 3 digits
    let restPart = numStr.slice(3); // Rest of the digits

    // Group the rest digits in pairs of 2
    let groupedRest = restPart.match(/.{1,2}/g) || [];

    // Combine the first part and grouped rest with commas
    let formattedNumber =
      firstPart + (groupedRest.length ? "," + groupedRest.join(",") : "");

    // Reverse the string back to its correct form and return it
    return formattedNumber.split("").reverse().join("");
  }

  const discountedPrice = (
    products[0]?.price *
    (1 - products[0]?.discount / 100)
  ).toFixed(2);

  // const products[0]? = products.find((product) => product.pid === parseInt(pid));
  return (
    <div className="w-full h-[100vh] flex justify-center items-center font-heading">
      <div className="flex w-[70%] h-[80%] relative rounded-xl shadow-2xl  p-6">
        <button
          className="absolute top-2 left-2"
          onClick={() => navigation(-1)}
        >
          <IoMdArrowRoundBack className="text-2xl" />
        </button>
        <div className="detail w-1/2 h-full p-8 flex flex-col gap-8">
          <div className="userName flex items-center gap-2">
            <div className="rounded-full w-10 h-10 grid place-items-center text-xl font-bold bg-blue-500 font-heading">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <span className="capitalize font-semibold">{currentUser.name}</span>
          </div>
          <div className="product flex border-2 p-2">
            <div className="img h-[5rem]">
              <img
                className="h-full w-full"
                src={`http://localhost:5555${beforeComma}`}
                alt=""
              />
            </div>
            <div className="flex flex-col w-full">
              <div className=" detail font-bold text-lg flex justify-between w-[100%] p-2">
                <div className="flex flex-col">
                  {" "}
                  Package name: &nbsp;
                  <span className=" text-blue-500"> {products[0]?.title}</span>
                </div>
                <span className="font-bold text-lg">
                  Rs.{formatNumberCustom(parseInt(products[0]?.price))}
                </span>
              </div>
            </div>
          </div>
          <div className=" flex items-end flex-col">
            <span className=" w-[70%] flex justify-between">
              <span>Subtotal</span>
              <span>
                Rs. {formatNumberCustom(parseInt(products[0]?.price))}
              </span>
            </span>
            <span className=" w-[70%] flex justify-between">
              <span>Extra Charge</span>
              <span>{products[0]?.discount}%</span>
            </span>
            <span className=" w-[70%] flex justify-between">
              <span>Discound percent</span>
              <span>-</span>
            </span>
            <span className=" w-[70%] font-bold flex justify-between">
              <span>Total Due</span>
              <span>Rs. {formatNumberCustom(parseInt(discountedPrice))}</span>
            </span>
          </div>
        </div>
        <div className="h-full border-2" />
        <div className="payment  w-1/2 h-full flex flex-col justify-center items-center relative p-8 gap-2">
          <button
            onClick={() => navigation(-1)}
            className="rounded-md p-2 px-6 bg-[#FF0000] hover:bg-red-600 my-transition font-bold absolute bottom-0 right-6 text-white"
          >
            Cancel
          </button>

          <h1 className="mb-16 text-5xl font-bold">Payment Option</h1>
          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
            className="w-full"
          >
            <input
              hidden
              type="text"
              id="amount"
              name="amount"
              value={parseInt(discountedPrice)}
              required
            />
            <input
              hidden
              type="text"
              id="tax_amount"
              name="tax_amount"
              value="0"
              required
            />
            <input
              hidden
              type="text"
              id="total_amount"
              name="total_amount"
              value={parseInt(discountedPrice)}
              required
            />
            <input
              hidden
              type="text"
              id="transaction_uuid"
              name="transaction_uuid"
              value={esewa?.uuid}
              required
            />
            <input
              hidden
              type="text"
              id="product_code"
              name="product_code"
              value="EPAYTEST"
              required
            />
            <input
              hidden
              type="text"
              id="product_service_charge"
              name="product_service_charge"
              value="0"
              required
            />
            <input
              hidden
              type="text"
              id="product_delivery_charge"
              name="product_delivery_charge"
              value="0"
              required
            />
            <input
              hidden
              type="text"
              id="success_url"
              name="success_url"
              value={`http://localhost:5555/api/success/${id}/${currentUser.id}`}
              required
            />
            <input
              hidden
              type="text"
              id="failure_url"
              name="failure_url"
              value="http://localhost:5173"
              required
            />
            <input
              hidden
              type="text"
              id="signed_field_names"
              name="signed_field_names"
              value="total_amount,transaction_uuid,product_code"
              required
            />
            <input
              hidden
              type="text"
              id="signature"
              name="signature"
              value={esewa?.signature}
              required
            />
            <div className="esewa w-full grid place-items-center">
              <button
                className=" p-2 px-4 w-[60%] rounded-md bg-[#67BD4C] hover:bg-[#6fff43]"
                type="submit"
              >
                pay via esewa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
