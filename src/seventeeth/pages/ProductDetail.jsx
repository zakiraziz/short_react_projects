// src/pages/ProductDetail.js - Single product detail page with gallery and options
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Sample product data - in real app, this would come from API
const productsData = [
  {
    id: 1,
    name: "Air Max Pulse",
    brand: "Nike",
    price: 129.99,
    originalPrice: 149.99,
    category: "lifestyle",
    emoji: "👟",
    description: "Modern comfort meets street-ready style. The Air Max Pulse delivers a sleek, streamlined design that's perfect for everyday wear while providing the iconic Air cushioning you love.",
    fullDescription: "The Nike Air Max Pulse brings the heritage of Air Max into a new era. With its minimalist design and maximum comfort, this shoe features a lightweight mesh upper, responsive Air cushioning, and a durable rubber outsole. Perfect for urban exploration and casual wear.",
    features: [
      "Air cushioning for all-day comfort",
      "Breathable mesh upper",
      "Durable rubber outsole",
      "Padded collar for ankle support",
      "Iconic Air Max design"
    ],
    specifications: {
      "Material": "Mesh, Synthetic Leather, Rubber",
      "Closure": "Lace-up",
      "Weight": "320g (per shoe)",
      "Suitable For": "Casual wear, Walking",
      "Technology": "Air Max cushioning"
    },
    rating: 4.5,
    reviewCount: 128,
    colors: [
      { name: "Black", value: "#000000", image: "👟" },
      { name: "White", value: "#FFFFFF", image: "👟" },
      { name: "Gray", value: "#808080", image: "👟" }
    ],
    sizes: [7, 8, 9, 10, 11, 12],
    images: ["👟", "👟", "👟", "👟"],
    onSale: true,
    isNew: false,
    inStock: true,
    sku: "NIKE-AM-PULSE-001"
  }
];

const relatedProducts = [
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
    isNew: true
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
    isNew: false
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
    isNew: false
  }
];

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]?.name || '');
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }



export default ProductDetail;
