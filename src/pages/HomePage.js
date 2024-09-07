import React, { useState } from 'react';
import MyCarousel from '../components/Homepage/carousel';
import ProductList from '../components/Homepage/products.js';
import Header from '../components/Navbar/Header.js';

const Home = () => {
  const [category, setCategory] = useState("ALLCAT001");
  const [service, setSelectedService] = useState("ALLSER001");

  return (
    <>
      <Header category={category} setCategory={setCategory} service={service} setSelectedService={setSelectedService} />
      <MyCarousel />
      <ProductList category={category} setCategory={setCategory} service={service} setSelectedServices={setSelectedService} />
    </>
  );
}

export default Home;
