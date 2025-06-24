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
