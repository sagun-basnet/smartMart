import React from "react";
import { BiSolidCartAdd } from "react-icons/bi";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  console.log(data?.images, " :");
  const str = String(data?.images);
  const beforeComma = str.slice(0, str.indexOf(","));
  console.log(beforeComma); // Output: "Hello"

  const id = 3;
  return (
    <Link to={`/products/${data.pid}`}>
      <div className="flex flex-col h-[29.5rem] shadow-xl relative rounded-t-xl">
        <div className="h-[17rem]">
          <img
            className="w-full h-full rounded-t-lg"
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
        </div>
        <div className="flex w-full flex-col gap-4 p-4 absolute bottom-0 h-[14rem] bg-white rounded-t-4xl">
          <h2 className="text-3xl font-bold text-center">{data.title}</h2>
          <p className="text-justify">{data.description}</p>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <span className="line-through">Rs. {data.price}</span>
              <span className="font-bold text-[#00A63E] text-xl">
                Rs.{" "}
                {parseInt(
                  data.price - (parseInt(data.discount) / data.price) * 100
                )}
              </span>
            </div>
            <button className=" bg-[#1f385c] text-white px-6 py-1 rounded-lg hover:bg-blue-600 transition-all cursor-pointer">
              <BiSolidCartAdd className=" text-2xl" />{" "}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
