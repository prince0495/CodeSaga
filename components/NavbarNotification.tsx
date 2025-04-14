"use client";

import { useState, useEffect, useRef } from "react";
import NotificationTab from "./NotificationTab";

const NavbarNotification = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center">
      {/* Notification Icon */}
      <div
        className="flex justify-center items-center cursor-pointer text-[#cbcbcbd1] text-xl font-semibold mr-auto hover:scale-105 transition duration-300 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          color={"#cbcbcbd1"}
          fill={"none"}
        >
          <path
            d="M5.15837 11.491C5.08489 12.887 5.16936 14.373 3.92213 15.3084C3.34164 15.7438 3 16.427 3 17.1527C3 18.1508 3.7818 19 4.8 19H19.2C20.2182 19 21 18.1508 21 17.1527C21 16.427 20.6584 15.7438 20.0779 15.3084C18.8306 14.373 18.9151 12.887 18.8416 11.491C18.6501 7.85223 15.6438 5 12 5C8.35617 5 5.34988 7.85222 5.15837 11.491Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.5 3.125C10.5 3.95343 11.1716 5 12 5C12.8284 5 13.5 3.95343 13.5 3.125C13.5 2.29657 12.8284 2 12 2C11.1716 2 10.5 2.29657 10.5 3.125Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Notification Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-20 top-12 right-0 w-56 cs:w-80 bg-[#1c1c1c] border border-[#4d4d4d] rounded-lg shadow-lg text-white p-2 max-h-[80vh] overflow-y-auto"
        >
          <NotificationTab/>
        </div>
      )}
    </div>
  );
};

export default NavbarNotification;
