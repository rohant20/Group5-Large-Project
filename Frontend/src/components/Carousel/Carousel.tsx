import React from "react";
import Carousel from 'react-bootstrap/Carousel';


const CarouselItem: React.FC = () => {


    return(
        <Carousel>
            <Carousel.Item>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>This is a test</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>This is a test</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );

}

export default CarouselItem