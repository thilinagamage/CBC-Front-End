import React, { useState } from "react";

const ProductVariableForm = ({ variables, setVariables }) => {
  const handleChange = (index, event) => {
    const { name, value, files } = event.target;
    const newVariables = [...variables];

    if (name === "image" && files.length > 0) {
      newVariables[index][name] = files[0];
      newVariables[index].imagePreview = URL.createObjectURL(files[0]);
    } else {
      newVariables[index][name] = value;
    }

    setVariables(newVariables);
  };

  const handleAddRow = () => {
    setVariables([
      ...variables,
      { size: "", color: "", price: "", stock: "", image: null, imagePreview: null },
    ]);
  };

  const handleDeleteRow = (index) => {
    const newVariables = [...variables];
    newVariables.splice(index, 1);
    setVariables(newVariables);
  };

  return (
    <div>
      <h4 className="mb-2">Product Variables</h4>
      {variables.map((variable, index) => (
        <div
          key={index}
          className="flex items-center flex-wrap gap-2 w-full mb-4 border p-3 rounded-lg bg-gray-50"
        >
          {/* your inputs here as is, just use handleChange, etc */}
          {/* ... */}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddRow}
        className="bg-blue-700 p-3 rounded-lg mt-4 text-sm text-white hover:bg-blue-600 transition duration-150"
      >
        Add Variable Product
      </button>
    </div>
  );
};
