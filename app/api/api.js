const getProduct = async () => {
    const res = await fetch(`${BASE_URL}`);
    const data = await res.json();
    const response = { ...data.map((product) => ({
        id: product.id,
        image: product.image,
        name: product.name,
        rating: product.rating,
        price: product.priceCents,
        category: product.category,
        subCategory: product.subCategory,
        keywords: product.keywords,
        description: product.description
    })) };
    return response;

}

