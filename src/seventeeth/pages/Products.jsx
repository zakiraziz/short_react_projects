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


export default Products;
