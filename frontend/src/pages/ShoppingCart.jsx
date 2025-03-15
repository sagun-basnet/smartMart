// import Navbar from "../components/Navbar";
import React from 'react'
import { UseCart } from '../context/CartContext';
import { BiSolidCartAdd } from "react-icons/bi";
import { Link } from 'react-router-dom';



const ShoppingCart = () => {
  const { cart, selectedItems, dispatch } = UseCart();

  // Handle the checkbox for selecting all items
  const handleSelectAll = () => {
    dispatch({ type: 'SELECT_ALL_ITEMS' });
  };

  // Handle individual item selection
  const handleSelectItem = (id) => {
    dispatch({ type: 'TOGGLE_SELECT_ITEM', payload: id });
  };

  // Handle item removal
  const handleRemoveSelected = () => {
    dispatch({ type: 'REMOVE_SELECTED', payload: selectedItems });
  };

  // Handle quantity change
  const handleQuantityChange = (id, type) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, type } });
  };

  // Calculate subtotal for selected items only
  const subtotal = cart.reduce((acc, item) => {
    if (selectedItems.includes(item.id)) {
      return acc + item.price * item.quantity;
    }
    return acc;
  }, 0);

  // Calculate total quantity for selected items only
  const totalQuantity = cart.reduce((acc, item) => {
    if (selectedItems.includes(item.id)) {
      return acc + item.quantity;
    }
    return acc;
  }, 0);

  // Total can be equal to subtotal for now
  const total = subtotal;

  return (
    <div className='flex justify-center items-center pr-25 pl-25  mt-25 '>
      <div className='pl-5 pr-5 bg-gray-50 rounded-2xl pt-5'>
        <h1 className='text-center font-extrabold text-4xl text-blue-950'>SHOPPTING CART</h1>

        <div className='flex'>
          <div className='flex-col items-center'>
            <div className=' '>
              <h1 className='font-semibold '>Select all Items</h1>
              <input
                type="checkbox"
                checked={selectedItems.length === cart.length && cart.length > 0}
                onChange={handleSelectAll}
                className='h-5 w-5'
              />
            </div>
            <button onClick={handleRemoveSelected} className="bg-red-600 text-white px-3 py-1 h-10 w-25 rounded" disabled={selectedItems.length === 0}>
              <p> Delete </p>
            </button>
          </div>

          <div className='all_shoppingList p-2 rounded-lg h-[90vh] w-[60vw] overflow-auto mb-5' >
            {cart.length === 0 ? (
              <p className=' text-red-500'>Your cart is empty</p>
            ) : (
              cart.map((item,) => (
                <div key={item.id} className='Product flex items-center gap-2 rounded-lg bg-white h-25  mb-5'>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className='ml-4 '
                  />
                  <div className='img w-[70px] h-[70px] '>
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-sm" />
                    ) : (
                      <p>No Image</p>
                    )}
                  </div>
                  <div className=' w-[32vw]'><div className='productDetails font-semibold text-sm w-full'>{item.name}</div>
                    <div className='Description text-sm text-gray-900 '>{item.description}</div></div>
                  <div className='Price text-green-600  w-30'>${item.price}</div>
                  {/* Quantity Controls */}
                  <div className='flex items-center'>
                    <button
                      onClick={() => handleQuantityChange(item.id, 'decrease')}
                      className="bg-gray-300 text-black px-2 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 'increase')}
                      className="bg-gray-300 text-black px-2 py-1 rounded-r"
                    >
                      +
                    </button>
                  </div>

                </div>
              ))
            )}
          </div>

          <div className='rounded-lg  bg-white h-80 w-60 p-4 '>
            <h1 className="text-xl font-bold text-center">Order Summary</h1>
            <div className="flex justify-between py-2">
              <span>Total Quantity:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Subtotal:</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between py-2 font-bold border-t mt-2">
              <span>Total:</span>
              <span>Rs. {total}</span>
            </div>
            <Link to="/checkout">
              <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>


  );
}

export default ShoppingCart;
