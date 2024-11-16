import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import Product from "./Product";
import { productData, responsive } from "./Data";

const CarouselItem: React.FC = () => {
  const product = productData.map((item) => (
    <Product
      name={item.name}
      url={item.imageurl}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <div>
      <Carousel showDots={true} responsive={responsive}>
        {product}
      </Carousel>;
    </div>
  )
}

export default CarouselItem;
