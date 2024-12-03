// CatalogFilters.js
import React from 'react';
import SelectFilter from './SelectFilter';
// import PrimaryButton from './PrimaryButton';

const CatalogFilters = ({ 
  selectedCategory, 
  setSelectedCategory, 
  sortCriteria, 
  setSortCriteria, 
  sortOrder, 
  setSortOrder, 
  handleApplyFilters, 
  resetFilters 
}) => {
  return (
    <div className="filters">
      <div className="filter-group">
        <SelectFilter
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={[
            { value: '', label: 'All Categories' },
            { value: 'Books', label: 'Books' },
            { value: 'Author Signs', label: 'Author Signs' },
            { value: 'Audiobooks', label: 'Audiobooks' },
            { value: 'Book Events', label: 'Book Events' },
          ]}
        />

        <SelectFilter
          value={sortCriteria}
          onChange={(e) => setSortCriteria(e.target.value)}
          options={[
            { value: '', label: 'Select sorting criteria' },
            { value: 'name', label: 'Name' },
            { value: 'price', label: 'Price' },
            { value: 'category', label: 'Category' },
          ]}
        />

        <SelectFilter
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          options={[
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' },
          ]}
          disabled={!sortCriteria}
        />
      </div>

      <div className="filter-buttons">
        {/* <PrimaryButton label="Apply" onClick={handleApplyFilters} /> */}
        <button className="reset-button" onClick={resetFilters}>
          Cancel
          {/* &#x2715; */}
        </button>
      </div>
    </div>
  );
};

export default CatalogFilters;
