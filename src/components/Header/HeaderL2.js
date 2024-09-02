import { Typography, Grid, Divider } from "@mui/material";
import React from "react";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useLocation } from "react-router-dom";

const HeaderL2 = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    }


    
    const handlePath = (path) => {
        window.location.href = path;
    }

    return (
        <>
            <Grid container justifyContent='space-evenly'>
                <Grid onClick={(e) => {handlePath('/')}} item sx={{ cursor:'pointer', textAlign: 'center', color: isActive('/') ? '#f65d4e' : 'black' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Home</Typography>
                    {isActive('/') && <FiberManualRecordIcon fontSize="small" />}
                </Grid>
                <Grid onClick={(e) => {handlePath('/products/best_selling')}} item sx={{ cursor:'pointer', textAlign: 'center', color: isActive('/products/best_selling') ? '#f65d4e' : 'black' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>BestSelling</Typography>
                    {isActive('/products/best_selling') && <FiberManualRecordIcon fontSize="small" />}
                </Grid>
                <Grid onClick={(e) => {handlePath('/products/latest_books')}} item sx={{ cursor:'pointer', textAlign: 'center', color: isActive('/products/latest_books') ? '#f65d4e' : 'black' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Latest</Typography>
                    {isActive('/products/latest_books') && <FiberManualRecordIcon fontSize="small" />}
                </Grid>
                <Grid onClick={(e) => {handlePath('/products/coming_soon')}} item sx={{ cursor:'pointer', textAlign: 'center', color: isActive('/products/coming_soon') ? '#f65d4e' : 'black' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>ComingSoon</Typography>
                    {isActive('/products/coming_soon') && <FiberManualRecordIcon fontSize="small" />}
                </Grid>
                <Grid item sx={{ cursor:'pointer', textAlign: 'center', color: isActive('/products/genres') ? '#f65d4e' : 'black' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>Genres</Typography>
                    {isActive('/products/genres') && <FiberManualRecordIcon fontSize="small" />}
                </Grid>
            </Grid>
        </>
    );
}

export default HeaderL2;
