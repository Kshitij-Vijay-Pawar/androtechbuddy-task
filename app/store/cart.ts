import { create } from "zustand";

export interface CartItem {
  id: string | number;
  image?: string;
  title: string;
  name?: string;
  price: string | number;
  quantity?: number;
  category?: string;
  rating?: {
    stars?: number;
    count?: number;
  };
  description?: string;
  subCategory?: string;
  keywords?: string[];
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (itemId: string | number, delta: number) => void;
  removeFromCart: (itemId: string | number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i
          ),
        };
      }
      return {
        cartItems: [...state.cartItems, { ...item, quantity: 1 }],
      };
    }),
  updateQuantity: (itemId, delta) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) => {
          if (item.id === itemId) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    })),
  removeFromCart: (itemId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== itemId),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;