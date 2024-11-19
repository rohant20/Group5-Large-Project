import React, { useState, useEffect, ChangeEvent } from 'react';


function SearchFeature() {
  // State types are explicitly defined.
  const [query, setQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<string[]>([]);

  // Array of items is typed as a string array.
  const items: string[] = ['apple', 'banana', 'orange', 'grape', 'watermelon'];

  useEffect(() => {  
    // Filtering items based on the query.
    const filtered = items.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [query]);

  // Event handler typing for the input change event.
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {filteredItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchFeature;