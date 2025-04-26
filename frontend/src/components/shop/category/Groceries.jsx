import React from "react";
import CategoryTemplate from "./CategoryTemplate";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const Groceries = () => {
  return <CategoryTemplate 
    categoryName="Groceries" 
    icon={<MdOutlineLocalGroceryStore size={24} className="text-blue-600" />} 
  />;
};

export default Groceries;