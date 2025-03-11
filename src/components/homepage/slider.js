// src/components/Carousel.js
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getBannerData } from '../../apiCalls';
import { toast } from 'react-toastify';

const HomeSlider = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBannerData();
        if (data.Message === 'Sucess') {
          setBannerData(data.Data); 
        } else {
          toast.error("Something went wrong in getting banner data");
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };
  
    fetchData();
  }, []);
  

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
    responsive: responsive,
    autoPlay: true,
    autoPlaySpeed: 2000,
    infinite: true,
  };

  return (
    <Carousel {...carouselSettings}>
      {bannerData && bannerData.length ? (
        bannerData.map((image, index) => (
          <div key={index} className="carousel-item">
            <img className='responsive-image' src={image.BannerImageFilePath} alt={`carousel-${index + 1}`} width="100%" style={{maxHeight:'700px'}} />
          </div>
        ))
      ) : (
        <img src="https://ap-bookory.myshopify.com/cdn/shop/files/20.jpg?v=168835624" alt="d1" width="270px"/>
      )}
    </Carousel>
  );
};

export default HomeSlider;
