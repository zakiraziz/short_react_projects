// pages/Home.jsx
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import SearchBar from '../components/SearchBar';
import CategoryGrid from '../components/CategoryGrid';
import HeroBanner from '../components/HeroBanner';
import Newsletter from '../components/Newsletter';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import './Home.css';

export default function Home({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [showFilters, setShowFilters] = useState(false);
  
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const filters = useState({
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

  // Mock product data
  const mockProducts = useMemo(() => [
    {
      id: 1,
      name: 'Nike Air Max 270',
      price: 150,
      salePrice: 120,
      onSale: true,
      image: '/images/air-max-270.jpg',
      category: 'running',
      brand: 'nike',
      colors: ['black', 'white', 'red'],
      sizes: [7, 8, 9, 10, 11, 12],
      rating: 4.5,
      reviewCount: 128,
      description: 'The Nike Air Max 270 delivers the tallest Air Max unit yet for unbelievable comfort.',
      features: ['Max Air cushioning', 'Breathable mesh', 'Rubber outsole'],
      stock: 15,
      isNew: true,
      releaseDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Adidas Ultraboost 21',
      price: 180,
      salePrice: null,
      onSale: false,
      image: '/images/ultraboost-21.jpg',
      category: 'running',
      brand: 'adidas',
      colors: ['black', 'blue', 'white'],
      sizes: [6, 7, 8, 9, 10, 11],
      rating: 4.8,
      reviewCount: 256,
      description: 'Experience ultimate energy return with Boost cushioning.',
      features: ['Boost midsole', 'Primeknit upper', 'Stretchweb outsole'],
      stock: 8,
      isNew: false,
      releaseDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'New Balance 574',
      price: 85,
      salePrice: 65,
      onSale: true,
      image: '/images/nb-574.jpg',
      category: 'lifestyle',
      brand: 'new-balance',
      colors: ['grey', 'navy', 'green'],
      sizes: [7, 8, 9, 10, 11, 12, 13],
      rating: 4.3,
      reviewCount: 89,
      description: 'Classic heritage style meets modern comfort.',
      features: ['ENCAP midsole', 'Suede and mesh upper', 'Rubber outsole'],
      stock: 0,
      isNew: false,
      releaseDate: '2023-11-20'
    },
    {
      id: 4,
      name: 'Converse Chuck Taylor All Star',
      price: 55,
      salePrice: null,
      onSale: false,
      image: '/images/chuck-taylor.jpg',
      category: 'lifestyle',
      brand: 'converse',
      colors: ['black', 'white', 'red', 'blue'],
      sizes: [6, 7, 8, 9, 10, 11],
      rating: 4.2,
      reviewCount: 342,
      description: 'The iconic sneaker that started it all.',
      features: ['Canvas upper', 'OrthoLite insole', 'Rubber toe cap'],
      stock: 25,
      isNew: true,
      releaseDate: '2024-02-01'
    },
    {
      id: 5,
      name: 'Under Armour HOVR Phantom',
      price: 130,
      salePrice: 99,
      onSale: true,
      image: '/images/hovr-phantom.jpg',
      category: 'running',
      brand: 'under-armour',
      colors: ['black', 'grey'],
      sizes: [8, 9, 10, 11, 12],
      rating: 4.1,
      reviewCount: 67,
      description: 'Connected footwear that tracks your stats.',
      features: ['HOVR cushioning', 'Compression mesh', 'Energy web'],
      stock: 12,
      isNew: false,
      releaseDate: '2023-12-15'
    },
    {
      id: 6,
      name: 'Puma RS-X',
      price: 110,
      salePrice: null,
      onSale: false,
      image: '/images/rs-x.jpg',
      category: 'lifestyle',
      brand: 'puma',
      colors: ['white', 'black', 'pink'],
      sizes: [7, 8, 9, 10, 11],
      rating: 4.4,
      reviewCount: 156,
      description: 'Bold retro design with modern comfort.',
      features: ['RS cushioning', 'Leather and mesh upper', 'Rubber outsole'],
      stock: 18,
      isNew: true,
      releaseDate: '2024-01-25'
    }
  ], []);

  // Categories data
  const categories = [
    {
      id: 'running',
      name: 'Running',
      image: '/images/category-running.jpg',
      count: 12,
      description: 'Performance running shoes'
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle',
      image: '/images/category-lifestyle.jpg',
      count: 8,
      description: 'Casual everyday sneakers'
    },
    {
      id: 'basketball',
      name: 'Basketball',
      image: '/images/category-basketball.jpg',
      count: 6,
      description: 'Court-ready basketball shoes'
    },
    {
      id: 'training',
      name: 'Training',
      image: '/images/category-training.jpg',
      count: 9,
      description: 'Versatile training footwear'
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [mockProducts]);

  // Filter and search products
  useEffect(() => {
    let result = [...products];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
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
    
    // Brand filter
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }
    
    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes.some(size => filters.sizes.includes(size)));
    }
    
    // Color filter
    if (filters.colors.length > 0) {
      result = result.filter(p => p.colors.some(color => filters.colors.includes(color)));
    }
    
    // Rating filter
    if (filters.rating > 0) {
      result = result.filter(p => p.rating >= filters.rating);
    }
    
    // In stock filter
    if (filters.inStock) {
      result = result.filter(p => p.stock > 0);
    }
    
    // On sale filter
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
        result.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // 'featured'
        // Default sorting - featured products first
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, products, searchQuery]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Featured products (first 4 products)
  const featuredProducts = products.slice(0, 4);

  // New arrivals (products from last 30 days)
  const newArrivals = products.filter(product => {
    const releaseDate = new Date(product.releaseDate);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return releaseDate > thirtyDaysAgo;
  });

  const handleQuickView = (product) => {
    // Implement quick view modal
    console.log('Quick view:', product);
  };

  const handleAddToWishlist = (product) => {
    // This would be handled by the WishlistContext
    console.log('Add to wishlist:', product);
  };

  if (isLoading) {
    return (
      <div className="home-page">
        <HeroBanner />
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  return (
    <div className="home-page">
      {/* Hero Banner */}
      <HeroBanner />
      
      {/* Featured Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Discover our most popular picks</p>
          </div>
          <div className="product-grid featured-grid">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart}
                onQuickView={handleQuickView}
                onAddToWishlist={handleAddToWishlist}
                isInCart={cart.some(item => item.id === product.id)}
                isInWishlist={wishlist.some(item => item.id === product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">Fresh styles just dropped</p>
          </div>
          <div className="product-grid">
            {newArrivals.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                addToCart={addToCart}
                onQuickView={handleQuickView}
                onAddToWishlist={handleAddToWishlist}
                isInCart={cart.some(item => item.id === product.id)}
                isInWishlist={wishlist.some(item => item.id === product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="all-products-section">
        <div className="container">
          <div className="section-header">
            <div className="header-left">
              <h2 className="section-title">All Products</h2>
              <p className="results-count">
                Showing {currentProducts.length} of {filteredProducts.length} products
              </p>
            </div>
            
            <div className="header-right">
              {/* Search Bar */}
              <SearchBar 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search products..."
              />
              
              {/* View Mode Toggle */}
              <div className="view-mode-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  ▣
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  ≡
                </button>
              </div>

              {/* Mobile Filter Toggle */}
              <button 
                className="filter-toggle mobile-only"
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </button>
            </div>
          </div>

          <div className="products-content">
            {/* Filter Sidebar */}
            <div className={`filter-sidebar-wrapper ${showFilters ? 'show' : ''}`}>
              <FilterSidebar 
                filters={filters} 
                setFilters={setFilters}
                onClose={() => setShowFilters(false)}
              />
            </div>
            
            {/* Products Grid/List */}
            <main className="products-main">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${viewMode}-${currentPage}`}
                  className={`product-container ${viewMode}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        addToCart={addToCart}
                        onQuickView={handleQuickView}
                        onAddToWishlist={handleAddToWishlist}
                        isInCart={cart.some(item => item.id === product.id)}
                        isInWishlist={wishlist.some(item => item.id === product.id)}
                        viewMode={viewMode}
                      />
                    ))
                  ) : (
                    <div className="no-products">
                      <h3>No products found</h3>
                      <p>Try adjusting your filters or search terms</p>
                      <button 
                        className="clear-filters-btn"
                        onClick={() => {
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
                        }}
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  
                  <button 
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => paginate(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Special Offers Banner */}
      <section className="offers-banner">
        <div className="container">
          <div className="offer-card">
            <h3>Free Shipping</h3>
            <p>On all orders over $100</p>
          </div>
          <div className="offer-card">
            <h3>30-Day Returns</h3>
            <p>Hassle-free returns</p>
          </div>
          <div className="offer-card">
            <h3>Secure Payment</h3>
            <p>100% secure payment processing</p>
          </div>
        </div>
      </section>
    </div>
  );
}
