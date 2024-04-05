import React from "react";
import { Grid, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const Failed = () => {

  


    const handleHomepage = () => {

        window.location.href='/';
    }  

  return (
    <>
      <Grid sx={{width:'70%' ,margin:'100px auto'}}>
        <Grid item  sx={{margin:'50px 0'}}>
            <Grid container sx={{background:'#f8f9fb' , borderRadius:'5px' , padding:'25px' , border:'1px slid grey'}}>
                <CloseIcon sx={{background:'red' , padding:'5px' , margin:'0px 10px' , borderRadius:'50%' , color:'white'}} /><Typography>Sorry. Your order has not been placed.</Typography>
            </Grid>
        </Grid>
        <Grid>
            <button className="combtn" onClick={handleHomepage}>Return to homepage</button>
        </Grid>
      </Grid>
    </>
  );
};

export default Failed;
