// actions.js
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const MODIFY_QUANTITY = 'MODIFY_QUANTITY';
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE';
export const SET_ERROR = 'SET_ERROR';
export const EMPTY_CART = 'EMPTY_CART';
export const LOAD_CART = 'LOAD_CART';

// Action Creator
export const loadCart = (cart) => ({
  type: LOAD_CART,
  payload: cart,
});

export const emptyCart = () => ({
  type: EMPTY_CART,
});

export const addItem = (product) => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const existingItem = cart.find(
      (item) => item.id === product.id && item.selectedOption === product.selectedOption
    );

    if (existingItem) {
      const maxQuantity = product.selectableOptions.find(
        (option) => option.value === product.selectedOption
      )?.quantity;

      if (existingItem.quantity + product.quantity > maxQuantity) {
        alert(`Cannot add more than ${maxQuantity} of ${product.title} (${product.selectedOption})`);
        return;
      }
    }

    dispatch({
      type: ADD_ITEM,
      payload: product,
    });
  };
};

export const removeItem = (product) => ({
  type: REMOVE_ITEM,
  payload: product,
});

export const modifyQuantity = (productId, selectedOption, quantity) => {
  return (dispatch, getState) => {
    const { cart } = getState();
    const item = cart.find(
      (item) => item.id === productId && item.selectedOption === selectedOption
    );

    if (item) {
      const maxQuantity = item.selectableOptions.find(
        (option) => option.value === selectedOption
      )?.quantity;

      if (quantity > maxQuantity) {
        dispatch(setError(`Cannot update quantity beyond ${maxQuantity} for ${item.title} (${selectedOption})`));
        return;
      }
    }

    dispatch({
      type: MODIFY_QUANTITY,
      payload: { productId, selectedOption, quantity },
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: REQUEST_PRODUCTS });

    try {
      const response = await fetch('http://localhost:3001/api/items');
      const data = await response.json();
      dispatch({ type: RECEIVE_PRODUCTS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCTS_FAILURE, error: error.message });
    }
  };
};

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const clearError = () => ({
  type: SET_ERROR,
  payload: null,
});
