// pages/Home.jsx
import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import './Home.css';

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 500],
    sortBy: 'featured'
  });

  useEffect(() => {
    // Simulate API fetch
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // In a real app, you would fetch from an API
        const mockProducts = [
          {
            id: 1,
            name: 'Air Max 270',
            price: 150,
            salePrice: 120,
            onSale: true,
            image: '/images/air-max-270.jpg',
            category: 'running',
            colors: ['black', 'white', 'red']
          },
          // More products...
        ];
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...products];
    
    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }
    
    // Price range filter
    result = result.filter(p => 
      (p.onSale ? p.salePrice : p.price) >= filters.priceRange[0] && 
      (p.onSale ? p.salePrice : p.price) <= filters.priceRange[1]
    );
    
    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      default: // 'featured'
        // Default sorting
    }
    
    setFilteredProducts(result);
  }, [filters, products]);

  return (
    <div className="home-page">
      <FilterSidebar filters={filters} setFilters={setFilters} />
      
      <main className="product-grid">
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))
        )}
      </main>
    </div>
  );
}