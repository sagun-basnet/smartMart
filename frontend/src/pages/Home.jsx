import React, { useState, useEffect } from "react";
import img1 from "../assets/images/img1.jpg";
import { BiSolidCartAdd } from "react-icons/bi";
import { UseCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { get } from "../utils/api";

const Home = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cart, dispatch } = UseCart();
  console.log(cart);
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Product added to cart successfully");
  };

  // Mock data for testing
  const mockData = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/736x/5d/c0/cf/5dc0cf0585fc6242d92b643c54f30476.jpg",
      name: "iPhone 13",
      price: "Rs. 999",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Summer set",
      price: "Rs. 1200",
    },

    {
      id: 3,
      image:
        "https://i.pinimg.com/736x/c1/20/3d/c1203d1d8f6994b4fa91fcbb482ccf1e.jpg",
      name: "Samsung Galaxy S21",
      price: "Rs. 899",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/736x/a1/63/24/a16324df4f993b1b12d94a95f66764ad.jpg",
      name: "MacBook Pro 13",
      price: "Rs. 1300",
    },
    {
      id: 5,
      image:
        "https://plus.unsplash.com/premium_photo-1676225680209-19a398a9b38a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Coat set",
      price: "Rs. 7,500",
    },
  ];
  const hotItem = [
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Winter set",
      price: "Rs. 2777",
    },
    {
      id: 7,
      image:
        "https://i.pinimg.com/736x/f5/95/1b/f5951b5564d563e51f53a5cdec268815.jpg",
      name: "Dell XPS 13",
      price: "Rs. 1200",
    },
    {
      id: 8,
      image:
        "https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Apple",
      price: "Rs. 300",
    },
    {
      id: 9,
      image:
        "https://i.pinimg.com/736x/61/e9/ff/61e9ffac91f05bb610c6c774f17c7177.jpg",
      name: "Apple Watch Series 7",
      price: "Rs. 400",
    },
    {
      id: 10,
      image:
        "https://i.pinimg.com/736x/c3/8f/ab/c38fabd0168efa39bf9f86ccbf6b881e.jpg",
      name: "Sony WH-1000XM4",
      price: "$350",
    },
  ];
  const featureItem = [
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Winter set",
      price: "Rs. 2777",
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Summer set",
      price: "Rs. 1200",
    },
    {
      id: 13,
      image:
        "https://i1.adis.ws/i/canon/eos-r8-frt_gallery-module_05_365x228_aa065f319187416e9ccdd3d67a9ba48b?$hotspot-dt-jpg$",
      name: "Canon EOS R8 Camera",
      price: "Rs. 30000",
    },
    {
      id: 14,
      image: "https://m.media-amazon.com/images/I/616tDnOfX4L._AC_SL1500_.jpg",
      name: "Wireless Bluetooth Headphones",
      price: "Rs. 8000",
    },
  ];
  const fetchData = async () => {
    const res = await get("/api/get-products");
    for (let i = 0; i < res.length; i++) {
      // console.log(res[i].images);
      if (res[i].images) {
        res[i].images = res[i].images.split(","); // Convert string to array
      }
    }
    console.log(res, " :Response");
    setProduct(res);
  };

  useEffect(() => {
    fetchData();
    // Simulate a delay to mock data fetching
    setTimeout(() => {
      // setProduct(mockData);
      setLoading(false);
    }, 1000); // Simulate a 1-second delay

    // Fetch real data from API
    // fetch("http://localhost:5555/api/add-product")
    //     .then((response) => {
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch product");
    //         }
    //         return response.json();  // Parsing the JSON response
    //     })
    //     .then((data) => {
    //         setProduct(Array.isArray(data) ? data : []);
    //         setLoading(false);
    //     })
    //     .catch((error) => {
    //         setError(error.message);
    //         setLoading(false);
    //     });
  }, []);

  // If the data is still loading
  if (loading) return <p>Loading...</p>;

  // If there's an error
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-rows-auto gap-3 px-3">
      {/* Hero Section */}
      <div className="flex justify-center relative mb-5">
        <img
          src={img1}
          alt="Hero Image"
          className="h-[90vh] w-full rounded-2xl"
        />
        <div className="absolute top-1/4 left-8 sm:left-16 md:left-28">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Lorem ipsum <br /> Placeasde
            <br /> asmenda!
          </h1>
          <button className="mt-4 bg-gray-100 h-10 sm:h-12 w-28 sm:w-32 rounded-3xl text-sm font-semibold hover:bg-gray-200">
            Shop Now {" >"}
          </button>
        </div>
      </div>

      {/* Shop by Category */}
      <div>
        <h1 className="font-extrabold text-2xl md:text-4xl text-gray-800 text-center mt-5">
          Shop by Category
        </h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {["Groceries", "Clothes", "Watches", "Electronics"].map(
          (category, index) => (
            <div
              key={index}
              className="shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative p-6 sm:p-10"
            >
              <h1 className="absolute bottom-5 left-1/2 transform -translate-x-1/2 font-semibold">
                {category}
              </h1>
            </div>
          )
        )}
      </div>
      {/* New Arrivals */}
      <div>
        <h1 className="font-extrabold text-2xl md:text-4xl text-gray-900">
          New Arrivals
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
        {[...products]
          .reverse()
          .slice(0, 5)
          .map((product, index) => {
            return (
              <Link to={`/products/${product.pid}`}>
                <div
                  key={index}
                  className="shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4"
                >
                  {/* Image */}
                  <div className="h-36 md:h-44 rounded-2xl">
                    <img
                      src={
                        product?.images
                          ? `http://localhost:5555${product.images[0]}`
                          : `sadgf`
                      }
                      alt={product.name}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="h-20 mt-2  rounded-lg p-2 flex flex-col justify-center">
                    <div className=" w-full h-full overflow-hidden">
                      <h1 className="font-bold">{product.title}</h1>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <p className="text-gray-700 font-semibold">
                        Price: {product.price}
                      </p>
                      <div>
                        <button
                          onClick={() => addToCart(product)}
                          className="bg-[#1f385c] text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all "
                        >
                          <BiSolidCartAdd className=" text-2xl" />{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

      {/* Hot Items*/}
      <div>
        <h1 className="font-extrabold text-2xl md:text-4xl text-gray-900">
          Hot Items
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
        {hotItem.map((product, index) => (
          <Link to={`/products/${product.id}`}>
            <div
              key={index}
              className="shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4"
            >
              {/* Image */}
              <div className="h-36 md:h-44 rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Product Details */}
              <div className="h-20 mt-2  rounded-lg p-2 flex flex-col justify-center">
                <div className=" w-full h-full overflow-hidden">
                  <h1 className="font-bold">{product.name}</h1>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-700 font-semibold">
                    Price: {product.price}
                  </p>
                  <div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#1f385c] text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all "
                    >
                      <BiSolidCartAdd className=" text-2xl" />{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Product */}

      <div>
        <h1 className="font-extrabold text-2xl md:text-4xl text-gray-900">
          Featured Product
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
        {featureItem.map((product, index) => (
          <Link to={`/products/${product.id}`}>
            <div
              key={index}
              className="shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4"
            >
              {/* Image */}
              <div className="h-36 md:h-44 rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              {/* Product Details */}
              <div className="h-20 mt-2  rounded-lg p-2 flex flex-col justify-center">
                <div className=" w-full  overflow-hidden ">
                  <h1 className="font-bold">{product.name}</h1>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-700 font-semibold">
                    Price: {product.price}
                  </p>
                  <div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#1f385c] text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all "
                    >
                      <BiSolidCartAdd className=" text-2xl" />{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
