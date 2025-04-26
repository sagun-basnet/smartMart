import React from "react";
import CategoryTemplate from "./CategoryTemplate";
import { GiClothes } from "react-icons/gi";

const Clothes = () => {
  return <CategoryTemplate 
    categoryName="Clothes" 
    icon={<GiClothes size={24} className="text-blue-600" />} 
  />;
};

export default Clothes;