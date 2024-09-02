import React, {useEffect, useState} from "react";
import { Grid, Typography, Divider } from "@mui/material";
import './booklist.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { toast } from 'react-toastify'
import { getByTagData, getBookData } from "../../apiCalls";
import TagOneBooks  from "./tag1";
import TagTwoBooks from "./tag2";
import TagThreeBooks from "./tag3";

const BookList = () => {

    const [BestSellingTagData , setBestSellingTagData] = useState();

    const [latestTagData , setLatestTagData] = useState();

    const [ComingSoonTagData , setCommingSoonTagData ] = useState();


    // localStorage.setItem('bookUserCart', JSON.stringify({}));

    

    const fetchDataByTag = async (tag, setData) => {

        // localStorage.clear();

        try {
          const data = await getByTagData(tag);
          if (data.Message === 'Sucess') {
            setData(data.Data);

          } else {
            toast.error("Something went wrong");
          }
        } catch (error) {
          console.error(`Error fetching ${tag} data:`, error);
        }
      };
      
      useEffect(() => {
        fetchDataByTag("BS", setBestSellingTagData);
      }, []);
      
      useEffect(() => {
        fetchDataByTag("LB", setLatestTagData);
      }, []);
      
      useEffect(() => {
        fetchDataByTag("CS", setCommingSoonTagData);
      }, []);
      


    const getRandomObjects = () => {
        if(BestSellingTagData && BestSellingTagData.length){
            return BestSellingTagData.sort(() => Math.random() - 0.5).slice(0, 5);
        }else{
            return BestSellingTagData;
        }
    };
    const randomTagData = getRandomObjects();


    const getRandomObjects2 = () => {
        if(latestTagData && latestTagData.length){
            return latestTagData.sort(() => Math.random() - 0.8).slice(0, 8);
        }else{
            return latestTagData;
        }
    };
    const randomTagData2 = getRandomObjects2();


    const getRandomObjects3 = () => {
        if(ComingSoonTagData && ComingSoonTagData.length){
            return ComingSoonTagData.sort(() => Math.random() - 0.10).slice(0, 10);
        }else{
            return ComingSoonTagData;
        }
    };
    const randomTagData3 = getRandomObjects3();



    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

      const responsive2 = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };


    const handleTagPage = (code) => {
        window.location.href = `/products/${code}`
    }


    return(
        <>
            <Grid sx={{width:'95%' , margin:'100px auto'}}>
                <Grid container justifyContent="space-between" alignItems="center" mt={6} mb={6}>
                    <Grid item md={3}>
                        <Typography className="typo1">Bestselling Books</Typography>
                    </Grid>
                    <Grid item md={7.5}>
                        <Divider sx={{border:'1px solid grey'}} />
                    </Grid>
                    <Grid item md={1}>
                        <button className="cmn-btn" onClick={(e)=>handleTagPage("best_selling")}>View more</button>
                    </Grid>
                </Grid>
                <Grid container spacing={6}>
                    {randomTagData && randomTagData.length && randomTagData.map((item, index) => (
                        <>
                            <TagOneBooks  item={item} key={index} />
                        </>
                    ))}
                </Grid>
                <Grid sx={{margin:'100px 0px'}}>
                    <Grid container justifyContent="space-between" alignItems="center" mt={5} mb={3}>
                        <Grid item md={3}>
                            <Typography className="typo1" >Latest Books</Typography>
                        </Grid>
                        <Grid item md={7.5}>
                            <Divider sx={{border:'1px solid grey'}} />
                        </Grid>
                        <Grid item md={1}>
                            <button className="cmn-btn" onClick={(e)=>handleTagPage("latest_books")}>View more</button>
                        </Grid>
                    </Grid>
                    <Grid>
                        <Carousel responsive={responsive}>
                            {randomTagData3 && randomTagData3.length ? (
                                randomTagData3.map((item, index) => (
                                    <> 
                                        <TagTwoBooks  item={item} key={index} />
                                    </>
                                ))
                            ) : (
                                <h1>hhhh</h1>
                            )}
                        </Carousel>
                    </Grid>
                </Grid>
            </Grid>
            <Grid>
                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_01_1.png?v=1688201302&width=3000" alt="d1" width='100%' />
            </Grid>
            <Grid sx={{width:'95%' , margin:'100px auto'}}>
                <Grid container justifyContent="space-between" alignItems="center" mt={6} mb={6}>
                    <Grid item md={3}>
                        <Typography className="typo1" >Comming Soon</Typography>
                    </Grid>
                    <Grid item md={7.5}>
                        <Divider sx={{border:'1px solid grey'}} />
                    </Grid>
                    <Grid item md={1}>
                        <button className="cmn-btn" onClick={(e)=>handleTagPage("coming_soon")}>View more</button>
                    </Grid>
                </Grid>
                <Grid container justifyContent='space-between'>
                    <Grid item md={8.7}>
                        <Grid container spacing={4}>
                            {randomTagData2 && randomTagData2.length && randomTagData2.map((item, index) => (
                                <>
                                    <TagThreeBooks  item={item} key={index} />
                                </>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid item md={3}>
                        <div className="side-banner">
                            <img src="https://ap-bookory.myshopify.com/cdn/shop/files/Mask_Group.png?v=1688629766&width=1400" alt="d1" width="100%" />
                            {/* <div className="text-cont">
                                <Grid><Typography className="typo1" sx={{color:'white' , fontWeight:'bold'}}>Best Offer</Typography></Grid>
                                <Grid><Typography className="typo6" sx={{color:'white' , fontWeight:'bold'}}>Save S$15</Typography></Grid>
                                <Grid><Typography className="typo7" sx={{color:'white' }}>ON SELECTED ITEMS</Typography></Grid>
                                <Grid pt={4}><button className="cmn-btn">See more</button></Grid>
                            </div> */}
                        </div>
                    </Grid>
                </Grid>
              
            </Grid>
            <Grid sx={{width:'95%' , margin:'100px auto'}}>
                <Grid container justifyContent="space-between" alignItems="center" mt={6} mb={6}>
                    <Grid item md={3}>
                        <Typography className="typo1">Genres Books</Typography>
                    </Grid>
                    <Grid item md={7.5}>
                        <Divider sx={{border:'1px solid grey'}} />
                    </Grid>
                    <Grid item md={1}>
                        <button className="cmn-btn">View more</button>
                    </Grid>
                </Grid>
                <Grid>
                    <Carousel responsive={responsive2}>
                        <Grid  sx={{margin:'10px'}}>
                            <div className="img-cont2">
                                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_06_1.png?v=1688629825" alt="d2" width="100%" style={{borderRadius:'20px'}} />
                                <div className="text-cont2">
                                    <Grid><Typography className="typo1" sx={{color:'white'}}>Genre Fiction</Typography></Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grid  sx={{margin:'10px'}}>
                            <div className="img-cont2">
                                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_06_1_1.png?v=1688629847" alt="d2" width="100%" style={{borderRadius:'20px'}} />
                                <div className="text-cont2">
                                    <Grid><Typography className="typo1" sx={{color:'white'}}>Activity Books</Typography></Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grid  sx={{margin:'10px'}}>
                            <div className="img-cont2">
                                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_06_1_2.png?v=1688629874" alt="d2" width="100%" style={{borderRadius:'20px'}} />
                                <div className="text-cont2">
                                    <Grid><Typography className="typo1" sx={{color:'white'}}>European</Typography></Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grid  sx={{margin:'10px'}}>
                            <div className="img-cont2">
                                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_06_1.png?v=1688629825" alt="d2" width="100%" style={{borderRadius:'20px'}} />
                                <div className="text-cont2">
                                    <Grid><Typography className="typo1" sx={{color:'white'}}>Genre Fiction</Typography></Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grid  sx={{margin:'10px'}}>
                            <div className="img-cont2">
                                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_06_1.png?v=1688629825" alt="d2" width="100%" style={{borderRadius:'20px'}} />
                                <div className="text-cont2">
                                    <Grid><Typography className="typo1" sx={{color:'white'}}>Genre Fiction</Typography></Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grid  sx={{margin:'10px'}}>
                            <div className="img-cont2">
                                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_06_1.png?v=1688629825" alt="d2" width="100%" style={{borderRadius:'20px'}} />
                                <div className="text-cont2">
                                    <Grid><Typography className="typo1" sx={{color:'white'}}>Genre Fiction</Typography></Grid>
                                </div>
                            </div>
                        </Grid>
                        <Grid  sx={{margin:'10px'}}>
                            <div className="img-cont2">
                                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_06_1.png?v=1688629825" alt="d2" width="100%" style={{borderRadius:'20px'}} />
                                <div className="text-cont2">
                                    <Grid><Typography className="typo1" sx={{color:'white'}}>Genre Fiction</Typography></Grid>
                                </div>
                            </div>
                        </Grid>
                                                <Grid  sx={{margin:'10px'}}>
                            <div className="img-cont2">
                                <img src="https://ap-bookory.myshopify.com/cdn/shop/files/01_06_1.png?v=1688629825" alt="d2" width="100%" style={{borderRadius:'20px'}} />
                                <div className="text-cont2">
                                    <Grid><Typography className="typo1" sx={{color:'white'}}>Genre Fiction</Typography></Grid>
                                </div>
                            </div>
                        </Grid>
                        
                    </Carousel>
                </Grid>
            </Grid>
        </>
    )
}

export default BookList