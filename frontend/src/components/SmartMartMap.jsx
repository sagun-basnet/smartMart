import React, { useState } from "react";
import { XCircle, Info, Navigation, Search } from "lucide-react";

const floors = ["Basement", "Ground", "1st floor", "2nd floor", "3rd floor"];

// More detailed information for each area
const areaDetails = {
  Basement: {
    "Zone A": {
      title: "Zone A - Reserved Parking",
      description: "Reserved parking spots for VIP customers and management.",
      color: "#CBD5E0"
    },
    "Zone B": {
      title: "Zone B - Staff Parking",
      description: "Parking area reserved for SmartMart employees.",
      color: "#E2E8F0"
    },
    "Zone C": {
      title: "Zone C - Visitor Parking",
      description: "General parking area for all SmartMart customers.",
      color: "#EDF2F7"
    },
    "Exit Ramp": {
      title: "Exit Ramp",
      description: "Vehicle exit to street level.",
      color: "#E53E3E"
    }
  },
  Ground: {
    "Entry Area": {
      title: "Entry Area",
      description: "Main entrance with customer service and shopping carts.",
      color: "#D1FAE5"
    },
    "Info Desk": {
      title: "Information Desk",
      description: "Get assistance, store maps, and return items here.",
      color: "#FEF3C7"
    },
    "Groceries": {
      title: "Groceries Section",
      description: "Fresh produce, dairy, meats, and packaged foods.",
      color: "#C7D2FE"
    },
    "Aisle 1": {
      title: "Aisle 1 - Fruits & Veggies",
      description: "Fresh fruits and vegetables from local and international sources.",
      color: "#FBBF24"
    },
    "Aisle 2": {
      title: "Aisle 2 - Beverages",
      description: "Soft drinks, juices, water, and alcoholic beverages.",
      color: "#FDBA74"
    },
    "Aisle 3": {
      title: "Aisle 3 - Snacks",
      description: "Chips, nuts, cookies, and other snack items.",
      color: "#6EE7B7"
    }
  },
  "1st floor": {
    "Clothes": {
      title: "Clothes Section",
      description: "Men's, women's, and children's clothing and accessories.",
      color: "#FECACA"
    },
    "Checkout": {
      title: "Checkout Area",
      description: "Cash registers and self-checkout kiosks.",
      color: "#F3F4F6"
    }
  },
  "2nd floor": {
    "Electronics": {
      title: "Electronics Section",
      description: "Computers, phones, TVs, and other electronic devices.",
      color: "#BFDBFE"
    },
    "Checkout": {
      title: "Checkout Area",
      description: "Cash registers and self-checkout kiosks.",
      color: "#F3F4F6"
    }
  },
  "3rd floor": {
    "Watches": {
      title: "Watches Section",
      description: "Luxury and everyday watches and accessories.",
      color: "#DDD6FE"
    },
    "Checkout": {
      title: "Checkout Area",
      description: "Cash registers and self-checkout kiosks.",
      color: "#F3F4F6"
    }
  }
};

// Additional areas for hover and selection
const floorAreasConfig = {
  Basement: [
    { id: "Zone A", x: 50, y: 50, width: 150, height: 100 },
    { id: "Zone B", x: 250, y: 50, width: 150, height: 100 },
    { id: "Zone C", x: 450, y: 50, width: 150, height: 100 },
    { id: "Exit Ramp", x: 650, y: 50, width: 100, height: 100 }
  ],
  Ground: [
    { id: "Entry Area", x: 50, y: 50, width: 200, height: 150 },
    { id: "Info Desk", x: 300, y: 50, width: 200, height: 150 },
    { id: "Groceries", x: 550, y: 50, width: 200, height: 250 },
    { id: "Aisle 1", x: 50, y: 250, width: 150, height: 100 },
    { id: "Aisle 2", x: 220, y: 250, width: 150, height: 100 },
    { id: "Aisle 3", x: 390, y: 250, width: 150, height: 100 }
  ],
  "1st floor": [
    { id: "Clothes", x: 100, y: 50, width: 600, height: 150 },
    { id: "Checkout", x: 100, y: 200, width: 600, height: 50 }
  ],
  "2nd floor": [
    { id: "Electronics", x: 100, y: 50, width: 600, height: 150 },
    { id: "Checkout", x: 100, y: 200, width: 600, height: 50 }
  ],
  "3rd floor": [
    { id: "Watches", x: 100, y: 50, width: 600, height: 150 },
    { id: "Checkout", x: 100, y: 200, width: 600, height: 50 }
  ]
};

const SmartMartMap = () => {
  const [activeFloor, setActiveFloor] = useState("Ground");
  const [selectedArea, setSelectedArea] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewPosition, setViewPosition] = useState({ x: 0, y: 0 });

  // Search functionality
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    const results = [];
    Object.entries(areaDetails).forEach(([floor, areas]) => {
      Object.entries(areas).forEach(([areaId, details]) => {
        if (
          details.title.toLowerCase().includes(query.toLowerCase()) ||
          details.description.toLowerCase().includes(query.toLowerCase())
        ) {
          results.push({
            floor,
            areaId,
            ...details
          });
        }
      });
    });
    
    setSearchResults(results);
  };

  const goToSearchResult = (result) => {
    setActiveFloor(result.floor);
    setSelectedArea(result.areaId);
    setDetailsOpen(true);
    setIsSearching(false);
  };

  // Handle area selection
  const handleAreaClick = (areaId) => {
    setSelectedArea(areaId);
    setDetailsOpen(true);
  };

  // SVG for each floor with interactive areas
  const renderFloorMap = () => {
    const areas = floorAreasConfig[activeFloor];
    
    return (
      <svg 
        viewBox={`${viewPosition.x} ${viewPosition.y} ${800/zoomLevel} ${400/zoomLevel}`} 
        className="w-full h-full border rounded-md"
      >
        {areas.map((area) => {
          const areaDetails = getAreaDetails(area.id);
          const isSelected = selectedArea === area.id;
          
          return (
            <g key={area.id}>
              <rect
                x={area.x}
                y={area.y}
                width={area.width}
                height={area.height}
                fill={areaDetails.color}
                stroke={isSelected ? "#000" : "#4A5568"}
                strokeWidth={isSelected ? "3" : "1"}
                className="cursor-pointer transition-all duration-300"
                onClick={() => handleAreaClick(area.id)}
                style={{
                  filter: isSelected ? "drop-shadow(0 0 6px rgba(0,0,0,0.3))" : "none",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                  transition: "all 0.3s ease"
                }}
              />
              <text
                x={area.x + area.width/2}
                y={area.y + area.height/2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="bold"
                fill="#333"
                pointerEvents="none"
              >
                {areaDetails.title.split(" - ")[0]}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  // Get details for a specific area
  const getAreaDetails = (areaId) => {
    return areaDetails[activeFloor][areaId] || { 
      title: areaId, 
      description: "No details available",
      color: "#CBD5E0" 
    };
  };

  // Reset view position and zoom
  const resetView = () => {
    setZoomLevel(1);
    setViewPosition({ x: 0, y: 0 });
  };

  // Zoom controls
  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(prevZoom => prevZoom + 0.2);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.6) {
      setZoomLevel(prevZoom => prevZoom - 0.2);
    }
  };

  // Pan controls for mobile
  const handlePan = (direction) => {
    const panStep = 40;
    switch(direction) {
      case 'up':
        setViewPosition(prev => ({ ...prev, y: prev.y - panStep }));
        break;
      case 'down':
        setViewPosition(prev => ({ ...prev, y: prev.y + panStep }));
        break;
      case 'left':
        setViewPosition(prev => ({ ...prev, x: prev.x - panStep }));
        break;
      case 'right':
        setViewPosition(prev => ({ ...prev, x: prev.x + panStep }));
        break;
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl text-center font-bold mb-4 text-blue-800">SmartMart Interactive Map</h2>
        
        {/* Search bar */}
        <div className="relative mb-4">
          <div className="flex items-center border rounded-full bg-white p-2 shadow-md">
            <Search className="text-gray-400 ml-2" size={20} />
            <input
              type="text"
              placeholder="Search for sections, items, or facilities..."
              className="flex-grow p-2 outline-none bg-transparent"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearching(true)}
            />
            {searchQuery && (
              <button 
                className="p-1 rounded-full hover:bg-gray-100"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                }}
              >
                <XCircle size={20} className="text-gray-400" />
              </button>
            )}
          </div>
          
          {/* Search results dropdown */}
          {isSearching && searchResults.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
              {searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                  onClick={() => goToSearchResult(result)}
                >
                  <div className="font-semibold">{result.title}</div>
                  <div className="text-sm text-gray-600">
                    {result.floor} • {result.description.substring(0, 60)}
                    {result.description.length > 60 ? '...' : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {isSearching && searchQuery && searchResults.length === 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg p-4 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>

        {/* Floor selector */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {floors.map((floor) => (
            <button
              key={floor}
              onClick={() => {
                setActiveFloor(floor);
                setSelectedArea(null);
                setDetailsOpen(false);
                resetView();
              }}
              className={`px-4 py-2 border rounded-lg transition duration-300 shadow-sm ${
                activeFloor === floor 
                  ? "bg-blue-600 text-white font-medium" 
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              {floor}
            </button>
          ))}
        </div>

        {/* Map controls and viewport */}
        <div className="relative">
          {/* Map viewport */}
          <div 
            className="w-full h-96 bg-white rounded-lg shadow-md overflow-hidden relative"
            style={{ cursor: selectedArea ? "default" : "grab" }}
          >
            {renderFloorMap()}
            
            {/* Zoom controls */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button 
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                <span className="text-2xl font-bold">+</span>
              </button>
              <button 
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                <span className="text-2xl font-bold">−</span>
              </button>
              <button 
                onClick={resetView}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                <Navigation size={20} />
              </button>
            </div>
            
            {/* Pan controls for mobile */}
            <div className="absolute bottom-4 left-4 grid grid-cols-3 gap-1">
              <div></div>
              <button 
                onClick={() => handlePan('up')}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                ↑
              </button>
              <div></div>
              <button 
                onClick={() => handlePan('left')}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                ←
              </button>
              <button 
                onClick={resetView}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                •
              </button>
              <button 
                onClick={() => handlePan('right')}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                →
              </button>
              <div></div>
              <button 
                onClick={() => handlePan('down')}
                className="w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100"
              >
                ↓
              </button>
              <div></div>
            </div>
          </div>
          
          {/* Area details panel */}
          {selectedArea && detailsOpen && (
            <div className="absolute top-0 right-0 w-64 bg-white p-4 rounded-lg shadow-lg border border-gray-200 m-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg">Area Details</h3>
                <button 
                  onClick={() => setDetailsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <XCircle size={20} className="text-gray-400" />
                </button>
              </div>
              <div 
                className="w-full h-3 mb-3 rounded-full" 
                style={{ backgroundColor: getAreaDetails(selectedArea).color }}
              ></div>
              <h4 className="font-semibold">{getAreaDetails(selectedArea).title}</h4>
              <p className="text-sm text-gray-600 mt-2">{getAreaDetails(selectedArea).description}</p>
            </div>
          )}
        </div>

        {/* Floor description */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <Info size={20} className="text-blue-600" />
            <h3 className="font-bold text-lg">Floor Information</h3>
          </div>
          <p className="text-gray-700">
            {activeFloor === "Basement" && "Basement level with various parking zones for different types of visitors. Contains reserved parking, staff parking, visitor parking and exit ramps."}
            {activeFloor === "Ground" && "Main entrance floor with information desk, grocery sections, and specialty aisles for fruits, vegetables, beverages and snacks."}
            {activeFloor === "1st floor" && "Fashion department featuring men's, women's, and children's clothing with dedicated checkout counters."}
            {activeFloor === "2nd floor" && "Electronics department with the latest gadgets, computers, phones, and entertainment systems."}
            {activeFloor === "3rd floor" && "Luxury department with premium watches and accessories from top brands."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {floorAreasConfig[activeFloor].map(area => (
              <button
                key={area.id}
                onClick={() => handleAreaClick(area.id)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition"
              >
                {getAreaDetails(area.id).title.split(" - ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartMartMap;