import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for a cart item
interface CartItem {
  id: number;
  quantity: number;
}

// Define the type for the cart context state
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
}

// Create the cart context with an initial value of null
const CartContext = createContext<CartContextType | null>(null);

// Define the type for the provider props
interface CartProviderProps {
  children: ReactNode;
}

// Create the cart context provider
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Function to add an item to the cart
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, item];
      }
    });
  };

  // Function to remove an item from the cart
  const removeFromCart = (item: CartItem) => {
    console.log(item?.id);
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      console.log(existingItem)
      if (existingItem && existingItem?.quantity > 1) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        return [...prevCart.filter((cartItem) => cartItem.id !== item.id)];
      }
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };
  console.log(cart);
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
