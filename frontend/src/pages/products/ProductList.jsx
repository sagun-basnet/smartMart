import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productService from "../services/productService.js";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAllProducts().then(setProducts);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Products</h2>
        <Link to="/add-product" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Product</Link>
      </div>
      <table className="w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="p-3">{product.name}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3">
                <Link to={`/edit-product/${product.id}`} className="text-blue-500 mr-2">Edit</Link>
                <button onClick={() => productService.deleteProduct(product.id)} className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
