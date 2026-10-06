import { getProduct } from "@/app/api/api";
import Card from "@/app/components/Card";
import useCartStore from "@/app/store/cart";

interface Product {
  id: string;
  name: string;
  title: string;
  price: string | number;
  image: string;
}

export default async function Home() {
  const products = await getProduct();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product: Product) => (
        <Card key={product.id} product={product} />
      ))}


    </div>
  );
}