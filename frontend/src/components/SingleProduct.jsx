import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa6";
import { get } from "../utils/api";
const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  console.log(product, " :Product");

  // const mockData = [
  //   {
  //     id: 1,
  //     name: "iPhone 13",
  //     image:
  //       "https://i.pinimg.com/736x/5d/c0/cf/5dc0cf0585fc6242d92b643c54f30476.jpg",
  //     category: "Electronics",
  //     price: 999,
  //     discount: 10,
  //     description:
  //       "The iPhone 13 features a sleek design, a powerful A15 Bionic chip, and an advanced dual-camera system for stunning photography.",
  //   },
  //   {
  //     id: 2,
  //     name: "Summer set",
  //     image:
  //       "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Clothing",
  //     price: 1200,
  //     discount: 15,
  //     description:
  //       "Stay stylish and comfortable with this premium summer outfit set, designed for breathability and fashion-forward looks.",
  //   },
  //   {
  //     id: 3,
  //     name: "Samsung Galaxy S21",
  //     image:
  //       "https://i.pinimg.com/736x/c1/20/3d/c1203d1d8f6994b4fa91fcbb482ccf1e.jpg",
  //     category: "Electronics",
  //     price: 899,
  //     discount: 12,
  //     description:
  //       "Samsung Galaxy S21 offers a dynamic AMOLED 2X display, powerful Exynos 2100 processor, and pro-grade cameras.",
  //   },
  //   {
  //     id: 4,
  //     name: "MacBook Pro 13",
  //     image:
  //       "https://i.pinimg.com/736x/a1/63/24/a16324df4f993b1b12d94a95f66764ad.jpg",
  //     category: "Electronics",
  //     price: 1300,
  //     discount: 8,
  //     description:
  //       "MacBook Pro 13 comes with the Apple M1 chip, Retina display, and all-day battery life for ultimate performance.",
  //   },
  //   {
  //     id: 5,
  //     name: "Coat set",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1676225680209-19a398a9b38a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Clothing",
  //     price: 7500,
  //     discount: 18,
  //     description:
  //       "This elegant coat set is designed for a sophisticated look, perfect for formal and winter occasions.",
  //   },
  //   {
  //     id: 6,
  //     name: "Winter set",
  //     image:
  //       "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Clothing",
  //     price: 2777,
  //     discount: 10,
  //     description:
  //       "Stay warm and stylish with this high-quality winter clothing set, perfect for chilly days.",
  //   },
  //   {
  //     id: 7,
  //     name: "Dell XPS 13",
  //     image:
  //       "https://i.pinimg.com/736x/f5/95/1b/f5951b5564d563e51f53a5cdec268815.jpg",
  //     category: "Electronics",
  //     price: 1200,
  //     discount: 10,
  //     description:
  //       "Dell XPS 13 features an InfinityEdge display, 11th Gen Intel processors, and an ultra-thin design for portability.",
  //   },
  //   {
  //     id: 8,
  //     name: "Apple",
  //     image:
  //       "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Food",
  //     price: 300,
  //     discount: 5,
  //     description:
  //       "Fresh and juicy apples packed with nutrients to boost your health and well-being.",
  //   },
  //   {
  //     id: 9,
  //     name: "Apple Watch Series 7",
  //     image:
  //       "https://i.pinimg.com/736x/61/e9/ff/61e9ffac91f05bb610c6c774f17c7177.jpg",
  //     category: "Electronics",
  //     price: 400,
  //     discount: 10,
  //     description:
  //       "Apple Watch Series 7 comes with a larger, always-on Retina display and advanced health tracking features.",
  //   },
  //   {
  //     id: 10,
  //     name: "Sony WH-1000XM4",
  //     image:
  //       "https://i.pinimg.com/736x/c3/8f/ab/c38fabd0168efa39bf9f86ccbf6b881e.jpg",
  //     category: "Electronics",
  //     price: 350,
  //     discount: 12,
  //     description:
  //       "Sony WH-1000XM4 offers industry-leading noise cancellation and superior sound quality for an immersive listening experience.",
  //   },
  //   {
  //     id: 11,
  //     name: "Winter set",
  //     image:
  //       "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Clothing",
  //     price: 2777,
  //     discount: 10,
  //     description:
  //       "A stylish and warm winter clothing set that keeps you comfortable in cold weather.",
  //   },
  //   {
  //     id: 12,
  //     name: "Summer set",
  //     image:
  //       "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Clothing",
  //     price: 1200,
  //     discount: 15,
  //     description:
  //       "Perfect for summer, this lightweight and comfortable clothing set is a must-have for the season.",
  //   },
  //   {
  //     id: 13,
  //     name: "Canon EOS R8 Camera",
  //     image:
  //       "https://i1.adis.ws/i/canon/eos-r8-frt_gallery-module_05_365x228_aa065f319187416e9ccdd3d67a9ba48b?$hotspot-dt-jpg$",
  //     category: "Electronics",
  //     price: 30000,
  //     discount: 8,
  //     description:
  //       "Canon EOS R8 Camera delivers exceptional image quality, fast autofocus, and 4K video recording capabilities.",
  //   },
  //   {
  //     id: 14,
  //     name: "Wireless Bluetooth Headphones",
  //     image: "https://m.media-amazon.com/images/I/616tDnOfX4L._AC_SL1500_.jpg",
  //     category: "Electronics",
  //     price: 8000,
  //     discount: 10,
  //     description:
  //       "Enjoy high-quality audio and wireless convenience with these Bluetooth headphones, featuring long battery life.",
  //   },
  // ];
  const fetchData = async () => {
    const res = await get(`/api/get-products-by-id/${parseInt(id)}`);

    console.log(res, ":RES");
    if (res.length > 0 && res[0].images) {
      res[0].images = res[0].images.split(","); // Convert string to array
    }
    console.log(res[0]?.images, " :res");
    setProduct(res);
  };

  useEffect(() => {
    fetchData();
    // const selectedProduct = mockData.find((item) => item.id === parseInt(id));
    // setProduct(selectedProduct);
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-700">
        Product not found
      </div>
    );
  }

  const discountedPrice = (
    product[0].price *
    (1 - product[0].discount / 100)
  ).toFixed(2);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="container mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-10 flex flex-col md:flex-row gap-10 max-w-4xl">
        <div className="w-full md:w-1/2 flex justify-center ">
          <img
            src={`http://localhost:5555/${product[0]?.images[0]}`}
            alt={product[0].name}
            className="w-full h-auto rounded-xl shadow-md transition-transform transform hover:scale-105"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            {product[0].name}
          </h1>
          <p className="text-gray-500 text-lg mb-2 font-medium">
            Category:{" "}
            <span className="text-gray-700">{product[0].category}</span>
          </p>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {product[0].description}
          </p>
          <p className="text-xl font-semibold text-gray-700 ">
            Original Price:{" "}
            <span className="line-through">Rs. {product[0].price}</span>
          </p>
          <p className="text-2xl font-bold text-green-600">
            Rs. {discountedPrice} ({product[0].discount}% OFF)
          </p>

          <div className="flex justify-between">
            <button
              onClick={() => navigate(`/product/checkout/${product[0].pid}`)}
              className="cursor-pointer mt-6 bg-[#1f385c] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md text-lg font-medium transform hover:scale-105 flex gap-2 items-center"
            >
              <FaRegCreditCard /> Buy
            </button>
            <button className="cursor-pointer mt-6 bg-transparent border-2 border-[#1f385c]  text-[#1f385c] px-6 py-3 rounded-lg transition-all shadow-md text-lg font-medium transform hover:scale-105 flex gap-2 items-center">
              <FaCartArrowDown /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
