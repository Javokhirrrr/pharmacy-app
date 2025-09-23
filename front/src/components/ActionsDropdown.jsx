import React, { useState, useRef, useEffect } from "react";
import { FaEllipsisV, FaTrash, FaEdit, FaCalculator } from "react-icons/fa";

const ActionsDropdown = ({ onEdit, onQuantity, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Click outside dropdownni yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded hover:bg-gray-200"
      >
        <FaEllipsisV />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-50">
          <button
            onClick={() => { onEdit(); setOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
          >
            <FaEdit /> Tahrirlash
          </button>
          <button
            onClick={() => { onQuantity(); setOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100"
          >
            <FaCalculator /> Qoldiqni o‘zgartirish
          </button>
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-red-600"
          >
            <FaTrash /> O‘chirish
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionsDropdown;
