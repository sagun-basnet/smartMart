import React, { useState, useEffect } from 'react';
import img1 from "../assets/images/img1.jpg";

const Home = () => {
    const [products, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Mock data for testing
    const mockData = [
        {
            image: "https://i.pinimg.com/736x/5d/c0/cf/5dc0cf0585fc6242d92b643c54f30476.jpg",
            name: "iPhone 13",
            price: "$999"
        },
        {
            image: "https://i.pinimg.com/736x/f5/95/1b/f5951b5564d563e51f53a5cdec268815.jpg",
            name: "Dell XPS 13",
            price: "$1200"
        },
        {
            image: "https://i.pinimg.com/736x/c1/20/3d/c1203d1d8f6994b4fa91fcbb482ccf1e.jpg",
            name: "Samsung Galaxy S21",
            price: "$899"
        },
        {
            image: "https://i.pinimg.com/736x/a1/63/24/a16324df4f993b1b12d94a95f66764ad.jpg",
            name: "MacBook Pro 13",
            price: "$1300"
        },
        {
            image: "https://i.pinimg.com/736x/61/e9/ff/61e9ffac91f05bb610c6c774f17c7177.jpg",
            name: "Apple Watch Series 7",
            price: "$400"
        },
        {
            image: "https://i.pinimg.com/736x/c3/8f/ab/c38fabd0168efa39bf9f86ccbf6b881e.jpg",
            name: "Sony WH-1000XM4",
            price: "$350"
        }
    ];

    useEffect(() => {
        // Simulate a delay to mock data fetching
        setTimeout(() => {
            setProduct(mockData);
            setLoading(false);
        }, 1000);  // Simulate a 1-second delay

        // Fetch real data from API
        // fetch("http://localhost:5555/api/add-product")
        //     .then((response) => {
        //         if (!response.ok) {
        //             throw new Error("Failed to fetch product");
        //         }
        //         return response.json();  // Parsing the JSON response
        //     })
        //     .then((data) => {
        //         setProduct(Array.isArray(data) ? data : []);
        //         setLoading(false);
        //     })
        //     .catch((error) => {
        //         setError(error.message);
        //         setLoading(false);
        //     });
    }, []);

    // If the data is still loading
    if (loading) return <p>Loading...</p>;

    // If there's an error
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='grid grid-rows-auto gap-3 px-3'>
            {/* Hero Section */}
            <div className='flex justify-center relative mb-5'>
                <img src={img1} alt="Hero Image" className='h-[90vh] w-full rounded-2xl' />
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
            <div>
                <h1 className='font-extrabold text-2xl md:text-4xl text-gray-800 text-center mt-5'>Shop by Category</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'>
                {["Groceries", "Clothes", "Watches", "Electronics"].map((category, index) => (
                    <div key={index} className='shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 relative p-6 sm:p-10'>
                        <h1 className='absolute bottom-5 left-1/2 transform -translate-x-1/2 font-semibold'>{category}</h1>
                    </div>
                ))}
            </div>

            {/* New Arrivals */}
            <div>
                <h1 className="font-extrabold text-2xl md:text-4xl text-gray-900">New Arrivals</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4"
                    >
                        {/* Image */}
                        <div className="h-36 md:h-44 border-2 border-gray-500 rounded-2xl">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
                        </div>

                        {/* Product Details */}
                        <div className="h-20 mt-2 border-2 border-amber-100 rounded-lg p-2 flex flex-col justify-center">
                            <h1 className="font-bold">{product.name}</h1>

                            <div className="flex items-center justify-between mt-2">
                                <p className="text-gray-700 font-semibold">Price: {product.price}</p>
                                <button className="bg-[#1f385c] text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hot Items */}
            <div>
                <h1 className='text-gray-800 font-extrabold text-2xl md:text-4xl'>Hot Items</h1>
            </div>
            <div className='flex flex-col md:flex-row gap-4 mb-12'>
                {products.slice(0, 2).map((product, index) => (

                    <div
                        key={index}
                        className="   shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4"
                    >
                        {/* Image */}
                        <div className="h-36 md:h-44 border-2 border-gray-500 rounded-2xl">
                            <img src={product.image || img1} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
                        </div>

                        {/* Product Details */}
                        <div className="h-20 mt-2 border-2 border-amber-100 rounded-lg p-2 flex flex-col justify-center">
                            <h1 className="font-bold">{product.name}</h1>

                            <div className="flex items-center justify-between mt-2">
                                <p className="text-gray-700 font-semibold">Price: {product.price}</p>
                                <button className="bg-[#1f385c] text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Featured Product */}

            <div>
                <h1 className="font-extrabold text-2xl md:text-4xl text-gray-900">Featured Product</h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-12">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="shadow-2xl shadow-gray-300 bg-gray-50 text-center rounded-2xl transition-transform duration-300 ease-in-out transform hover:scale-105 p-4"
                    >
                        {/* Image */}
                        <div className="h-36 md:h-44 border-2 border-gray-500 rounded-2xl">
                            <img src={product.image || img1} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
                        </div>

                        {/* Product Details */}
                        <div className="h-20 mt-2 border-2 border-amber-100 rounded-lg p-2 flex flex-col justify-center">
                            <h1 className="font-bold">{product.name}</h1>

                            <div className="flex items-center justify-between mt-2">
                                <p className="text-gray-700 font-semibold">Price: {product.price}</p>
                                <button className="bg-[#1f385c] text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Home;
