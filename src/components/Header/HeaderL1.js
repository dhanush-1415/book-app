import { Typography , Grid ,Divider} from "@mui/material";
import React from "react";
import YouTubeIcon from '@mui/icons-material/YouTube';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';

const HeaderL1 = () => {


    return(
        <>
            <Grid container justifyContent='space-between' sx={{background:'#282828',color:'white' , padding:'15px'}}>
                <Grid item md={2.4}>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Typography sx={{fontWeight:'bold'}}>Find a Store</Typography>
                        </Grid>
                        <Grid item sx={{display:'flex'}}>
                            <WifiCalling3Icon sx={{color:'#f65d4e'}} />
                            <Typography sx={{fontWeight:'bold'}}> Call +1 876-578-5567</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={1}>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <FacebookIcon />           
                        </Grid>
                        <Grid item>
                            <InstagramIcon />           
                        </Grid>
                        <Grid item>
                            <PinterestIcon />           
                        </Grid>
                        <Grid item>
                            <YouTubeIcon />           
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );

};

export default HeaderL1;