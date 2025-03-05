import React from 'react';
import img1 from "../assets/images/img1.jpg";

const Home = () => {
    return (
        <div className='grid grid-rows-auto gap-4 px-3'>

            {/* Hero Section */}
            <div className='flex justify-center relative mb-5'>
                <img src={img1} alt="" className='h-[90vh] w-full  rounded-2xl' />
                <div className='absolute top-1/4 left-8 sm:left-16 md:left-28'>
                    <h1 className='text-xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight'>
                        Lorem ipsum <br /> Placeasde<br /> asmenda!
                    </h1>
                    <button className='mt-4 bg-gray-100 h-10 sm:h-12 w-28 sm:w-32 rounded-3xl text-sm font-semibold hover:bg-gray-200'>
                        Shop Now {" >"}
                    </button>
                </div>
            </div>

            {/* Shop by Category */}
            <div><h1 className='font-extrabold text-2xl md:text-4xl text-gray-800 text-center mt-5'>Shop by Category</h1></div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
                {["Groceries", "Clothes", "Watches", "Electronics"].map((category, index) => (
                    <div key={index} className='shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative p-6 sm:p-10'>
                        <h1 className='absolute bottom-5 left-1/2 transform -translate-x-1/2 font-semibold'>{category}</h1>
                    </div>
                ))}
            </div>

            {/* New Arrivals */}
            <div><h1 className='font-extrabold text-2xl md:text-4xl text-gray-800'>New Arrivals</h1></div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12'>
                {Array(5).fill(0).map((_, index) => (
                    <div key={index} className='shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4'>
                        <div className='h-36 md:h-44 border-2 border-gray-500 rounded-2xl'></div>
                        <div className='h-20 mt-2 border-2 border-amber-100 rounded-lg'>Product Info</div>
                    </div>
                ))}
            </div>

            {/* Hot Items */}
            <div><h1 className='text-gray-800 font-extrabold text-2xl md:text-4xl'>Hot Items</h1></div>
            <div className='flex flex-col md:flex-row gap-4 mb-12'>
                <div className='w-full md:w-1/3 shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4'>
                    <div className='h-40 md:h-60 border-2 border-gray-500 rounded-2xl'></div>
                    <div className='h-20 mt-2 border-2 border-amber-100 rounded-lg'>Hot Item</div>
                </div>
                <div className='w-full md:w-2/3 shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4'>
                    <div className='h-40 md:h-60 border-2 border-gray-500 rounded-2xl'></div>
                    <div className='h-20 mt-2 border-2 border-amber-100 rounded-lg'>Hot Item</div>
                </div>
            </div>

            {/* Featured Product */}
            <div><h1 className='text-gray-800 font-extrabold text-2xl md:text-4xl'>Featured Product</h1></div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12'>
                {Array(5).fill(0).map((_, index) => (
                    <div key={index} className='shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4'>
                        <div className='h-36 md:h-44 border-2 border-gray-500 rounded-2xl'></div>
                        <div className='h-20 mt-2 border-2 border-amber-100 rounded-lg'>Featured Info</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
