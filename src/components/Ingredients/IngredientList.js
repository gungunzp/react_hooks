import React, { useState, useEffect } from 'react';

import './IngredientList.css';

const IngredientList = props => {
  console.log('RENDERING INGREDIENT LIST');

  const [scrollDepth, setScrollDepth] = useState(0);

  const determineUserScrollDepth = () => {
    const scrolled =
      document.documentElement.scrollTop || document.body.scrollTop;
    setScrollDepth(scrolled);
  };

  useEffect(() => {
    window.addEventListener('scroll', determineUserScrollDepth);
    return () => window.removeEventListener('scroll', determineUserScrollDepth);
  });

  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
      <div className="scroll-indicator">
        You've scrolled this far: {scrollDepth}
      </div>
    </section>
  );
};

export default IngredientList;
