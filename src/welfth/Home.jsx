// pages/Home.jsx
import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import HeroBanner from '../components/HeroBanner';
import CategoryBanner from '../components/CategoryBanner';
import LoadingSkeleton from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';
import './Home.css';

const PRODUCTS_PER_PAGE = 12;

export default function Home({ addToCart, products = [], categories = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(!products.length);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Initialize filters from URL params or defaults
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: JSON.parse(searchParams.get('priceRange') || [0, 1000],
    sortBy: searchParams.get('sortBy') || 'featured',
    rating: searchParams.get('rating') ? parseInt(searchParams.get('rating')) : null,
    color: searchParams.getAll('color') || [],
    onSale: searchParams.get('onSale') === 'true'
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.sortBy !== 'featured') params.set('sortBy', filters.sortBy);
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) 
      params.set('priceRange', JSON.stringify(filters.priceRange));
    if (filters.rating) params.set('rating', filters.rating);
    if (filters.color.length) filters.color.forEach(c => params.append('color', c));
    if (filters.onSale) params.set('onSale', 'true');
    
    setSearchParams(params);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, setSearchParams]);

  // Apply filters and search
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    
    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(p => p.category === filters.category);
    }
    
    // Price range filter
    result = result.filter(p => {
      const price = p.onSale ? p.salePrice : p.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    
    // Rating filter
    if (filters.rating) {
      result = result.filter(p => p.rating >= filters.rating);
    }
    
    // Color filter
    if (filters.color.length) {
      result = result.filter(p => 
        p.colors?.some(color => filters.color.includes(color))
      );
    }
    
    // Sale filter
    if (filters.onSale) {
      result = result.filter(p => p.onSale);
    }
    
    // Sorting
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.onSale ? a.salePrice : a.price) - (b.onSale ? b.salePrice : b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.onSale ? b.salePrice : b.price) - (a.onSale ? a.salePrice : a.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
      default: // 'featured'
        result.sort((a, b) => b.isFeatured - a.isFeatured);
    }
    
    return result;
  }, [products, filters, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Featured products for hero banner
  const featuredProducts = useMemo(() => 
    products.filter(p => p.isFeatured).slice(0, 3), 
    [products]
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterReset = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 1000],
      sortBy: 'featured',
      rating: null,
      color: [],
      onSale: false
    });
    setSearchQuery('');
  };

  return (
    <div className="home-page">
      <HeroBanner products={featuredProducts} />
      
      <div className="home-content">
        <SearchBar 
          onSearch={handleSearch} 
          searchQuery={searchQuery}
        />
        
        <div className="category-banners">
          {categories.slice(0, 3).map(category => (
            <CategoryBanner 
              key={category.id} 
              category={category}
              onClick={() => setFilters(prev => ({
                ...prev,
                category: category.slug
              }))}
            />
          ))}
        </div>
        
        <div className="product-layout">
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters}
            categories={categories}
            onReset={handleFilterReset}
          />
          
          <main className="product-grid-container">
            <div className="product-grid-header">
              <h2>
                {filters.category === 'all' ? 'All Products' : 
                 categories.find(c => c.slug === filters.category)?.name}
              </h2>
              <div className="product-count">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </div>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  sortBy: e.target.value
                }))}
                className="sort-dropdown"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rating">Top Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            
            {isLoading ? (
              <div className="loading-grid">
                {[...Array(8)].map((_, i) => <LoadingSkeleton key={i} />)}
              </div>
            ) : filteredProducts.length === 0 ? (
              <EmptyState 
                title="No products found"
                message="Try adjusting your search or filters"
                onReset={handleFilterReset}
              />
            ) : (
              <>
                <div className="product-grid">
                  {paginatedProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      addToCart={addToCart} 
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
