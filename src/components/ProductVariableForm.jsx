import React, { useState } from "react";

const ProductVariableForm = () => {
  const [variables, setVariables] = useState([
    { size: "S", color: "#2563eb", price: "", stock: "" },
  ]);

  // Handle change in each input field
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newVariables = [...variables];
    newVariables[index][name] = value;
    setVariables(newVariables);
  };

  // Add new row
  const handleAddRow = () => {
    setVariables([
      ...variables,
      { size: "S", color: "#2563eb", price: "", stock: "" },
    ]);
  };

  // Optional: Delete row
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
          className="flex items-center justify-start gap-2 w-full mb-2"
        >
          <div>
            <select
              name="size"
              value={variable.size}
              onChange={(e) => handleChange(index, e)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
              <option value="XXL">XXL</option>
            </select>
          </div>

          <div>
            <input
              type="color"
              name="color"
              value={variable.color}
              onChange={(e) => handleChange(index, e)}
              className="p-1 h-10 w-14 block bg-white border border-gray-200 cursor-pointer rounded-lg"
            />
          </div>

          <div>
            <input
              name="price"
              value={variable.price}
              onChange={(e) => handleChange(index, e)}
              type="number"
              placeholder="Price"
              className="block h-10 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400"
            />
          </div>

          <div>
            <input
              name="stock"
              value={variable.stock}
              onChange={(e) => handleChange(index, e)}
              type="number"
              placeholder="Stock"
              className="block h-10 w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400"
            />
          </div>

          {/* Optional Delete Button */}
          <button
            type="button"
            onClick={() => handleDeleteRow(index)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
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

export default ProductVariableForm;
