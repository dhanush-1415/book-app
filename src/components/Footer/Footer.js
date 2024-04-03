import React from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import './Footer.css';

function Footer() {
  return (
    <>
    <Grid sx={{background:'#282828'}}>
      <Grid container direction='row' justifyContent='space-between' sx={{width:'80%' , margin:'0px auto' , padding:'70px 0px 50px'}}>
        <Grid item md={3} sx={{marginTop:'25px'}}>
          <img src='https://www.basheergraphic.com/cdn/shop/t/1/assets/logo.png?v=162072033459672328741473575341' width='150px' alt='def3'/>
          <Typography className='typo4' sx={{margin:'30px 0' , color:'#f65d4e'}}>Bras Basah Complex #04-19, 231 Bain St, Singapore 180231.</Typography>
          <Grid container direction='row' spacing={4}>
            <Grid item>
                <InstagramIcon sx={{color:'white'}} />
            </Grid>
            <Grid item>
                <FacebookIcon sx={{color:'white'}} />
            </Grid>
            <Grid item>
              <TwitterIcon sx={{color:'white'}} />
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{border:'0.5px solid white'}} />
        <Grid item md={2.8} sx={{marginTop:'25px'}}>
          <Typography sx={{fontWeight:'bold', color:'white'}}>Explore</Typography>
          <ul className='footerlist'>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>About us</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Sitemap</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Bookmarks</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>SignIn/Join</li>
          </ul>
        </Grid>
        <Grid item md={2.5} sx={{marginTop:'25px'}}>
          <Typography sx={{fontWeight:'bold', color:'white'}}>Our Service</Typography>
          <ul className='footerlist'>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Help Center</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Returns</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Product Recalls</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Accessibility</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Contact Us</li>

          </ul>
        </Grid>
        <Grid item md={2} sx={{marginTop:'25px'}}>
          <Typography sx={{fontWeight:'bold', color:'white'}}>Our Information</Typography>
          <ul className='footerlist'>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>News</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Privacy Policy</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Disclaimer</li>
            <li className='typo3' style={{color:'#999999' , padding:'7px 0'}}>Terms & Conditionss</li>
          </ul>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{margin:'30px 0' , border:'0.5px solid white'}} />
      <Grid container justifyContent='space-between' sx={{width:'90%' , margin:'0px auto' , padding:'40px 0px'}}>
        <Grid item md={6}>
          <Typography className='typo5' sx={{color:'white'}}>© Copyright 2024 Appxperts  All rights reserved</Typography>
        </Grid>
        <Grid item md={2.8}>
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
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}

export default Footer;

