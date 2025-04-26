import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaRegCreditCard,
  FaCartArrowDown,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { BiSolidCartAdd } from "react-icons/bi";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { IoShareSocialOutline } from "react-icons/io5";
import { get } from "../utils/api";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
import { UseCart } from "../context/CartContext";

const SingleProduct = () => {
  const { currentUser } = useContext(AuthContext);
  const { cart, dispatch } = UseCart();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    if (!currentUser) {
      toast.warning("Please login to proceed to checkout");
      navigate("/login");
      return;
    }

    navigate("/product/checkout", {
      state: {
        items: [{ ...product, quantity }],
        fromSingleProduct: true,
      },
    });
  };

  const handleAddToCart = (product) => {
    if (!currentUser) {
      toast.warning("Please login to add items to cart");
      navigate("/login");
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: product });
        toast.success("Product added to cart successfully");
    // Add your cart logic here
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast.success(
      isWishlist
        ? `${product.title} removed from wishlist`
        : `${product.title} added to wishlist`
    );
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await get(`/api/get-products-by-id/${parseInt(id)}`);

      if (res.length > 0 && res[0].images) {
        res[0].images = res[0].images.split(","); // Convert string to array
      }
      setProduct(res[0]);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    if (!product?.category) return;

    try {
      const res = await get(
        `/api/get-products-by-category?category=${product.category}`
      );

      for (let i = 0; i < res.length; i++) {
        if (res[i].images) {
          res[i].images = res[i].images.split(",");
        }
      }

      setRelatedProducts(res);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    if (product?.category) {
      fetchRelatedProducts();
    }
  }, [product?.category]);

  useEffect(() => {
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-xl font-semibold text-gray-700">
        <FiShoppingBag className="text-5xl mb-4 text-gray-400" />
        <p>Product not found</p>
        <Link to="/products" className="mt-4 text-blue-600 hover:underline">
          Browse other products
        </Link>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex mb-8 text-sm font-medium text-gray-500">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-blue-600">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </nav>

        {/* Product Detail Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 lg:p-8 mb-12">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Product Images */}
            <div className="w-full lg:w-2/5">
              <div className="relative mb-4 aspect-square bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={`http://localhost:5555${
                    product?.images?.[activeImage] || product?.images?.[0]
                  }`}
                  alt={product.title}
                  className="w-full h-full object-contain transition-transform hover:scale-105 duration-300"
                />
                <button
                  onClick={toggleWishlist}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                >
                  {isWishlist ? (
                    <FaHeart className="text-red-500 text-xl" />
                  ) : (
                    <FaRegHeart className="text-gray-500 text-xl" />
                  )}
                </button>
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`cursor-pointer border-2 rounded-lg overflow-hidden w-20 h-20 flex-shrink-0 transition-all
                        ${
                          activeImage === index
                            ? "border-blue-600"
                            : "border-transparent"
                        }`}
                    >
                      <img
                        src={`http://localhost:5555${img}`}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-3/5 flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.title}
                </h1>

                {/* Ratings */}
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarFill />
                    <BsStarHalf />
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    (128 reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900">
                    Rs. {Math.round(discountedPrice)}
                  </span>

                  {product.discount > 0 && (
                    <>
                      <span className="ml-3 text-lg text-gray-400 line-through">
                        Rs. {Math.round(product.price)}
                      </span>
                      <span className="ml-3 text-sm font-medium text-green-600">
                        {Math.round(product.discount)}% off
                      </span>
                    </>
                  )}
                </div>

                <div className="mt-2 flex items-center text-green-600">
                  <MdLocalShipping className="mr-1" />
                  <span className="text-sm">Free shipping</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Quantity Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Quantity
                </h3>
                <div className="flex items-center">
                  <button
                    onClick={decreaseQuantity}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-l-lg transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <span className="bg-gray-100 px-6 py-2 text-center w-16">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-r-lg transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-auto space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleBuyNow(product)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-md"
                  >
                    <FaRegCreditCard />
                    Buy Now
                  </button>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <FaCartArrowDown />
                    Add to Cart
                  </button>
                </div>

                {/* Share */}
                <div className="flex justify-end">
                  <button className="text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm">
                    <IoShareSocialOutline className="text-lg" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Related Products
          </h2>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts
                .filter((item) => item.pid !== product.pid)
                .slice(0, 4)
                .map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]"
                  >
                    <Link to={`/products/${item.pid}`}>
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        <img
                          src={
                            item.images && item.images.length > 0
                              ? `http://localhost:5555${item.images[0]}`
                              : "https://via.placeholder.com/300"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.discount > 0 && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            {Math.round(item.discount)}% OFF
                          </span>
                        )}
                      </div>
                    </Link>

                    <div className="p-4">
                      <Link to={`/products/${item.pid}`}>
                        <h3 className="font-medium text-gray-900 mb-1 line-clamp-1">
                          {item.title}
                        </h3>
                      </Link>

                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            Rs.{" "}
                            {Math.round(
                              item.discount
                                ? item.price * (1 - item.discount / 100)
                                : item.price
                            )}
                          </p>
                          {item.discount > 0 && (
                            <p className="text-sm text-gray-500 line-through">
                              Rs. {Math.round(item.price)}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            if (currentUser) {
                              toast.success(`${item.title} added to cart`);
                            } else {
                              toast.warning("Please login first");
                              navigate("/login");
                            }
                          }}
                          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                        >
                          <BiSolidCartAdd className="text-xl" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <FiShoppingBag className="text-4xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No related products found
              </h3>
              <p className="text-gray-500 mb-6">
                We couldn't find any related products in this category
              </p>
              <Link
                to="/products"
                className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse all products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
