import React, { useEffect, useState } from "react";
import Card from "../Card";
import { get } from "../../../utils/api";
import { HiSearch, HiAdjustments, HiX } from "react-icons/hi";
import { BsGrid3X3Gap, BsListUl } from "react-icons/bs";

const CategoryTemplate = ({ categoryName, icon }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await get("/api/get-products-by-category", {
        category: categoryName,
      });
      setData(res);
      setFilteredData(res);
    } catch (error) {
      console.error(`Error fetching ${categoryName}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search functionality
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredData(data);
      return;
    }

    const results = data.filter(
      (item) =>
        item.title?.toLowerCase().includes(term.toLowerCase()) ||
        item.description?.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredData(results);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData(data);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header with search and controls */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {icon}
              <h1 className="text-3xl font-bold text-gray-800">
                {categoryName}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setViewMode("grid")}
                >
                  <BsGrid3X3Gap size={20} />
                </button>
                <button
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-500 hover:bg-gray-100"
                  }`}
                  onClick={() => setViewMode("list")}
                >
                  <BsListUl size={20} />
                </button>
              </div>

              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
                <HiAdjustments size={20} />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="relative">
            <input
            style={{ paddingLeft: "2.5rem"  }}
              type="text"
              placeholder={`Search ${categoryName.toLowerCase()}...`}
              className=" w-full !pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearch}
            />
            <HiSearch
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />

            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <HiX size={20} />
              </button>
            )}
          </div>

          {/* Search stats */}
          {searchTerm && (
            <div className="text-sm text-gray-500">
              Found {filteredData.length} results for "{searchTerm}" in{" "}
              {categoryName}
            </div>
          )}
        </div>
      </div>

      {/* Products grid */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            {searchTerm ? (
              <>
                <span className="text-6xl mb-4">🔍</span>
                <p className="text-xl">
                  No {categoryName.toLowerCase()} found matching "{searchTerm}"
                </p>
                <button
                  onClick={clearSearch}
                  className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear search
                </button>
              </>
            ) : (
              <>
                <span className="text-6xl mb-4">🛍️</span>
                <p className="text-xl">No {categoryName.toLowerCase()} found</p>
              </>
            )}
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredData.map((item, ind) => (
              <Card key={ind} data={item} ind={ind} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryTemplate;
