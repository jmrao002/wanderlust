import React, { useState, useContext } from "react";

// Create our category context using React.CreateContext()
export const CategoryContext = React.createContext();

// Create a custom hook that allows easy access to our CategoryContext values
export const useCategory = () => useContext(CategoryContext);

// Creating our category provider. Accepts an argument of "props", here we plucking off the "children" object.
export default function CategoryProvider({ children }) {
  // Creating our state
  const [category, setCategory] = useState('');

  // Method to update our state
  const toggleCategory = () => {
    console.log("inside toggle theme");
    return setCategory((prev) => !prev);
  };

  // The provider component will wrap all other components inside of it that need access to our global state
  return (
    // An empty category and toggle theme are getting provided to the child components
    <CategoryContext.Provider value={{ category, toggleCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
