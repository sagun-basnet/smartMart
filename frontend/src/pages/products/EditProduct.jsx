import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { get, post } from "../../utils/api";

const EditProduct = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [prevDiscount, setPrevDiscount] = useState(0);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "Clothes",
    price: "",
    discount: "",
    quantity: "",
  });
  console.log(product, 18);

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const categories = ["Clothes", "Watches", "Electronics", "Groceries"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await get(`/api/get-products-by-id/${id}`);
        console.log(res[0], 28);

        setProduct({
          title: res[0].title,
          description: res[0].description,
          category: res[0].category,
          price: res[0].price,
          discount: res[0].discount,
          quantity: res[0].quantity,
        });
        setPrevDiscount(res[0].discount);
        setExistingImages(res[0].images.split(","));
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product data");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const removeImage = (index) => {
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !product.title ||
      !product.price ||
      existingImages.length + images.length < 3
    ) {
      toast.error(
        "Please fill in all required fields and ensure at least 3 images."
      );
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("quantity", product.quantity);
    formData.append("existingImages", existingImages.join(","));

    try {
      const res = await post(`/api/update-product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (parseFloat(product.discount) > parseFloat(prevDiscount)) {
        const notification = {
          title: `Product Discount`,
          message: `${product.title} now has increase to ${product.discount}% discount!`,
        };
        await axios
          .post("http://localhost:5555/send-notification", notification)
          .then((res) => {
            console.log(res.data, 110);
          });
      }
      toast.success(res.message);
      navigation("/dashboard");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-3xl p-6 shadow-lg rounded-lg">
        <h1 className="text-4xl text-center font-bold mb-6">Edit Product</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2">
          <div>
            <label htmlFor="title">Product Name:</label>
            <input
              type="text"
              name="title"
              id="title"
              className="w-full"
              value={product.title}
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
            <label htmlFor="quantity">quantity Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="w-full"
              value={product.quantity}
              onChange={handleChange}
              placeholder="Enter quantity quantity"
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
          <div className="flex flex-wrap gap-2">
            {existingImages.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={`http://localhost:5555${image}`}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button type="button" onClick={() => removeImage(index)}>
                  <IoMdClose />
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-[#4bae30] text-[#fbfeeb] font-semibold rounded-md hover:text-[#4bae30] hover:bg-transparent hover:border cursor-pointer"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
