const products = [];

const getAllProducts = () => Promise.resolve(products);

const addProduct = (product) => {
  const newProduct = { id: products.length + 1, ...product };
  products.push(newProduct);
  return Promise.resolve(newProduct);
};

const deleteProduct = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) products.splice(index, 1);
  return Promise.resolve();
};

export default { getAllProducts, addProduct, deleteProduct };
