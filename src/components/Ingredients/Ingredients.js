import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => console.log('RENDERING INGREDIENTS', userIngredients), [
    userIngredients
  ]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-update-3260a.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        setIsLoading(false);
        return response.json();
      })
      .then(responseData => {
        console.log(responseData);

        setUserIngredients(prevIndgredients => [
          ...prevIndgredients,
          { id: responseData.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(
      `https://react-hooks-update-3260a.firebaseio.com/ingredients/${ingredientId}.jon`,
      {
        method: 'DELETE'
      }
    )
      .then(response => {
        setIsLoading(false);
        setUserIngredients(prevIndgredients =>
          prevIndgredients.filter(ingredient => ingredient.id !== ingredientId)
        );
      })
      .catch(error => {
        setError('Something went wrong!');
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={() => setError(null)}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
        {/* Need to add list here! */}
      </section>
    </div>
  );
};

export default Ingredients;
