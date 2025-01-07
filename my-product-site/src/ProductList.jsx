import React, { useState } from 'react';

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: "Boric Powder",
      price: 1,
      category: "Powder",
      image: "/images/Boric.jpg"
    },
    {
      id: 2,
      name: "Limda",
      price: 2,
      category: "Soap",
      image: "/images/Limda.jpeg"
    },
    {
      id: 3,
      name: "Nail Cutter",
      price: 3,
      category: "Cutter",
      image: "/images/Limda.jpg"
    },
    {
      id: 4,
      name: "Goorej Powder",
      price: 4,
      category: "Powder",
      image: "/images/Goorej.jpg"
    },
    {
      id: 5,
      name: "Books",
      price: 5,
      category: "Books",
      image: "/api/placeholder/200/200"
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');


  const uniqueCategories = [
    ...new Set(products.map((product) => product.category))
  ];

  const filteredProducts = products.filter(product =>
    (product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory ? product.category === selectedCategory : true)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price;
    } else if (sortOrder === 'desc') {
      return b.price - a.price;
    } else if (sortOrder === 'name') {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 rounded-xl shadow-xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Abhijeet Enterprise</h1>

        <div className="flex flex-wrap gap-4 justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-lg"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full max-w-md px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-lg"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full max-w-md px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-lg"
          >
            <option value="name">Name: A to Z</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>     
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {sortedProducts.length > 0 ? sortedProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between p-6 hover:bg-gray-100">
              <div className="flex-1">
                <h2 className="text-3xl font-semibold text-gray-800 mb-3">{product.name}</h2>
                <p className="text-lg text-gray-600 mb-2">{product.category}</p>
                <p className="font-semibold text-blue-600 text-xl">₹ {product.price.toFixed(2)}</p>
              </div>
              <div className="w-32 h-32 flex-shrink-0 ml-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        )) : (
          <p className="text-center text-gray-500 mt-8">No products found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
