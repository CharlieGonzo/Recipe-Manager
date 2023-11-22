import React, { useState } from "react";
import "./list.css";
const SearchLikedList = (props) => {
  // State for search query and list of items
  const { UserList } = props;
  let likedItems = [];
  likedItems.push(UserList);
  let likedStringItems = likedItems.map((integer) => String(integer));
  console.log(likedStringItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(likedStringItems);

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
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchLikedList;
