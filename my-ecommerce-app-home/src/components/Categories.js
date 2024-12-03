import React, { useState } from 'react';
import '../styles/Categories.css';
import Button from './ButtonComponent';

const Categories = ({ categories }) => {
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const visibleCategories = showMoreCategories ? categories : categories.slice(0, 2);

  const handleViewMore = () => {
    setShowMoreCategories(true);
  };

  const handleViewLess = () => {
    setShowMoreCategories(false);
  };

  return (
    <section className="categories">
      <h2>Explore Our Categories</h2>
      <div className="category-cards">
        {visibleCategories.map((category) => (
          <div key={category.id} className="category-card">
            <img src={category.image} alt={category.title} className="category-image" />
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <ul>
              {category.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {!showMoreCategories ? (
        <Button label="View More" onClick={handleViewMore} />
      ) : (
        <Button label="View Less" onClick={handleViewLess} />
      )}
    </section>
  );
};

export default Categories;
