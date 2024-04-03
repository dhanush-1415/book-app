import React, { useState, useEffect } from 'react';
import { Grid, Typography, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getByTagData } from '../apiCalls';
import TagOneBooks from '../components/homepage/tag1';

const BookList = () => {


    const { tagCode } = useParams();

    const [tagData , setTagData] = useState();

    const [tadTitle , setTagTitle] = useState();

    useEffect(() => {
        const fetchData = async () => {
          try {

            let code ;

            if(tagCode === 'best_selling'){
                code = "BS";
                setTagTitle("Bestselling Books");
            }else if(tagCode === 'latest_books'){
                code = "LB";
                setTagTitle("Latest Books");
            }else if(tagCode === 'coming_soon'){
                code = "CS";
                setTagTitle("ComingSoon Books");
            }
           
            const data = await getByTagData(code);
            if (data.Message === 'Sucess') {
                setTagData(data.Data);
            } else {
              alert("Something went wrong");
            }
          } catch (error) {
            console.error('Error fetching banner data:', error);
          }
        };
      
        fetchData();
      }, []);

    
    const handleProduct = (code) => {
        window.location.href = `/product/${code}`
    }



    return(
        <>
            <Grid sx={{width:'95%' , margin:'100px auto'}}>
                <Grid container justifyContent="space-between" alignItems="center" mt={6} mb={6}>
                    <Grid item md={3}>
                        <Typography className="typo1">{tadTitle}</Typography>
                    </Grid>
                    <Grid item md={7.5}>
                        <Divider sx={{border:'1px solid grey'}} />
                    </Grid>
                    {/* <Grid item md={1}>
                        <button className="cmn-btn" onClick={(e)=>handleTagPage("lts")}>View more</button>
                    </Grid> */}
                </Grid>
                <Grid container spacing={6}>
                    {tagData && tagData.length && tagData.map((item, index) => (
                        <>
                            <TagOneBooks item={item} key={index} />
                    
                        </>
                    ))}
                </Grid>
            </Grid>
        </>
    )
};

export default BookList;