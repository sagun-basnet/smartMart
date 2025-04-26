import React, { useState, useEffect } from "react";
import img1 from "../assets/images/img1.jpg";
import {
  BiSolidCartAdd,
  BiSearch,
  BiHeart,
  BiStar,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import {
  FiShoppingBag,
  FiUser,
  FiGrid,
  FiClock,
  FiPackage,
  FiTrendingUp,
} from "react-icons/fi";
import { HiOutlineFire } from "react-icons/hi";
import { RiLeafLine } from "react-icons/ri";
import { AiOutlineShop } from "react-icons/ai";
import { UseCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { get } from "../utils/api";

const Home = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hotItems, setHotItems] = useState([]);
  const [featuredItems, setFeaturedItems] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const { cart, dispatch } = UseCart();

  const banners = [
    {
      id: 1,
      image: img1,
      title: "Bringing the Mall to Your Mobile",
      subtitle: "Shop the latest trends from the comfort of your home",
      ctaText: "Shop Now",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
      title: "Summer Collection",
      subtitle: "Get ready for the season with our exclusive collection",
      ctaText: "Explore",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=2070&auto=format&fit=crop",
      title: "Special Offers",
      subtitle: "Limited time discounts on premium products",
      ctaText: "View Deals",
    },
  ];

  const categories = [
    {
      name: "Groceries",
      icon: <RiLeafLine className="text-4xl text-green-600" />,
      color: "bg-green-50",
    },
    {
      name: "Clothes",
      icon: <FiShoppingBag className="text-4xl text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      name: "Watches",
      icon: <FiClock className="text-4xl text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      name: "Electronics",
      icon: <AiOutlineShop className="text-4xl text-red-600" />,
      color: "bg-red-50",
    },
  ];

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Product added to cart successfully");
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
      toast.info("Removed from wishlist");
    } else {
      setWishlist([...wishlist, productId]);
      toast.success("Added to wishlist");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setShowSearchResults(true);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const extractPrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^0-9.]/g, "").replace(/,/g, ""));
  };

  const generateHotItems = (products) => {
    const categories = ["Clothes", "Electronics", "Grocery", "Watches"];
    const hotItemsSet = new Set();
    const hotItems = [];

    categories.forEach((cat) => {
      const itemsInCategory = products.filter((p) => p.category === cat);
      if (itemsInCategory.length > 0) {
        const topProduct = itemsInCategory.sort(
          (a, b) => extractPrice(b.price) - extractPrice(a.price)
        )[0];
        hotItems.push(topProduct);
        hotItemsSet.add(topProduct.id);
      }
    });

    if (hotItems.length < 5) {
      const remaining = products
        .filter((p) => !hotItemsSet.has(p.id))
        .sort((a, b) => extractPrice(b.price) - extractPrice(a.price));

      for (let i = 0; hotItems.length < 5 && i < remaining.length; i++) {
        hotItems.push(remaining[i]);
      }
    }

    return hotItems;
  };

  const generateFeaturedItems = (products) => {
    const categories = ["Clothes", "Electronics", "Grocery", "Watches"];
    const featuredItemsSet = new Set();
    const featuredItems = [];

    categories.forEach((cat) => {
      const itemsInCategory = products.filter((p) => p.category === cat);
      if (itemsInCategory.length > 0) {
        const randomIndex = Math.floor(Math.random() * itemsInCategory.length);
        const randomItem = itemsInCategory[randomIndex];
        featuredItems.push(randomItem);
        featuredItemsSet.add(randomItem.id);
      }
    });

    const remaining = products.filter((p) => !featuredItemsSet.has(p.id));
    const shuffled = remaining.sort(() => 0.5 - Math.random());

    for (let i = 0; featuredItems.length < 5 && i < shuffled.length; i++) {
      featuredItems.push(shuffled[i]);
    }

    return featuredItems;
  };

  const fetchData = async () => {
    try {
      const res = await get("/api/get-products");

      res.forEach((item) => {
        if (item.images) {
          item.images = item.images.split(",");
        }
      });

      setProduct(res);
      setHotItems(generateHotItems(res));
      setFeaturedItems(generateFeaturedItems(res));
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-slide for hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlide]);

  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const ProductCard = ({ product, buttonColor }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const handleImageError = () => {
      setImageError(true);
    };

    return (
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}

          {imageError ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="mt-2 text-sm text-gray-500">Image unavailable</p>
            </div>
          ) : (
            <img
              src={`http://localhost:5555${product.images[0]}`}
              alt={product.title}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}

          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.pid);
              }}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            >
              <BiHeart
                className={`text-xl ${
                  wishlist.includes(product.pid)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600"
                }`}
              />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className={`${
                buttonColor || "bg-blue-600"
              } p-2 rounded-full shadow-md hover:opacity-90 transition-opacity`}
            >
              <BiSolidCartAdd className="text-xl text-white" />
            </button>
          </div>
          {product.discount && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              -{product.discount}%
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-gray-800 truncate w-3/4">
              {product.title}
            </h3>
          </div>
          <p className="text-gray-500 text-sm mt-1 truncate">
            {product.category || "Category"}
          </p>
          <div className="mt-3 flex justify-between items-center">
            <p className="font-bold text-gray-900">{product.price}</p>
            {product.oldPrice && (
              <p className="text-sm text-gray-500 line-through">
                {product.oldPrice}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center bg-red-50 p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-screen-2xl mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-rows-auto gap-8 px-4 md:px-6 pb-12">
          {/* Hero Carousel */}
          <div className="relative h-[80vh] rounded-2xl overflow-hidden shadow-xl">
            {banners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  activeSlide === index
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-12">
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight max-w-lg">
                    {banner.title}
                  </h1>
                  <p className="text-white/90 mt-4 max-w-lg text-lg">
                    {banner.subtitle}
                  </p>
                  <button className="mt-8 bg-white text-gray-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors w-fit flex items-center gap-2">
                    {banner.ctaText} <BiChevronRight className="text-2xl" />
                  </button>
                </div>
              </div>
            ))}

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 p-2 rounded-full"
            >
              <BiChevronLeft className="text-3xl text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 p-2 rounded-full"
            >
              <BiChevronRight className="text-3xl text-white" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    activeSlide === index ? "bg-white w-6" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Shop by Category */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl md:text-3xl text-gray-800 flex items-center gap-2">
                <FiGrid className="text-blue-600" /> Shop by Category
              </h2>
              <Link
                to="/shop"
                className="text-blue-600 hover:underline flex items-center"
              >
                View All <BiChevronRight />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link to={`/shop/${category.name.toLowerCase()}`} key={index}>
                  <div
                    className={`${category.color} shadow-lg rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 p-8 text-center`}
                  >
                    <div className="flex justify-center mb-4">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      Browse {category.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl md:text-3xl text-gray-800 flex items-center gap-2">
                <FiPackage className="text-indigo-600" /> New Arrivals
              </h2>
              <Link
                to="/shop"
                className="text-blue-600 hover:underline flex items-center"
              >
                View All <BiChevronRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...products]
                .reverse()
                .slice(0, 5)
                .map((product) => (
                  <Link key={product.pid} to={`/products/${product.pid}`}>
                    <ProductCard
                      product={product}
                      buttonColor="bg-indigo-600"
                    />
                  </Link>
                ))}
            </div>
          </div>

          {/* Features Banner */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-6 text-white flex flex-col justify-between h-64 shadow-lg">
              <div>
                <h3 className="text-2xl font-bold mb-2">Free Shipping</h3>
                <p className="opacity-90">On all orders over Rs. 2000</p>
              </div>
              <button className="bg-white text-purple-700 px-6 py-2 rounded-lg font-medium hover:bg-purple-100 transition-colors w-fit">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white flex flex-col justify-between h-64 shadow-lg">
              <div>
                <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                <p className="opacity-90">Our team is at your service</p>
              </div>
              <button className="bg-white text-blue-700 px-6 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors w-fit">
                Contact Us
              </button>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white flex flex-col justify-between h-64 shadow-lg">
              <div>
                <h3 className="text-2xl font-bold mb-2">Easy Returns</h3>
                <p className="opacity-90">30-day return policy</p>
              </div>
              <button className="bg-white text-green-700 px-6 py-2 rounded-lg font-medium hover:bg-green-100 transition-colors w-fit">
                Return Policy
              </button>
            </div>
          </div>

          {/* Hot Items */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl md:text-3xl text-gray-800 flex items-center gap-2">
                <HiOutlineFire className="text-orange-600" /> Hot Items
              </h2>
              <Link
                to="/shop"
                className="text-blue-600 hover:underline flex items-center"
              >
                View All <BiChevronRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {hotItems.map((product) => (
                <Link key={product.pid} to={`/products/${product.pid}`}>
                  <ProductCard product={product} buttonColor="bg-orange-600" />
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Products */}
          <div className="mt-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl md:text-3xl text-gray-800 flex items-center gap-2">
                <FiTrendingUp className="text-green-600" /> Featured Products
              </h2>
              <Link
                to="/shop"
                className="text-blue-600 hover:underline flex items-center"
              >
                View All <BiChevronRight />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {featuredItems.map((product) => (
                <Link key={product.pid} to={`/products/${product.pid}`}>
                  <ProductCard product={product} buttonColor="bg-green-600" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
