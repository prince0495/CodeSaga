"use client";

import React from "react";

const TestingAddProblem = () => {
  const handleClick = async () => {
    try {
      const response = await fetch("/api/dev/addproblem", {
        method: "POST",
      });

      if (!response.ok) {
        console.log(JSON.stringify(response));
        
      }

      const text = await response.text(); // Read the response as text first

      let data;
      try {
        data = text ? JSON.parse(text) : null; // Parse JSON only if response has content
      } catch (error) {
        console.error("Error parsing JSON:", error);
        data = null; // Handle invalid JSON gracefully
      }

      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Add Problem Page</h1>
      <button onClick={handleClick} className="px-4 py-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </div>
  );
};

export default TestingAddProblem;
