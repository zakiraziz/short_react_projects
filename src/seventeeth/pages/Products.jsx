// src/pages/Products.js - Products listing page with filtering and sorting
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Sample products data
const productsData = [
  {
    id: 1,
    name: "Air Max Pulse",
    brand: "Nike",
    price: 129.99,
    originalPrice: 149.99,
    category: "lifestyle",
    emoji: "👟",
    description: "Modern comfort meets street-ready style",
    rating: 4.5,
    reviewCount: 128,
    colors: ["Black", "White", "Gray"],
    sizes: [7, 8, 9, 10, 11, 12],
    onSale: true,
    isNew: false,
    featured: true
  },
  {
    id: 2,
    name: "Ultraboost Light",
    brand: "Adidas",
    price: 149.99,
    category: "running",
    emoji: "🏃",
    description: "Our lightest Ultraboost ever for maximum energy return",
    rating: 4.8,
    reviewCount: 89,
    colors: ["Blue", "Black", "White"],
    sizes: [6, 7, 8, 9, 10, 11],
    onSale: false,
    isNew: true,
    featured: true
  },
  {
    id: 3,
    name: "Classic Leather",
    brand: "Reebok",
    price: 89.99,
    category: "lifestyle",
    emoji: "👞",
    description: "Timeless style with modern comfort",
    rating: 4.3,
    reviewCount: 204,
    colors: ["White", "Navy", "Red"],
    sizes: [7, 8, 9, 10, 11],
    onSale: false,
    isNew: false,
    featured: false
  },
  {
    id: 4,
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 59.99,
    originalPrice: 69.99,
    category: "lifestyle",
    emoji: "👟",
    description: "The iconic sneaker that started it all",
    rating: 4.7,
    reviewCount: 312,
    colors: ["Black", "White", "Red", "Blue"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    onSale: true,
    isNew: false,
    featured: true
  },
  {
    id: 5,
    name: "Gel-Kayano 30",
    brand: "ASICS",
    price: 159.99,
    category: "running",
    emoji: "👟",
    description: "Premium stability for long-distance runners",
    rating: 4.6,
    reviewCount: 67,
    colors: ["Blue", "Black", "Silver"],
    sizes: [7, 8, 9, 10, 11, 12],
    onSale: false,
    isNew: true,
    featured: false
  },
  {
    id: 6,
    name: "Air Force 1",
    brand: "Nike",
    price: 99.99,
    category: "lifestyle",
    emoji: "👟",
    description: "The classic that never goes out of style",
    rating: 4.9,
    reviewCount: 512,
    colors: ["White", "Black", "Red"],
    sizes: [6, 7, 8, 9, 10, 11, 12, 13],
    onSale: false,
    isNew: false,
    featured: true
  },
  {
    id: 7,
    name: "Cloudflow",
    brand: "On",
    price: 139.99,
    originalPrice: 159.99,
    category: "running",
    emoji: "🏃",
    description: "Lightweight speed for competitive runners",
    rating: 4.4,
    reviewCount: 93,
    colors: ["White", "Black", "Blue"],
    sizes: [7, 8, 9, 10, 11],
    onSale: true,
    isNew: false,
    featured: false
  },
  {
    id: 8,
    name: "Old Skool",
    brand: "Vans",
    price: 69.99,
    category: "skateboarding",
    emoji: "🛹",
    description: "Iconic skate shoe with timeless appeal",
    rating: 4.5,
    reviewCount: 287,
    colors: ["Black", "White", "Checkerboard"],
    sizes: [6, 7, 8, 9, 10, 11, 12],
    onSale: false,
    isNew: false,
    featured: true
  }
];

const categories = [
  { id: 'all', name: 'All Products', count: productsData.length },
  { id: 'lifestyle', name: 'Lifestyle', count: productsData.filter(p => p.category === 'lifestyle').length },
  { id: 'running', name: 'Running', count: productsData.filter(p => p.category === 'running').length },
  { id: 'skateboarding', name: 'Skateboarding', count: productsData.filter(p => p.category === 'skateboarding').length }
];

const brands = [...new Set(productsData.map(p => p.brand))];
const priceRanges = [
  { id: 'all', label: 'All Prices', min: 0, max: Infinity },
  { id: 'under50', label: 'Under $50', min: 0, max: 50 },
  { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
  { id: '100-150', label: '$100 - $150', min: 100, max: 150 },
  { id: 'over150', label: 'Over $150', min: 150, max: Infinity }
];

const Products = ({ addToCart }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    brand: searchParams.get('brand') || 'all',
    priceRange: searchParams.get('priceRange') || 'all',
    sortBy: searchParams.get('sort') || 'featured',
    searchQuery: searchParams.get('search') || '',
    inStock: searchParams.get('inStock') !== 'false'
  });

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.category !== 'all') params.set('category', filters.category);
    if (filters.brand !== 'all') params.set('brand', filters.brand);
    if (filters.priceRange !== 'all') params.set('priceRange', filters.priceRange);
    if (filters.sortBy !== 'featured') params.set('sort', filters.sortBy);
    if (filters.searchQuery) params.set('search', filters.searchQuery);
    if (!filters.inStock) params.set('inStock', 'false');
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  // Filter and sort products
  useEffect(() => {
    let results = [...productsData];

    // Apply filters
    if (filters.category !== 'all') {
      results = results.filter(product => product.category === filters.category);
    }

    if (filters.brand !== 'all') {
      results = results.filter(product => product.brand === filters.brand);
    }

    if (filters.priceRange !== 'all') {
      const range = priceRanges.find(r => r.id === filters.priceRange);
      results = results.filter(product => product.price >= range.min && product.price <= range.max);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      results = results.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    if (filters.inStock) {
      results = results.filter(product => product.sizes && product.sizes.length > 0);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default: // featured
        results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    setFilteredProducts(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      brand: 'all',
      priceRange: 'all',
      sortBy: 'featured',
      searchQuery: '',
      inStock: true
    });
  };

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <h1>All Products</h1>
          <p>Discover our complete collection of premium footwear</p>
          <div className="results-count">
            Showing {filteredProducts.length} of {productsData.length} products
          </div>
        </div>

        {/* Products Layout */}
        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button onClick={clearFilters} className="clear-filters">
                Clear All
              </button>
            </div>

            {/* Search Filter */}
            <div className="filter-group">
              <label htmlFor="search">Search Products</label>
              <input
                id="search"
                type="text"
                placeholder="Search by name, brand..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                className="search-filter"
              />
            </div>



export default Products;


