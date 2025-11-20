import {
  CartIconProps,
  CartContextType,
  CartItem,
  CartProviderProps,
  Product,
} from "@/types";
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the Cart Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the Provider component

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart items from AsyncStorage on mount

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem("cart");
        if (savedCart) {
          setItems(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading cart from storage", error);
      }
    };
    loadCart();
  }, []);

  // Save cart items to AsyncStorage whenever they change

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem("cart", JSON.stringify(items));
      } catch (error) {
        console.error("Error saving cart to storage", error);
      }
    };
    saveCart();
  }, [items]);

  // Add product to cart
  const addItem = (product: Product, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { product, quantity }];
      }
    });
  };

    // Remove product from cart
    const removeItem = (porductId: number)=> {
        setItems((prevItems) => prevItems.filter(item => item.product.id !== porductId))
    }
};
