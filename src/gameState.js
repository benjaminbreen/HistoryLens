// In gameState.js

import { useState, useCallback } from 'react';

export const useGameState = (initialInventory = []) => {
  const [gameState, setGameState] = useState({
    inventory: initialInventory.map(item => ({
      ...item,
      name: item.name ? item.name.toLowerCase() : ''
    })),
  });

  const updateInventory = useCallback((updateItem) => {
    if (!updateItem || typeof updateItem !== 'object' || !updateItem.name) {
      console.error('Invalid updateItem:', updateItem);
      return;
    }

    setGameState((prevState) => {
      const updatedInventory = prevState.inventory.map((item) => {
        if (!item.name) {
          console.error('Inventory item missing name:', item);
          return item;
        }
        return item.name.toLowerCase() === updateItem.name.toLowerCase()
          ? { ...item, quantity: Math.max(0, item.quantity + updateItem.quantity) }
          : item;
      });
      return { ...prevState, inventory: updatedInventory };
    });
  }, []);

  const addCompoundToInventory = useCallback((compound) => {
    if (!compound || typeof compound !== 'object' || !compound.name) {
      console.error('Invalid compound:', compound);
      return;
    }

    setGameState((prevState) => {
      const existingItem = prevState.inventory.find(item => 
        item.name.toLowerCase() === compound.name.toLowerCase()
      );

      if (existingItem) {
        return {
          ...prevState,
          inventory: prevState.inventory.map(item =>
            item.name.toLowerCase() === compound.name.toLowerCase()
              ? { ...item, quantity: item.quantity + (compound.quantity || 1) }
              : item
          )
        };
      } else {
        return {
          ...prevState,
          inventory: [...prevState.inventory, {...compound, name: compound.name.toLowerCase()}],
        };
      }
    });
  }, []);

  return {
    gameState,
    updateInventory,
    addCompoundToInventory,
  };
};