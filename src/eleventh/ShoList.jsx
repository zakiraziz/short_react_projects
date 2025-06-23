import React from 'react';

const shoes = [
  {
    id: 1,
    name: 'Air Max 270',
    brand: 'Nike',
    price: 150,
    image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
    description: 'The Air Max 270 delivers the tallest Air unit yet for unbelievable comfort.'
  },
  {
    id: 2,
    name: 'Ultraboost 22',
    brand: 'Adidas',
    price: 180,
    image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/1ce5d4c0b0f24d8c8f1aad5300d0d8c5_9366/Ultraboost_22_Shoes_Black_GX6257_01_standard.jpg',
    description: 'Designed for runners, loved by everyone for all-day comfort.'
  },
  {
    id: 3,
    name: 'Classic Leather',
    brand: 'Reebok',
    price: 80,
    image: 'https://reebok.ugc.bazaarvoice.com/static/reebok_classic_leather/product/1/CN2402_1.jpg',
    description: 'The iconic shoe that started it all. Timeless style meets modern comfort.'
  }
];

const ShoeList = ({ onAddToCart }) => {
  return (
    <div className="shoe-list">
      <h2>Our Featured Shoes</h2>
      <div className="shoes-container">
        {shoes.map(shoe => (
          <div key={shoe.id} className="shoe-card">
            <img src={shoe.image} alt={shoe.name} />
            <div className="shoe-info">
              <h3>{shoe.brand} {shoe.name}</h3>
              <p>{shoe.description}</p>
              <div className="shoe-footer">
                <span className="price">${shoe.price}</span>
                <button onClick={() => onAddToCart(shoe)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoeList;
