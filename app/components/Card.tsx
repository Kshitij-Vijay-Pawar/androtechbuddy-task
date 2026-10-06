import {Cart} from "lucide-react";

interface Product {
  id: number;
  image: string;
  title: string;
  rating: {
    stars: number;
    count: number;
  };
  price: number;
  category: string;
  subCategory: string;
  keywords: string[];
  description: string;
}




const Card = ({ product }: { product: Product }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      <button className="mt-2 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        <Cart size={16} />
        Add to Cart
      </button>
    </div>
  );
}