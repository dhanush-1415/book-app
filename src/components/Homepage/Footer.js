import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';
import './Footer.css';



function Footer() {


  const handlePage = (path) => {
    window.location.href = `${path}`
  }


  return (
    <>
    <Grid sx={{ background:'#085293' , color:'white'}}>
      <Grid container direction='row' justifyContent='space-between' sx={{width:'80%' , margin:'0px auto' , padding:'30px 0px 20px' }}>
        <Grid item md={3.5} sx={{marginTop:'25px'}}>
        <Typography sx={{fontWeight:'bold'}}>Customer Support</Typography>
          <Grid container >
            <Grid item md={3}>
              <ul className='footerlist'>
                <li><Typography>Address :</Typography></li>
                <li><Typography>Phone :</Typography></li>
                {/* <li><Typography>Fax :</Typography></li> */}
                <li><Typography>Email :</Typography></li>
              </ul>
            </Grid>
            <Grid item md={8}>
              <ul className='footerlist'>
                <li><Typography>Marina Bay, Abu Dhabi, UAE</Typography></li>
                <li><Typography>+971551460880 </Typography></li>
                {/* <li><Typography>23456789 </Typography></li> */}
                <li><Typography>support@etuapps.com </Typography></li>
              </ul>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item md={2.8} sx={{marginTop:'25px'}}>
          <Typography sx={{fontWeight:'bold'}}>Information</Typography>
          <ul className='footerlist'>
            <li>Help & FAQ</li>
            <li>My account</li>
            <li style={{cursor:'pointer'}} onClick={(e)=>{handlePage('/privacy-policy')}}>Privacy & Policy</li>
          </ul>
        </Grid> */}
        {/* <Grid item md={2.5} sx={{marginTop:'25px'}}>
          <Typography sx={{fontWeight:'bold'}}>Our Company</Typography>
          <ul className='footerlist'>
            <li>Order Tracking</li>
            <li>Order History</li>
            <li>Shipping & Delivery</li>
          </ul>
        </Grid> */}
        <Grid item md={2} sx={{marginTop:'25px'}}>
        <Typography sx={{fontWeight:'bold'}}>Our Company</Typography>
          <ul className='footerlist'>
            <li style={{cursor:'pointer'}} onClick={(e)=>{handlePage('/about-us')}}>About Us</li>
            <li style={{cursor:'pointer'}} onClick={(e)=>{handlePage('/contact-us')}}>Contact US</li>
            {/* <li>Terms & Conditions</li> */}
            <li style={{cursor:'pointer'}} onClick={(e)=>{handlePage('/privacy-policy')}}>Privacy & Policy</li>
          </ul>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{borderBottomWidth: '5px'}} />
      <Grid container justifyContent='center' sx={{width:'90%' , margin:'15px auto' , padding:'30px 0px'}}>
        <Grid >
          <Typography>© Copyright 2024 Top20  All rights reserved</Typography>
        </Grid>
        {/* <Grid item md={2.8}>
          <Grid container justifyContent='space-between'>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/mastercard.svg" alt="d1" />
            </Grid>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/visa.svg" alt="d2" />
            </Grid>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/paypal.svg" alt="d3" />
            </Grid>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/jcb.svg" alt="d4" />
            </Grid>
            <Grid item>
              <img src="https://borobazar.vercel.app/assets/images/payment/skrill.svg" alt="d5" />
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
      </Grid>
    </>
  );
}

export default Footer;