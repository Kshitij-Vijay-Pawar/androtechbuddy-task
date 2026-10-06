

export default async function Home() {
    const res = await fetch("/api/products");
    const products = await res.json();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product: any) => (
        <div key={product.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p className="text-gray-600">${product.price}</p>
        </div>
      ))}
    </div>
  );
}   