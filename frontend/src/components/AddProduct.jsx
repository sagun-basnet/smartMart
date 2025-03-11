import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { post } from "../utils/api";
import { toast } from "react-toastify";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    pname: "",
    description: "",
    category: "Clothes",
    price: "",
    discount: "",
    stock: "",
  });
  const [images, setImages] = useState([]);
  const categories = ["Clothes", "Watches", "Electronics", "Groceries"];

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]); // Append new images
    }
  };

  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove image at the specified index
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.pname ||
      !product.price ||
      images.length < 3 ||
      images.length > 5
    ) {
      toast.error(
        "Please fill in all required fields and upload 3 to 5 images."
      );
      return;
    }

    const formData = new FormData();

    // Append images properly
    images.forEach((image) => {
      formData.append("images", image); // Name should match multer field in backend
    });

    formData.append("title", product.pname);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("quantity", product.stock);

    console.log("Sending formData:", formData);
    //log formData value
    formData.forEach((value, key) => {
      if (key === "images") {
        console.log(`${key}: ${value.name}`); // Logging file name
      } else {
        console.log(`${key}: ${value}`);
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:5555/api/add-product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from server:", res.data.message);
      toast.success(res.data.message);
      setProduct({
        pname: "",
        description: "",
        category: "Clothes",
        price: "",
        discount: "",
        stock: "",
      });
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-3xl p-6 shadow-lg rounded-lg">
        <h1 className="text-4xl text-center  font-bold mb-6">Add Products</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
          <div>
            <label htmlFor="pname">Product Name:</label>
            <input
              type="text"
              name="pname"
              id="pname"
              className="w-full"
              value={product.pname}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              className="resize-none border-2 w-full"
              rows={2}
              name="description"
              id="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter description"
              required
            />
          </div>
          <div>
            <label htmlFor="category">Category:</label>
            <select
              className="w-full"
              name="category"
              value={product.category}
              onChange={handleChange}
              required
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                name="price"
                id="price"
                className="w-full"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter price"
                required
              />
            </div>
            <div>
              <label htmlFor="discount">Discount (%):</label>
              <input
                type="number"
                name="discount"
                id="discount"
                className="w-full"
                value={product.discount}
                onChange={handleChange}
                placeholder="Enter discount %"
              />
            </div>
          </div>
          <div>
            <label htmlFor="stock">Stock Quantity:</label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="w-full"
              value={product.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
            />
          </div>
          <div>
            <label>Product Image:</label>
            <input
              name="images"
              className="w-full"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 border rounded-md"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2"
                    onClick={() => removeImage(index)}
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            className="w-full p-3 bg-[#4bae30] text-[#fbfeeb] font-semibold rounded-md hover:text-[#4bae30] hover:bg-transparent hover:border cursor-pointer"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
