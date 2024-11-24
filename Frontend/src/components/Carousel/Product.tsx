import React from 'react';
import style from './Carousel.module.css';

interface ProductProps {
  url: string;
  name: string;
  price: number;
  description: string;
}

const Product: React.FC<ProductProps> = ({ url, name, price, description }) => {
  return (
    <div className={style.card}>
      <img className={style.image} src={url} alt="product image" />
      <h2 className={style.name}>{name}</h2>
      <p className={style.price}>{`$${price}`}</p>
      <p>{description}</p>
      <p>
        <button>Edit Listing</button>
      </p>
    </div>
  );
};

export default Product;
