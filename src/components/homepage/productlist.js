import React , {useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Grid , Typography } from '@mui/material';
import './productlist.css'


const ProductList = () =>{


    const [show, setshow] = useState(true)


    return(
        <>
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} className="image-hover-effect">
           <Card sx={{cursor:'pointer'}}>
                <CardContent>
                  <Grid container direction='column'>
                    <Grid item>
                        < FavoriteBorderIcon sx={{float:'right'}} />
                      <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div>
                              <img
                                  src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-13-1.png&w=750&q=75"
                                  alt='c1'
                                  width='150px'
                                  style={{
                                      objectFit: 'cover',
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      paddingLeft: '10px'
                                  }}
                                  className="image-hover-effect"
                              />
                          </div>
                      </Grid>
                      {show ? (
                        <Grid container direction='row' sx={{display:'flex' , justifyContent:'flex-end'}}>
                          <Grid container direction='row' justifyContent='space-evenly' className='calc-box'>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'20px' , cursor:'pointer'}} />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'16px'}}>76</Typography>
                            </Grid>
                            <Grid item>
                                <AddIcon sx={{fontSize:'20px' , cursor:'pointer'}}/>
                            </Grid>
                          </Grid>  
                        </Grid>
                      ):(
                        <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                          <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}/>
                          <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}} />
                        </Grid>
                      )}
                
                    </Grid>
                      <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} >
                          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                              <Grid item>
                                  <Typography sx={{ fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1rem' }}>S$ 88</Typography>
                                  <Typography sx={{ padding: '10px 0px', fontSize: '12px', wordBreak: 'break-all' }}>Ghgsvbjn</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} className="image-hover-effect">
           <Card sx={{cursor:'pointer'}}>
                <CardContent>
                  <Grid container direction='column'>
                    <Grid item>
                        < FavoriteBorderIcon sx={{float:'right'}} />
                      <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div>
                              <img
                                  src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-13-1.png&w=750&q=75"
                                  alt='c1'
                                  width='150px'
                                  style={{
                                      objectFit: 'cover',
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      paddingLeft: '10px'
                                  }}
                                  className="image-hover-effect"
                              />
                          </div>
                      </Grid>
                      {show ? (
                        <Grid container direction='row' sx={{display:'flex' , justifyContent:'flex-end'}}>
                          <Grid container direction='row' justifyContent='space-evenly' className='calc-box'>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'20px' , cursor:'pointer'}} />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'16px'}}>76</Typography>
                            </Grid>
                            <Grid item>
                                <AddIcon sx={{fontSize:'20px' , cursor:'pointer'}}/>
                            </Grid>
                          </Grid>  
                        </Grid>
                      ):(
                        <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                          <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}/>
                          <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}} />
                        </Grid>
                      )}
                
                    </Grid>
                      <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} >
                          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                              <Grid item>
                                  <Typography sx={{ fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1rem' }}>S$ 88</Typography>
                                  <Typography sx={{ padding: '10px 0px', fontSize: '12px', wordBreak: 'break-all' }}>Ghgsvbjn</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} className="image-hover-effect">
           <Card sx={{cursor:'pointer'}}>
                <CardContent>
                  <Grid container direction='column'>
                    <Grid item>
                        < FavoriteBorderIcon sx={{float:'right'}} />
                      <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div>
                              <img
                                  src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-13-1.png&w=750&q=75"
                                  alt='c1'
                                  width='150px'
                                  style={{
                                      objectFit: 'cover',
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      paddingLeft: '10px'
                                  }}
                                  className="image-hover-effect"
                              />
                          </div>
                      </Grid>
                      {show ? (
                        <Grid container direction='row' sx={{display:'flex' , justifyContent:'flex-end'}}>
                          <Grid container direction='row' justifyContent='space-evenly' className='calc-box'>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'20px' , cursor:'pointer'}} />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'16px'}}>76</Typography>
                            </Grid>
                            <Grid item>
                                <AddIcon sx={{fontSize:'20px' , cursor:'pointer'}}/>
                            </Grid>
                          </Grid>  
                        </Grid>
                      ):(
                        <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                          <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}/>
                          <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}} />
                        </Grid>
                      )}
                
                    </Grid>
                      <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} >
                          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                              <Grid item>
                                  <Typography sx={{ fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1rem' }}>S$ 88</Typography>
                                  <Typography sx={{ padding: '10px 0px', fontSize: '12px', wordBreak: 'break-all' }}>Ghgsvbjn</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} className="image-hover-effect">
           <Card sx={{cursor:'pointer'}}>
                <CardContent>
                  <Grid container direction='column'>
                    <Grid item>
                        < FavoriteBorderIcon sx={{float:'right'}} />
                      <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div>
                              <img
                                  src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-13-1.png&w=750&q=75"
                                  alt='c1'
                                  width='150px'
                                  style={{
                                      objectFit: 'cover',
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      paddingLeft: '10px'
                                  }}
                                  className="image-hover-effect"
                              />
                          </div>
                      </Grid>
                      {show ? (
                        <Grid container direction='row' sx={{display:'flex' , justifyContent:'flex-end'}}>
                          <Grid container direction='row' justifyContent='space-evenly' className='calc-box'>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'20px' , cursor:'pointer'}} />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'16px'}}>76</Typography>
                            </Grid>
                            <Grid item>
                                <AddIcon sx={{fontSize:'20px' , cursor:'pointer'}}/>
                            </Grid>
                          </Grid>  
                        </Grid>
                      ):(
                        <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                          <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}/>
                          <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}} />
                        </Grid>
                      )}
                
                    </Grid>
                      <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} >
                          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                              <Grid item>
                                  <Typography sx={{ fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1rem' }}>S$ 88</Typography>
                                  <Typography sx={{ padding: '10px 0px', fontSize: '12px', wordBreak: 'break-all' }}>Ghgsvbjn</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} className="image-hover-effect">
           <Card sx={{cursor:'pointer'}}>
                <CardContent>
                  <Grid container direction='column'>
                    <Grid item>
                        < FavoriteBorderIcon sx={{float:'right'}} />
                      <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div>
                              <img
                                  src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-13-1.png&w=750&q=75"
                                  alt='c1'
                                  width='150px'
                                  style={{
                                      objectFit: 'cover',
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      paddingLeft: '10px'
                                  }}
                                  className="image-hover-effect"
                              />
                          </div>
                      </Grid>
                      {show ? (
                        <Grid container direction='row' sx={{display:'flex' , justifyContent:'flex-end'}}>
                          <Grid container direction='row' justifyContent='space-evenly' className='calc-box'>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'20px' , cursor:'pointer'}} />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'16px'}}>76</Typography>
                            </Grid>
                            <Grid item>
                                <AddIcon sx={{fontSize:'20px' , cursor:'pointer'}}/>
                            </Grid>
                          </Grid>  
                        </Grid>
                      ):(
                        <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                          <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}/>
                          <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}} />
                        </Grid>
                      )}
                
                    </Grid>
                      <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} >
                          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                              <Grid item>
                                  <Typography sx={{ fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1rem' }}>S$ 88</Typography>
                                  <Typography sx={{ padding: '10px 0px', fontSize: '12px', wordBreak: 'break-all' }}>Ghgsvbjn</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={3} xl={2.4} className="image-hover-effect">
           <Card sx={{cursor:'pointer'}}>
                <CardContent>
                  <Grid container direction='column'>
                    <Grid item>
                        < FavoriteBorderIcon sx={{float:'right'}} />
                      <Grid pb={2} item sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <div>
                              <img
                                  src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fproducts%2Fp-13-1.png&w=750&q=75"
                                  alt='c1'
                                  width='150px'
                                  style={{
                                      objectFit: 'cover',
                                      maxWidth: '100%',
                                      maxHeight: '100%',
                                      paddingLeft: '10px'
                                  }}
                                  className="image-hover-effect"
                              />
                          </div>
                      </Grid>
                      {show ? (
                        <Grid container direction='row' sx={{display:'flex' , justifyContent:'flex-end'}}>
                          <Grid container direction='row' justifyContent='space-evenly' className='calc-box'>
                            <Grid item>
                                <RemoveIcon sx={{fontSize:'20px' , cursor:'pointer'}} />
                            </Grid>
                            <Grid item>
                                <Typography  sx={{fontSize:'16px'}}>76</Typography>
                            </Grid>
                            <Grid item>
                                <AddIcon sx={{fontSize:'20px' , cursor:'pointer'}}/>
                            </Grid>
                          </Grid>  
                        </Grid>
                      ):(
                        <Grid container direction='column' alignItems='end' gap={1} sx={{marginTop:'-40px' , minHeight:'70px'}}>
                          <RemoveRedEyeOutlinedIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}}/>
                          <AddIcon className="expand-look" sx={{fontSize:'32px'  , zIndex:'998'}} />
                        </Grid>
                      )}
                
                    </Grid>
                      <Grid item sx={{ paddingTop: '10px', display: 'flex', justifyContent: 'center' }} >
                          <Grid container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100px' }}>
                              <Grid item>
                                  <Typography sx={{ fontWeight: 'bold', lineHeight: '1.5rem', fontSize: '1rem' }}>S$ 88</Typography>
                                  <Typography sx={{ padding: '10px 0px', fontSize: '12px', wordBreak: 'break-all' }}>Ghgsvbjn</Typography>
                              </Grid>
                          </Grid>
                      </Grid>
                  </Grid>
                </CardContent>
            </Card>
        </Grid>
        </>
    )
}

export default ProductList;