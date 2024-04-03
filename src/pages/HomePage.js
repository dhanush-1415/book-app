import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import HomeSlider from '../components/homepage/slider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Grid } from '@mui/material';
import BookList from '../components/homepage/booklist';

function Home() {




  return (
    <>
    <ToastContainer />

      <Grid>
        <Grid>
          <HomeSlider />
        </Grid>
        <Grid>
          <BookList />
        </Grid>
      </Grid>

    </>
  );
}

export default Home;
