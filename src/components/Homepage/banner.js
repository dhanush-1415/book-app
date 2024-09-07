import React from "react";
import { Grid } from "@mui/material";

const Banner2 = () => {
    return(
        <>
            <Grid container justifyContent="space-between" sx={{width:'90%' , margin:'30px auto'}}>
                <Grid item md={5.7}>
                    <img src="https://demo.posthemes.com/pos_digitech/img/cms/cms_1.1.jpg" alt="d1" width="100%" />
                </Grid>
                <Grid item md={5.7}>
                    <img src="https://demo.posthemes.com/pos_digitech/img/cms/cms_1.2.jpg" alt="d2" width="100%"  />
                </Grid>
            </Grid>
        </>
    )
}

export default Banner2;