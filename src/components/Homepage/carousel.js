// src/components/Carousel.js
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import { getBannerData } from '../../apiCalls';
import 'react-multi-carousel/lib/styles.css';
import './slider.css'; 

const MyCarousel = () => {
  const [data, setData] = useState([]);
  const [load , setLoad] = useState(true);

  useEffect(() => {
    if(load){
    getBannerData()
      .then((response) => {
        if (response.Message === "Sucess") {
          if(response.Data && response.Data.length){
            const activeBanners = response.Data.filter(banner => banner.IsActive);
            setData(activeBanners);
            setLoad(false)
          }else{
            setLoad(true)
          }
        } else {
          console.error('Error getting banner images');
          setLoad(true)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    }
  }, [load]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const carouselSettings = {
    responsive,
    autoPlay: true,
    autoPlaySpeed: 4000,
    infinite: true,
  };

  return (
    <Carousel {...carouselSettings}>
      {data.length > 0 && data.map((item, index) => (
        <div key={index} className="carousel-item">
          <img 
            className="responsive-image" 
            src={item.BannerImageFilePath} 
            alt={`Banner ${index}`} 
          />
        </div>
      ))}
    </Carousel>
  );
};

export default MyCarousel;
