import React from 'react'
import Slider from 'react-slick';
import { Card, CardContent, Container, Typography, Divider } from '@mui/material'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }
        }
    ]
};

const RecommendationCarousel = () => {
    return (
        <Container sx={{ p: 2 }}>
            <Slider {...settings}>
               <p>how to become a pro in databases</p>
               <p>how to become a certified react developer</p>
               <p>how to begin learning network security</p>
               <p>efficient ways for product marketing</p>
               <p>React</p>
            </Slider>
        </Container>
    )
}

export default RecommendationCarousel