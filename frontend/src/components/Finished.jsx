import React, { useEffect, useState } from "react";
import image from "../image/svg/thankyou.svg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const Finished = () => {
  const { pid } = useParams();
  const [data, setData] = useState({});
  const [imageArr, setImageArr] = useState([]);
  console.log(imageArr);
  console.log(data);

  const [date, setDate] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5555/api/get-products-by-id/${pid}`
      );
      console.log(response);

      setData(response.data[0]);

      // Ensure correct image paths
      const images = splitImagePaths(response.data[0]?.images);
      setImageArr(images);

      // Proper date formatting
      let inputDate = new Date(response.data.date);
      let formattedDate = inputDate
        .toLocaleDateString("en-CA")
        .replace(/-/g, "/");
      setDate(formattedDate);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pid]);

  function splitImagePaths(imageString) {
    return imageString ? imageString.replace(/\\/g, "/").split(",") : [];
  }

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
        <div className="flex justify-between">
          {imageArr.map((img, index) => (
            <div key={index} className="w-full h-[10rem]">
              <img
                className="w-full h-full border-2"
                src={`http://localhost:5555${img}`}
                alt="package"
              />
            </div>
          ))}
        </div>
        <div className="flex border-2 w-full justify-evenly">
          <div className="flex flex-col items-center w-1/2 border-2">
            <h1 className="text-2xl font-bold">Shopping Details</h1>
            <p className="text-lg">Product Name: {data.title}</p>
            <p className="text-lg">Price: {data.price}</p>
            {/* <p className="text-lg">Date: {date}</p> */}
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
