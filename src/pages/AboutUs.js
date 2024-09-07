import React from 'react';
import { Grid, Container, Typography } from '@mui/material';
import Header from '../components/Navbar/Header';
import MyCarousel from '../components/Homepage/carousel';

const AboutUs = () => {
  return (
    <>
    <Header />
    <MyCarousel />
    <Grid sx={{width:'80%', margin:'30px auto'}}>
      <Grid container>
        <Typography className='typo7' sx={{margin:'25px 0'}}>About Us</Typography>
      </Grid>
      <Grid container direction="column">
        <Typography className='typo5' sx={{marginTop:'25px'}} >Who We Are</Typography>
        <Typography className='typo6'>Welcome to top20, your go-to source for discovering the top 20 things in any category across various platforms. Whether you're looking for the best gadgets, trending fashion items, must-read books, or top-rated restaurants, we've got you covered.</Typography>
        <Typography className='typo5' sx={{marginTop:'25px'}} >Our Mission</Typography>
        <Typography className='typo6'>Our mission is simple: to help you find the best of the best. We believe that with the vast amount of information available today, it can be overwhelming to make choices. That's why we do the hard work for you by researching, curating, and presenting the top 20 items in each category. We strive to provide accurate, up-to-date, and comprehensive lists that save you time and effort.</Typography>
        <Typography className='typo5' sx={{marginTop:'25px'}} >How We Do It</Typography>
        <Typography className='typo6'>Research: Our team of experts scours the internet, reviews, and user feedback to identify the most popular and highly-rated items in each category.</Typography>
        <Typography className='typo6'>Curate: We carefully select the top 20 items based on quality, value, and user satisfaction.</Typography>
        <Typography className='typo6'>Review: Each item on our list is thoroughly reviewed and analyzed to ensure it meets our high standards.</Typography>
        <Typography className='typo6'>Present: We provide detailed descriptions, pros and cons, and links to purchase or learn more about each item.</Typography>
        <Typography className='typo5' sx={{marginTop:'25px'}} >Our Values</Typography>
        <Typography className='typo6'>Transparency: We believe in being open and honest about our selection process and criteria.</Typography>
        <Typography className='typo6'>Quality: Only the best make it to our top 20 lists. We prioritize quality over quantity.</Typography>
        <Typography className='typo6'>Trust: Your trust is important to us. We ensure our lists are reliable and trustworthy.</Typography>
        <Typography className='typo6'>Innovation: We continuously improve our methods to bring you the most relevant and up-to-date information.</Typography>
        <Typography className='typo5' sx={{marginTop:'25px'}} >Why Choose Us?</Typography>
        <Typography className='typo6'>Expertise: Our team consists of specialists in various fields who bring their knowledge and experience to our lists.</Typography>
        <Typography className='typo6'>Convenience: We make it easy for you to find the best items without spending hours researching.</Typography>
        <Typography className='typo6'>Comprehensive: Our lists are detailed and cover everything you need to know about each item.</Typography>
        <Typography className='typo6'>Up-to-Date: We regularly update our lists to ensure you have the latest information.</Typography>
        <Typography className='typo5' sx={{marginTop:'25px'}} >Join Our Community</Typography>
        <Typography className='typo6'>Join thousands of satisfied users who rely on top20 to make informed decisions. Subscribe to our newsletter for the latest top 20 lists, exclusive offers, and more.</Typography>
      </Grid>
    </Grid>
    </>
  );
};

export default AboutUs;
