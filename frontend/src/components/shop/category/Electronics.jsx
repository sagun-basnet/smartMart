import React from "react";
import CategoryTemplate from "./CategoryTemplate";
import { BsLaptop } from "react-icons/bs";

const Electronics = () => {
  return <CategoryTemplate 
    categoryName="Electronics" 
    icon={<BsLaptop size={24} className="text-blue-600" />} 
  />;
};

export default Electronics;