import React, { useState } from "react";
import "./list.css";
const SearchLikedList = (props) => {
  // State for search query and list of items
  const { UserList } = props;
  let likedItems = [];
  likedItems.push(UserList);
  let likedStringItems = likedItems.map((integer) => String(integer));
  class Recipe {
    constructor(
      id,
      nationality,
      name,
      instructions,
      ingredients,
      overallCookingTime,
      search
    ) {
      this.id = id;
      this.nationality = nationality;
      this.name = name;
      this.instructions = instructions;
      this.ingredients = ingredients;
      this.overallCookingTime = overallCookingTime;
      this.search = search;
    }
  }
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
