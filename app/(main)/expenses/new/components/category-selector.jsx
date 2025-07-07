"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CategorySelector({ categories, onChange }) {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Handle when a category is selected
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);

    // Only call onChange if it exists and the value has changed
    if (onChange && categoryId !== selectedCategory) {
      onChange(categoryId);
    }
  };

  // If no categories or empty categories array
  if (!categories || categories.length === 0) {
    return <div className="text-gray-400">No categories available</div>;
  }

  // Set default value if not already set
  if (!selectedCategory && categories.length > 0) {
    // Find a default category or use the first one
    const defaultCategory =
      categories.find((cat) => cat.isDefault) || categories[0];

    // Set the default without triggering a re-render loop
    setTimeout(() => {
      setSelectedCategory(defaultCategory.id);
      if (onChange) {
        onChange(defaultCategory.id);
      }
    }, 0);
  }

  return (
    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
      <SelectTrigger className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700 hover:border-sky-500">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-600">
        {categories.map((category) => (
          <SelectItem 
            key={category.id} 
            value={category.id}
            className="text-white hover:bg-gray-700 focus:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <span>{category.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}