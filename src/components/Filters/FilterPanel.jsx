import React from "react";

const FilterPanel = ({ filters, setFilters }) => {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <h3>Filters</h3>
      <select onChange={(e) => handleFilterChange("gender", e.target.value)}>
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <select onChange={(e) => handleFilterChange("ageGroup", e.target.value)}>
        <option value="">Age Group</option>
        <option value="15-25">15-25</option>
        <option value=">25">>25</option>
      </select>
    </div>
  );
};

export default FilterPanel;
