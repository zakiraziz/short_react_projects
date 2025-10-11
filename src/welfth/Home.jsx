// pages/Home.jsx
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import HeroBanner from '../components/HeroBanner';
import CategoryGrid from '../components/CategoryGrid';
import Newsletter from '../components/Newsletter';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import './Home.css';

export default function Home({ addToCart, addToWishlist }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterLoading, setIsFilterLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: [0, 1000],
    sortBy: searchParams.get('sort') || 'featured',
    brands: [],
    sizes: [],
    colors: [],
    rating: 0,
    inStock: false,
    onSale: false
  });

  // Enhanced mock products data
  const mockProducts = useMemo(() => [
    {
      id: 1,
      name: 'Nike Air Max 270',
      price: 150,
      salePrice: 120,
      onSale: true,
      image: '/images/air-max-270.jpg',
      category: 'running',
      colors: ['black', 'white', 'red'],
      sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
      brand: 'nike',
      rating: 4.5,
      reviewCount: 128,
      stock: 25,
      featured: true,
      description: 'The Nike Air Max 270 delivers the tallest Air unit yet for unbelievable comfort all day.',
      tags: ['new', 'trending', 'comfort']
    },
    {
      id: 2,
      name: 'Adidas Ultraboost 21',
      price: 180,
      salePrice: null,
      onSale: false,
      image: '/images/ultraboost-21.jpg',
      category: 'running',
      colors: ['black', 'blue', 'white'],
      sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
      brand: 'adidas',
      rating: 4.8,
      reviewCount: 95,
      stock: 15,
      featured: true,
      description: 'Experience ultimate energy return with Boost technology.',
      tags: ['premium', 'performance']
    },
    {
      id: 3,
      name: 'Jordan 1 Retro High',
      price: 170,
      salePrice: 140,
      onSale: true,
      image: '/images/jordan-1.jpg',
      category: 'lifestyle',
      colors: ['red', 'black', 'white'],
      sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
      brand: 'jordan',
      rating: 4.7,
      reviewCount: 203,
      stock: 8,
      featured: false,
      description: 'Classic basketball style meets modern comfort.',
      tags: ['classic', 'basketball']
    },
    {
      id: 4,
      name: 'New Balance 574',
      price: 85,
      salePrice: null,
      onSale: false,
      image: '/images/nb-574.jpg',
      category: 'lifestyle',
      colors: ['grey', 'navy', 'green'],
      sizes: ['US 7', 'US 8', 'US 9', 'US 10'],
      brand: 'new-balance',
      rating: 4.3,
      reviewCount: 87,
      stock: 32,
      featured: false,
      description: 'Timeless style with superior comfort.',
      tags: ['comfort', 'casual']
    },
    {
      id: 5,
      name: 'Converse Chuck Taylor All Star',
      price: 55,
      salePrice: 45,
      onSale: true,
      image: '/images/converse-chuck.jpg',
      category: 'lifestyle',
      colors: ['black', 'white', 'red', 'blue'],
      sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
      brand: 'converse',
      rating: 4.2,
      reviewCount: 156,
      stock: 45,
      featured: false,
      description: 'The classic canvas sneaker that never goes out of style.',
      tags: ['classic', 'canvas']
    },
    {
      id: 6,
      name: 'Hoka One One Clifton 8',
      price: 140,
      salePrice: null,
      onSale: false,
      image: '/images/hoka-clifton.jpg',
      category: 'running',
      colors: ['black', 'blue', 'orange'],
      sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
      brand: 'hoka',
      rating: 4.6,
      reviewCount: 67,
      stock: 18,
      featured: true,
      description: 'Plush cushioning for maximum comfort on long runs.',
      tags: ['cushioned', 'running']
    }
  ], []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [mockProducts]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.sortBy !== 'featured') params.set('sort', filters.sortBy);
    if (searchQuery) params.set('search', searchQuery);
    
    setSearchParams(params);
  }, [filters.category, filters.sortBy, searchQuery, setSearchParams]);

  // Apply filters and search
  useEffect(() => {
    setIsFilterLoading(true);
    
    const timeoutId = setTimeout(() => {
      let result = [...products];
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.tags.some(tag => tag.toLowerCase().includes(query))
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
      
      // Brand filter
      if (filters.brands.length > 0) {
        result = result.filter(p => filters.brands.includes(p.brand));
      }
      
      // Rating filter
      if (filters.rating > 0) {
        result = result.filter(p => p.rating >= filters.rating);
      }
      
      // Stock filter
      if (filters.inStock) {
        result = result.filter(p => p.stock > 0);
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
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => b.id - a.id); // Using ID as proxy for newness
          break;
        case 'name':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default: // 'featured'
          result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      }
      
      setFilteredProducts(result);
      setCurrentPage(1); // Reset to first page when filters change
      setIsFilterLoading(false);
    }, 300); // Debounce filter changes

    return () => clearTimeout(timeoutId);
  }, [filters, products, searchQuery]);

  // Pagination
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(startIndex, startIndex + productsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Filter stats
  const filterStats = useMemo(() => ({
    total: products.length,
    showing: filteredProducts.length,
    onSale: products.filter(p => p.onSale).length,
    inStock: products.filter(p => p.stock > 0).length,
    categories: [...new Set(products.map(p => p.category))],
    brands: [...new Set(products.map(p => p.brand))]
  }), [products, filteredProducts]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      category: 'all',
      priceRange: [0, 1000],
      sortBy: 'featured',
      brands: [],
      sizes: [],
      colors: [],
      rating: 0,
      inStock: false,
      onSale: false
    });
    setSearchQuery('');
  }, []);

  const handleQuickAdd = useCallback((product) => {
    addToCart(product);
    // You could add a toast notification here
  }, [addToCart]);

  if (isLoading) {
    return (
      <div className="home-page">
        <HeroBanner isLoading={true} />
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="home-page">
      <HeroBanner 
        title="Step Into Style"
        subtitle="Discover the latest collection of premium sneakers"
        ctaText="Shop Now"
        ctaLink="/category/featured"
        image="/images/hero-banner.jpg"
      />
      
      <CategoryGrid 
        categories={[
          { id: 'running', name: 'Running', image: '/images/category-running.jpg', count: filterStats.categories.filter(c => c === 'running').length },
          { id: 'lifestyle', name: 'Lifestyle', image: '/images/category-lifestyle.jpg', count: filterStats.categories.filter(c => c === 'lifestyle').length },
          { id: 'basketball', name: 'Basketball', image: '/images/category-basketball.jpg', count: filterStats.categories.filter(c => c === 'basketball').length },
          { id: 'sale', name: 'On Sale', image: '/images/category-sale.jpg', count: filterStats.onSale }
        ]}
        onCategorySelect={(category) => setFilters(prev => ({ ...prev, category }))}
      />

      <div className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Discover our most popular sneakers</p>
          </div>

          <div className="products-controls">
            <div className="controls-left">
              <button 
                className={`filter-toggle ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters {showFilters ? '✕' : '☰'}
              </button>
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search products..."
              />
            </div>
            
            <div className="controls-right">
              <div className="results-count">
                Showing {filteredProducts.length} of {products.length} products
              </div>
              
              <select 
                className="sort-select"
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>

          <div className="products-layout">
            <FilterSidebar 
              filters={filters}
              setFilters={setFilters}
              isOpen={showFilters}
              onClose={() => setShowFilters(false)}
              stats={filterStats}
              onClearFilters={handleClearFilters}
            />
            
            <main className="products-main">
              {isFilterLoading ? (
                <ProductGridSkeleton count={8} />
              ) : filteredProducts.length === 0 ? (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or search terms</p>
                  <button 
                    className="clear-filters-btn"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="product-grid">
                    {paginatedProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        addToCart={handleQuickAdd}
                        addToWishlist={addToWishlist}
                        showQuickAdd={true}
                      />
                    ))}
                  </div>
                  
                  {totalPages > 1 && (
                    <div className="pagination">
                      <button 
                        className="pagination-btn"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => prev - 1)}
                      >
                        Previous
                      </button>
                      
                      <div className="pagination-pages">
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(page => 
                            page === 1 || 
                            page === totalPages || 
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          )
                          .map((page, index, array) => {
                            const showEllipsis = index < array.length - 1 && array[index + 1] !== page + 1;
                            return (
                              <span key={page}>
                                <button
                                  className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                                  onClick={() => setCurrentPage(page)}
                                >
                                  {page}
                                </button>
                                {showEllipsis && <span className="pagination-ellipsis">...</span>}
                              </span>
                            );
                          })}
                      </div>
                      
                      <button 
                        className="pagination-btn"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>

      <Newsletter />
    </div>
  );
}
