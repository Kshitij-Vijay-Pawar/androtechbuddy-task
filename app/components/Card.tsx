"use client";

import useCartStore from "../store/cart";

interface Product {
  id: string | number;
  image: string;
  title: string;
  rating?: {
    stars?: number;
    count?: number;
  };
  price: string | number;
  category?: string;
  subCategory?: string;
  keywords?: string[];
  description?: string;
}

const Card = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border p-4 rounded shadow">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-4">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span>No Image</span>
        )}
      </div>
      {product.rating && (
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-2">{product.rating.stars ?? 0} ★</span>
          <span className="text-gray-600">({product.rating.count ?? 0})</span>
        </div>
      )}
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-2 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default Card;