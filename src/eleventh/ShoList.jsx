import React, { useState, useEffect, useMemo } from 'react';
import { 
  FaStar, 
  FaRegStar, 
  FaShoppingCart, 
  FaHeart, 
  FaRegHeart, 
  FaEye,
  FaShare,
  FaFire,
  FaBolt,
  FaCheck,
  FaExpand
} from 'react-icons/fa';
import { 
  IoMdOptions, 
  IoMdFlash,
  IoMdTrendingUp 
} from 'react-icons/io';
import { 
  GiRunningShoe 
} from 'react-icons/gi';
import './ShoeList.css';

const shoes = [
  {
    id: 1,
    name: 'Air Max 270',
    brand: 'Nike',
    price: 150,
    discountedPrice: 135,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    hoverImage: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/awjogtdnqxniqkrysoqu/air-max-270-mens-shoes-KkLcGR.png',
    description: 'The Air Max 270 delivers the tallest Air unit yet for unbelievable comfort.',
    rating: 4.5,
    reviews: 128,
    colors: ['black', 'white', 'red'],
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    category: 'men',
    tags: ['running', 'lifestyle', 'comfort'],
    features: ['Air Max technology', 'Breathable mesh', 'Lightweight'],
    stock: 15,
    fastDelivery: true,
    ecoFriendly: false
  },
  {
    id: 2,
    name: 'Ultraboost 22',
    brand: 'Adidas',
    price: 180,
    image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/1ce5d4c0b0f24d8c8f1aad5300d0d8c5_9366/Ultraboost_22_Shoes_Black_GX6257_01_standard.jpg',
    hoverImage: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/9a1f6c9b95a44e3c911aad5300d0e8d5_9366/Ultraboost_22_Shoes_Black_GX6257_02_standard_hover.jpg',
    description: 'Designed for runners, loved by everyone for all-day comfort.',
    rating: 4.8,
    reviews: 245,
    colors: ['black', 'blue', 'white'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    inStock: true,
    isNew: false,
    isFeatured: true,
    isBestseller: true,
    category: 'unisex',
    tags: ['running', 'boost', 'performance'],
    features: ['Boost midsole', 'Primeknit upper', 'Continental rubber'],
    stock: 8,
    fastDelivery: true,
    ecoFriendly: true
  },
  {
    id: 3,
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 80,
    image: 'https://reebok.ugc.bazaarvoice.com/static/reebok_classic_leather/product/1/CN2402_1.jpg',
    hoverImage: 'https://reebok.ugc.bazaarvoice.com/static/reebok_classic_leather/product/2/CN2402_2.jpg',
    description: 'The iconic shoe that started it all. Timeless style meets modern comfort.',
    rating: 4.2,
    reviews: 89,
    colors: ['white', 'navy'],
    sizes: [7, 8, 9, 10, 11],
    inStock: false,
    isNew: false,
    isFeatured: false,
    isBestseller: false,
    category: 'unisex',
    tags: ['lifestyle', 'classic', 'casual'],
    features: ['Leather upper', 'Comfort sockliner', 'Rubber outsole'],
    stock: 0,
    fastDelivery: false,
    ecoFriendly: false
  },
  {
    id: 4,
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    price: 65,
    discountedPrice: 55,
    image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwfa8e5d1a/images/a_107/M9160_A_107X1.jpg',
    hoverImage: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw8c6b8a69/images/a_08/M9160_A_08X1.jpg',
    description: 'The original basketball shoe that became a cultural icon.',
    rating: 4.7,
    reviews: 312,
    colors: ['black', 'white', 'red'],
    sizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    category: 'unisex',
    tags: ['lifestyle', 'basketball', 'iconic'],
    features: ['Canvas upper', 'Rubber toe cap', 'All-star patch'],
    stock: 25,
    fastDelivery: true,
    ecoFriendly: true
  },
  {
    id: 5,
    name: 'Gel-Kayano 28',
    brand: 'ASICS',
    price: 160,
    image: 'https://www.asics.com/dw/image/v2/BBXH_PRD/on/demandware.static/-/Sites-asics-master/default/dw3a8c5b3a/images/1011B334-021/1011B334-021_1.jpg',
    hoverImage: 'https://www.asics.com/dw/image/v2/BBXH_PRD/on/demandware.static/-/Sites-asics-master/default/dw6a5c5a8d/images/1011B334-021/1011B334-021_2.jpg',
    description: 'Premium stability and cushioning for long-distance runners.',
    rating: 4.6,
    reviews: 176,
    colors: ['black', 'blue', 'silver'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    inStock: true,
    isNew: false,
    isFeatured: false,
    isBestseller: false,
    category: 'men',
    tags: ['running', 'stability', 'cushioning'],
    features: ['Gel technology', 'Dynamic DuoMax support', 'AHAR rubber'],
    stock: 12,
    fastDelivery: false,
    ecoFriendly: false
  },
  {
    id: 6,
    name: '990v5',
    brand: 'New Balance',
    price: 175,
    discountedPrice: 155,
    image: 'https://nb.scene7.com/is/image/NB/m990gl5_nb_05_i',
    hoverImage: 'https://nb.scene7.com/is/image/NB/m990gl5_nb_06_i',
    description: 'Handcrafted in the USA with premium materials for ultimate comfort.',
    rating: 4.9,
    reviews: 203,
    colors: ['gray', 'navy'],
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
    isNew: true,
    isFeatured: true,
    isBestseller: true,
    category: 'men',
    tags: ['lifestyle', 'premium', 'made in usa'],
    features: ['Pigskin and mesh upper', 'ENCAP midsole', 'Dual-density collar'],
    stock: 6,
    fastDelivery: true,
    ecoFriendly: false
  }
];

const ShoeList = ({ 
  shoes: propShoes = shoes, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist,
  onQuickView 
}) => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredShoe, setHoveredShoe] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique brands and categories
  const brands = useMemo(() => [...new Set(propShoes.map(shoe => shoe.brand))], [propShoes]);
  const categories = useMemo(() => [...new Set(propShoes.map(shoe => shoe.category))], [propShoes]);

  const toggleWishlist = (shoeId) => {
    if (onToggleWishlist) {
      onToggleWishlist(propShoes.find(shoe => shoe.id === shoeId));
    } else {
      setWishlist(prev => 
        prev.includes(shoeId) 
          ? prev.filter(id => id !== shoeId)
          : [...prev, shoeId]
      );
    }
  };

  const isWishlisted = (shoeId) => {
    return onToggleWishlist ? isInWishlist(shoeId) : wishlist.includes(shoeId);
  };

  const handleSizeSelect = (shoeId, size) => {
    setSelectedSize(prev => ({ ...prev, [shoeId]: size }));
  };

  const handleColorSelect = (shoeId, color) => {
    setSelectedColor(prev => ({ ...prev, [shoeId]: color }));
  };

  const handleQuickView = (shoe) => {
    if (onQuickView) {
      onQuickView(shoe);
    }
  };

  const handleShare = async (shoe) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${shoe.brand} ${shoe.name}`,
          text: shoe.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shoe.brand} ${shoe.name} - ${window.location.href}`);
      alert('Product link copied to clipboard!');
    }
  };

  // Filter and sort shoes
  const filteredShoes = useMemo(() => {
    return propShoes.filter(shoe => {
      const matchesPrice = shoe.price >= priceRange[0] && shoe.price <= priceRange[1];
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(shoe.category);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(shoe.brand);
      const matchesSearch = searchTerm === '' || 
        shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        shoe.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shoe.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesPrice && matchesCategory && matchesBrand && matchesSearch;
    });
  }, [propShoes, priceRange, selectedCategories, selectedBrands, searchTerm]);

  const sortedShoes = useMemo(() => {
    const shoesToSort = [...filteredShoes];
    switch (sortOption) {
      case 'price-low':
        return shoesToSort.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
      case 'price-high':
        return shoesToSort.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
      case 'rating':
        return shoesToSort.sort((a, b) => b.rating - a.rating);
      case 'new':
        return shoesToSort.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case 'bestseller':
        return shoesToSort.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
      case 'name':
        return shoesToSort.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return shoesToSort.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filteredShoes, sortOption]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : ''} ${i === Math.floor(rating) && rating % 1 >= 0.5 ? 'half-filled' : ''}`}>
        {i < Math.floor(rating) ? <FaStar /> : <FaRegStar />}
      </span>
    ));
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 200]);
    setSearchTerm('');
  };

  return (
    <div className="shoe-list-container">
      <div className="shoe-list-header">
        <div className="header-main">
          <h2>Our Collection</h2>
          <div className="header-controls">
            <div className="view-toggle">
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ▦
              </button>
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
            </div>
            <div className="results-count">
              Showing {sortedShoes.length} of {propShoes.length} products
            </div>
          </div>
        </div>

        <div className="filter-controls">
          <div className="mobile-filter-toggle">
            <button 
              className="filter-toggle-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <IoMdOptions />
              Filters
            </button>
          </div>

          <div className="desktop-filters">
            <div className="filter-group">
              <label htmlFor="sort">Sort by:</label>
              <select 
                id="sort" 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="bestseller">Bestsellers</option>
                <option value="new">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Price range: ${priceRange[0]} - ${priceRange[1]}</label>
              <div className="price-range-controls">
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  step="10"
                  value={priceRange[0]} 
                  onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                />
                <input 
                  type="range" 
                  min="0" 
                  max="200" 
                  step="10"
                  value={priceRange[1]} 
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
              </div>
            </div>

            <div className="search-group">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="shoe-list-content">
        {/* Sidebar Filters */}
        <div className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-filters" onClick={() => setShowFilters(false)}>
              ×
            </button>
          </div>

          <div className="filter-section">
            <h4>Categories</h4>
            {categories.map(category => (
              <label key={category} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleCategory(category)}
                />
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h4>Brands</h4>
            {brands.map(brand => (
              <label key={brand} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>

          <div className="filter-section">
            <h4>Features</h4>
            <label className="filter-checkbox">
              <input type="checkbox" />
              <span>Fast Delivery</span>
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" />
              <span>Eco Friendly</span>
            </label>
            <label className="filter-checkbox">
              <input type="checkbox" />
              <span>Bestseller</span>
            </label>
          </div>

          <button className="clear-filters-btn" onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>

        {/* Products Grid/List */}
        <div className={`shoes-container ${viewMode}`}>
          {sortedShoes.length === 0 ? (
            <div className="no-results">
              <GiRunningShoe className="no-results-icon" />
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button className="clear-filters-btn" onClick={clearFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            sortedShoes.map(shoe => (
              <div 
                key={shoe.id} 
                className={`shoe-card ${viewMode} ${!shoe.inStock ? 'out-of-stock' : ''}`}
                onMouseEnter={() => setHoveredShoe(shoe.id)}
                onMouseLeave={() => setHoveredShoe(null)}
              >
                {/* Product Badges */}
                <div className="shoe-badges">
                  {shoe.isNew && <span className="badge new">NEW</span>}
                  {shoe.discountedPrice && <span className="badge sale">SALE</span>}
                  {shoe.isBestseller && <span className="badge bestseller"><FaFire /> BESTSELLER</span>}
                  {!shoe.inStock && <span className="badge stock">OUT OF STOCK</span>}
                  {shoe.fastDelivery && <span className="badge delivery"><IoMdFlash /> FAST DELIVERY</span>}
                  {shoe.ecoFriendly && <span className="badge eco">🌱 ECO</span>}
                </div>

                {/* Image Container */}
                <div className="shoe-image-container">
                  <img 
                    src={hoveredShoe === shoe.id && shoe.hoverImage ? shoe.hoverImage : shoe.image} 
                    alt={`${shoe.brand} ${shoe.name}`} 
                    className="shoe-image"
                  />
                  
                  {/* Quick Actions */}
                  <div className="shoe-actions">
                    <button 
                      className="action-btn wishlist-btn"
                      onClick={() => toggleWishlist(shoe.id)}
                      aria-label={isWishlisted(shoe.id) ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {isWishlisted(shoe.id) ? <FaHeart className="filled" /> : <FaRegHeart />}
                    </button>
                    <button 
                      className="action-btn quickview-btn"
                      onClick={() => handleQuickView(shoe)}
                      aria-label="Quick view"
                    >
                      <FaEye />
                    </button>
                    <button 
                      className="action-btn share-btn"
                      onClick={() => handleShare(shoe)}
                      aria-label="Share product"
                    >
                      <FaShare />
                    </button>
                  </div>

                  {/* Stock Indicator */}
                  {shoe.inStock && shoe.stock < 10 && (
                    <div className="stock-indicator">
                      <span className="low-stock">Only {shoe.stock} left!</span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="shoe-details">
                  <div className="shoe-brand">{shoe.brand}</div>
                  <h3 className="shoe-name">{shoe.name}</h3>
                  <p className="shoe-description">{shoe.description}</p>
                  
                  {/* Rating */}
                  <div className="shoe-rating">
                    <div className="stars">
                      {renderStars(shoe.rating)}
                      <span className="rating-value">{shoe.rating}</span>
                      <span className="reviews">({shoe.reviews})</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="shoe-features">
                    {shoe.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>

                  {/* Color Options */}
                  <div className="color-options">
                    <span>Colors:</span>
                    <div className="color-selector">
                      {shoe.colors.map(color => (
                        <button
                          key={color}
                          className={`color-dot ${color} ${selectedColor[shoe.id] === color ? 'selected' : ''}`}
                          onClick={() => handleColorSelect(shoe.id, color)}
                          aria-label={color}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Size Options */}
                  <div className="size-options">
                    <span>Sizes:</span>
                    <div className="size-selector">
                      {shoe.sizes.map(size => (
                        <button
                          key={size}
                          className={`size-btn ${selectedSize[shoe.id] === size ? 'selected' : ''}`}
                          onClick={() => handleSizeSelect(shoe.id, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="shoe-footer">
                    <div className="shoe-price">
                      {shoe.discountedPrice ? (
                        <>
                          <span className="original-price">${shoe.price}</span>
                          <span className="discounted-price">${shoe.discountedPrice}</span>
                          <span className="discount-percent">
                            {Math.round((1 - shoe.discountedPrice / shoe.price) * 100)}% OFF
                          </span>
                        </>
                      ) : (
                        <span className="current-price">${shoe.price}</span>
                      )}
                    </div>

                    <button
                      className={`add-to-cart-btn ${!shoe.inStock ? 'disabled' : ''}`}
                      onClick={() => {
                        if (shoe.inStock) {
                          onAddToCart({
                            ...shoe,
                            selectedSize: selectedSize[shoe.id],
                            selectedColor: selectedColor[shoe.id],
                            quantity: 1
                          });
                        }
                      }}
                      disabled={!shoe.inStock}
                    >
                      {shoe.inStock ? (
                        <>
                          <FaShoppingCart />
                          Add to Cart
                        </>
                      ) : (
                        'Out of Stock'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Load More Button */}
      {sortedShoes.length > 0 && (
        <div className="load-more-section">
          <button className="load-more-btn">
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoeList;
