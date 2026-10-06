const BASE_URL =
  process.env.BASE_URL ||
  "https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json";

const getProduct = async () => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }
  const data = await res.json();
  const response = data.map((product) => ({
    id: product.id,
    image: product.image,
    name: product.name,
    title: product.name,
    rating: product.rating,
    price: (product.priceCents / 100).toFixed(2),
    priceCents: product.priceCents,
    category: product.category,
    subCategory: product.subCategory,
    keywords: product.keywords,
    description: product.description,
  }));
  return response;
};

const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch product: ${res.statusText}`);
  }
  const data = await res.json();
  const product = data.find((product) => product.id === id);
  if (!product) {
    return null;
  }
  const response = {
    id: product.id,
    image: product.image,
    name: product.name,
    title: product.name,
    rating: product.rating,
    price: (product.priceCents / 100).toFixed(2),
    priceCents: product.priceCents,
    category: product.category,
    subCategory: product.subCategory,
    keywords: product.keywords,
    description: product.description,
  };
  return response;
};

export { getProduct, getProduct as getProducts, getProductById };
