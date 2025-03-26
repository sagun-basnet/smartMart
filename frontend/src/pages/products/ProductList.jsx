import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService.js";
import { get } from "../../utils/api.jsx";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [imageArr, setImageArr] = useState([]); // Store images per product ID
  console.log(imageArr, 9);

  const fetchProducts = async () => {
    const res = await get("/api/get-products");
    // console.log(res, "products");
    setProducts(res);

    // Process images for each product
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Link
          to="/add-product"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </Link>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Description</th>
            <th className="p-3">Category</th>
            <th className="p-3">Images</th>
            <th className="p-3">Price</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b text-center">
              <td className="p-3">{product.title}</td>
              <td className="p-3">
                {product.description.slice(0, 20) + "..."}
              </td>
              <td className="p-3">{product.category}</td>
              <td className="p-3 flex gap-2">
                {/* Display images */}
                {product.images &&
                  product.images.split(",").map((image, index) => (
                    <img
                      key={index}
                      src={`http://localhost:5555${image}`} // Trim in case of spaces
                      alt={`Product ${index}`}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  ))}
              </td>
              <td className="p-3">Rs. {product.price}</td>
              <td className="p-3">{product.discount}%</td>
              <td className="p-3">{product.quantity}</td>
              <td className="p-3 flex gap-2 justify-center">
                <Link
                  to={`/edit-product/${product.pid}`}
                  className="bg-blue-500 p-2 px-4 rounded-md text-white"
                >
                  Edit
                </Link>
                <button
                  onClick={() => productService.deleteProduct(product.id)}
                  className="bg-red-500 p-2 px-4 rounded-md text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
