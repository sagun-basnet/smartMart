import React from "react";
import CategoryTemplate from "./CategoryTemplate";
import { BsWatch } from "react-icons/bs";

const Watches = () => {
  return <CategoryTemplate 
    categoryName="Watches" 
    icon={<BsWatch size={24} className="text-blue-600" />} 
  />;
};

export default Watches;