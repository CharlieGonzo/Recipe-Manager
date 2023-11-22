import React, { useState } from "react";
import "./list.css";
const SearchList = (props) => {
  // State for search query and list of items
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(["", "why", "really", "welp", "we tried"]);

  // Function to handle search input changes
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter items based on the search query
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="contain">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />

      {/* List View */}
      <ul className="conatiner">
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
