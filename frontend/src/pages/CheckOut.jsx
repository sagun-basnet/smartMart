import React from 'react'
import CartProvider from '../context/CartContext'

const CheckOut = () => {
    return (
        <div className='h-[100vh] w-[100vw] border-2 border-black flex justify-center items-center'>
            <div className="main h-[80%] w-[70%] border-2 border-amber-500 flex">
                <div className="pdetails border-2 border-blue-800 w-[60%] h-[100%]">
                <div className='all_shoppingList p-2 rounded-lg h-[90vh] w-[60vw] overflow-auto mb-5' >
            {cart.length === 0 ? (
              <p className=' text-red-500'>Your cart is empty</p>
            ) : (
              cart.map((item,) => (
                <div key={item.id} className='Product flex items-center gap-2 rounded-lg bg-white h-25  mb-5'>
                 
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
                  
                    <span className="px-3">{item.quantity}</span>
                    
                  </div>

              
              ))
            )}
          </div>
                </div>
                <div className="paymentMethod border-2 border-black-800 w-[40%] h-[100%]"></div>
            </div>
        </div>
    )
}

export default CheckOut
