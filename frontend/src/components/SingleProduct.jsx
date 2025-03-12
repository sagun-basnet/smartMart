import React from "react";
const SingleProduct = () => {
  const product = {
    id: 1,
    name: "iPhone 13",
    image:
      "https://i.pinimg.com/736x/5d/c0/cf/5dc0cf0585fc6242d92b643c54f30476.jpg",
    category: "Electronics",
    price: 999,
    discount: 10,
    description:
      "The iPhone 13 features a sleek design, a powerful A15 Bionic chip, and an advanced dual-camera system for stunning photography.",
  };
  const discountedPrice = (
    product.price *
    (1 - product.discount / 100)
  ).toFixed(2);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="container mx-auto bg-white rounded-2xl shadow-lg overflow-hidden p-6 md:p-10 flex flex-col md:flex-row gap-10 max-w-4xl">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-3/4 h-auto rounded-xl shadow-md transition-transform transform hover:scale-105"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">
            {product.name}
          </h1>
          <p className="text-gray-500 text-lg mb-2 font-medium">
            Category: <span className="text-gray-700">{product.category}</span>
          </p>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {product.description}
          </p>
          <p className="text-xl font-semibold text-gray-700 line-through">
            Original Price: Rs. {product.price}
          </p>
          <p className="text-2xl font-bold text-green-600">
            Discounted Price: Rs. {discountedPrice} ({product.discount}% OFF)
          </p>

          <button className="mt-6 bg-[#1f385c] text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all shadow-md text-lg font-medium transform hover:scale-105">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
