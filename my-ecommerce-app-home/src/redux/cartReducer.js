import { ADD_ITEM, REMOVE_ITEM, MODIFY_QUANTITY, EMPTY_CART } from './cartAction';

const initialState = {
  cart: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const itemExists = state.cart.find(
        (item) =>
          item.id === action.payload.id && item.selectedOption === action.payload.selectedOption
      );

      if (itemExists) {
        const newQuantity = itemExists.quantity + action.payload.quantity;

        if (newQuantity > action.payload.availableQuantity) {
          alert(`Impossible to add more. Max amount: ${action.payload.availableQuantity}.`);
          return state;
        }

        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id && item.selectedOption === action.payload.selectedOption
              ? { ...item, quantity: newQuantity }
              : item
          ),
        };
      } else {
        if (action.payload.quantity > action.payload.availableQuantity) {
          alert(`Impossible to add more. Max amount: ${action.payload.availableQuantity}.`);
          return state;
        }

        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }

    case REMOVE_ITEM:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id || item.selectedOption !== action.payload.selectedOption),
      };

    case MODIFY_QUANTITY:
      const itemToUpdate = state.cart.find(
        (item) => item.id === action.payload.productId && item.selectedOption === action.payload.selectedOption
      );

      const maxQty = itemToUpdate?.selectableOptions?.find(
        (opt) => opt.value === action.payload.selectedOption
      )?.quantity;

      if (action.payload.quantity > maxQty) {
        return {
          ...state,
          error: `Cannot update quantity beyond ${maxQty} for ${itemToUpdate.title} (${itemToUpdate.selectedOption})`,
        };
      }

      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.productId && item.selectedOption === action.payload.selectedOption
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case EMPTY_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export default rootReducer;
