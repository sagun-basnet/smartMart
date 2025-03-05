import React from "react";

const AddProduct = () => {
  return (
    <div className="h-screen flex justify-center items-center px-4">
      <div className="my-bg w-full max-w-4xl h-auto md:h-[70vh] flex flex-col items-center shadow-lg">
        <h1 className="text-4xl text-[#fbfeeb] font-bold mt-2">Add Products</h1>
        <div>
          <div>
            <label htmlFor="pname">Product Name:</label>
            <input type="text" name="pname" id="pname" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
