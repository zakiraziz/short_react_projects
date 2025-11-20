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

