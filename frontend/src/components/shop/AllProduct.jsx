import React, { useEffect, useState } from "react";
import Card from "./Card";
import { get } from "../../utils/api";

const AllProduct = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await get("/api/get-products");
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex flex-col">
      <h1 className="text-6xl text-center font-bold">All Products</h1>
      <div className="grid grid-cols-3 overflow-y-scroll h-[calc(100vh-9rem)] gap-6 p-4">
        {data.map((item, ind) => {
          return <Card data={item} ind={ind} />;
        })}
      </div>
    </div>
  );
};

export default AllProduct;
