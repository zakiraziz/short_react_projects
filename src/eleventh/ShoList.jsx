import React, { useState } from 'react';
import { FaStar, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoMdOptions } from 'react-icons/io';
import './ShoeList.css';

const shoes = [
  {
    id: 1,
    name: 'Air Max 270',
    brand: 'Nike',
    price: 150,
    discountedPrice: 135,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    description: 'The Air Max 270 delivers the tallest Air unit yet for unbelievable comfort.',
    rating: 4.5,
    reviews: 128,
    colors: ['black', 'white', 'red'],
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Ultraboost 22',
    brand: 'Adidas',
    price: 180,
    image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/1ce5d4c0b0f24d8c8f1aad5300d0d8c5_9366/Ultraboost_22_Shoes_Black_GX6257_01_standard.jpg',
    description: 'Designed for runners, loved by everyone for all-day comfort.',
    rating: 4.8,
    reviews: 245,
    colors: ['black', 'blue', 'white'],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    inStock: true,
    isNew: false,
    isFeatured: true
  },
  {
    id: 3,
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 80,
    image: 'https://reebok.ugc.bazaarvoice.com/static/reebok_classic_leather/product/1/CN2402_1.jpg',
    description: 'The iconic shoe that started it all. Timeless style meets modern comfort.',
    rating: 4.2,
    reviews: 89,
    colors: ['white', 'navy'],
    sizes: [7, 8, 9, 10, 11],
    inStock: false,
    isNew: false,
    isFeatured: false
  },
  {
    id: 4,
    name: 'Chuck Taylor All Star',
    brand: 'Converse',
    price: 65,
    discountedPrice: 55,
    image: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dwfa8e5d1a/images/a_107/M9160_A_107X1.jpg',
    description: 'The original basketball shoe that became a cultural icon.',
    rating: 4.7,
    reviews: 312,
    colors: ['black', 'white', 'red'],
    sizes: [6, 7, 8, 9, 10, 11],
    inStock: true,
    isNew: true,
    isFeatured: true
  },
  {
    id: 5,
    name: 'Gel-Kayano 28',
    brand: 'ASICS',
    price: 160,
    image: 'https://www.asics.com/dw/image/v2/BBXH_PRD/on/demandware.static/-/Sites-asics-master/default/dw3a8c5b3a/images/1011B334-021/1011B334-021_1.jpg',
    description: 'Premium stability and cushioning for long-distance runners.',
    rating: 4.6,
    reviews: 176,
    colors: ['black', 'blue', 'silver'],
    sizes: [7, 8, 9, 10, 11, 12, 13],
    inStock: true,
    isNew: false,
    isFeatured: false
  },
  {
    id: 6,
    name: '990v5',
    brand: 'New Balance',
    price: 175,
    discountedPrice: 155,
    image: 'https://nb.scene7.com/is/image/NB/m990gl5_nb_05_i',
    description: 'Handcrafted in the USA with premium materials for ultimate comfort.',
    rating: 4.9,
    reviews: 203,
    colors: ['gray', 'navy'],
    sizes: [7, 8, 9, 10, 11, 12],
    inStock: true,
    isNew: true,
    isFeatured: true
  }
];

const ShoeList = ({ onAddToCart }) => {
  const [wishlist, setWishlist] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});
  const [sortOption, setSortOption] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 200]);

  const toggleWishlist = (shoeId) => {
    if (wishlist.includes(shoeId)) {
      setWishlist(wishlist.filter(id => id !== shoeId));
    } else {
      setWishlist([...wishlist, shoeId]);
    }
  };

  const handleSizeSelect = (shoeId, size) => {
    setSelectedSize({ ...selectedSize, [shoeId]: size });
  };

  const handleColorSelect = (shoeId, color) => {
    setSelectedColor({ ...selectedColor, [shoeId]: color });
  };

  const sortedShoes = [...shoes].sort((a, b) => {
    if (sortOption === 'price-low') return a.price - b.price;
    if (sortOption === 'price-high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  const filteredShoes = sortedShoes.filter(shoe => 
    shoe.price >= priceRange[0] && shoe.price <= priceRange[1]
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= Math.floor(rating) ? 
        <FaStar key={i} className="star filled" /> : 
        i === Math.ceil(rating) && rating % 1 >= 0.5 ?
        <FaStar key={i} className="star half-filled" /> :
        <FaRegStar key={i} className="star" />
      );
    }
    return stars;
  };

  return (
    <div className="shoe-list-container">
      <div className="shoe-list-header">
        <h2>Our Collection</h2>
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="sort">Sort by:</label>
            <select 
              id="sort" 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="new">New Arrivals</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Price range:</label>
            <div className="price-range">
              <span>${priceRange[0]}</span>
              <input 
                type="range" 
                min="0" 
                max="200" 
                step="10"
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="shoes-grid">
        {filteredShoes.map(shoe => (
          <div key={shoe.id} className={`shoe-card ${!shoe.inStock ? 'out-of-stock' : ''}`}>
            {shoe.isNew && <span className="badge new">NEW</span>}
            {shoe.discountedPrice && <span className="badge sale">SALE</span>}
            {!shoe.inStock && <span className="badge stock">OUT OF STOCK</span>}

            <div className="shoe-image-container">
              <img src={shoe.image} alt={`${shoe.brand} ${shoe.name}`} />
              <button 
                className="wishlist-btn"
                onClick={() => toggleWishlist(shoe.id)}
                aria-label={wishlist.includes(shoe.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                {wishlist.includes(shoe.id) ? <FaHeart className="wishlist-icon filled" /> : <FaRegHeart className="wishlist-icon" />}
              </button>
            </div>

            <div className="shoe-details">
              <div className="shoe-brand">{shoe.brand}</div>
              <h3 className="shoe-name">{shoe.name}</h3>
              <p className="shoe-description">{shoe.description}</p>
              
              <div className="shoe-rating">
                <div className="stars">
                  {renderStars(shoe.rating)}
                  <span>({shoe.reviews})</span>
                </div>
              </div>

              <div className="color-options">
                <span>Colors:</span>
                <div className="color-selector">
                  {shoe.colors.map(color => (
                    <button
                      key={color}
                      className={`color-dot ${color} ${selectedColor[shoe.id] === color ? 'selected' : ''}`}
                      onClick={() => handleColorSelect(shoe.id, color)}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>

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

              <div className="shoe-price">
                {shoe.discountedPrice ? (
                  <>
                    <span className="original-price">${shoe.price}</span>
                    <span className="discounted-price">${shoe.discountedPrice}</span>
                  </>
                ) : (
                  <span>${shoe.price}</span>
                )}
              </div>

              <button
                className="add-to-cart-btn"
                onClick={() => {
                  if (shoe.inStock) {
                    onAddToCart({
                      ...shoe,
                      selectedSize: selectedSize[shoe.id],
                      selectedColor: selectedColor[shoe.id]
                    });
                  }
                }}
                disabled={!shoe.inStock}
              >
                <FaShoppingCart />
                {shoe.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeList;