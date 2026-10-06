import { getProduct } from "@/app/api/api";
import Hero from "@/app/components/Hero";
import ProductCatalog from "@/app/components/ProductCatalog";

export default async function Home() {
  const products = await getProduct();

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProductCatalog
        
        initialProducts={products}
        title="Featured Collection"
        subtitle="Browse through our high quality selection with real-time instant search and category filtering."
      />
    </div>
  );
}