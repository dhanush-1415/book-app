// ProductPage.js
import React , { useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import './product.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReplyIcon from '@mui/icons-material/Reply';
import { toast  } from 'react-toastify';
import { getBookData , getByTagData, addtoWishlist , removeWishlistData } from '../../apiCalls';
import { DotLoaderComponent } from '../loader';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Divider from '@mui/material/Divider';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import TagOneBooks from '../homepage/tag1';
import { book } from '../../config';

export default function ProductPage() {


  const { productcode } = useParams();
  const [loading, setLoading] = useState(true);
  const [count , setCount] = useState(0);

  const [prodData , setProdData ] = useState();

  const [relatedData , setRelatedData] = useState();


  const handleProduct = (code) => {
    window.location.href = `/product/${code}`
}



useEffect(() => {
  const fetchData = async () => {
    try {
      let tag = "SB"
      const data = await getByTagData(tag);
      if (data.Message === 'Sucess') {
        setRelatedData(data.Data);
      } else {
        toast.error(data.Message + ' in getting product');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  fetchData();

}, [productcode]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const data = await getBookData(productcode);
      if (data.Message === 'Sucess') {
        setProdData(data.Data[0]);
        setLoading(false);
      } else {
        toast.error(data.Message + ' in getting product');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  fetchData();

}, [productcode]);



const getRandomObjects = () => {
  if(relatedData && relatedData.length){
      return relatedData.sort(() => Math.random() - 0.10).slice(0, 10);
  }else{
      return relatedData;
  }
};
const randomTagData = getRandomObjects();


  
  // useEffect(() => {

  //   const branchCode = prodData.BranchCode;
  //   const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;
  //   if(storedUserId){
  //   let cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};
  //   if (cartArray[storedUserId] && cartArray[storedUserId][branchCode] && cartArray[storedUserId][branchCode].length) {
  //     cartArray[storedUserId][branchCode].forEach((item) => {
  //       if (item.Code === prodData.Code) {
  //         setCount(item.CartCount);
  //       }
  //     });
  //   }

  //   const formData ={
  //     OrgId:makan.orgId,
  //     code:storedUserId,
  //   }
  //   getWishlistData(formData)
  //   .then((response) => {
  //     if (response.Message === 'Sucess') {
  //       setIsWishlist(false)
  //         if(response.Data && response.Data.length){
  //           response.Data.forEach((item) => {
  //             if(item.ProductCode === prodData.Code){
  //               setIsWishlist(true);
  //             }
  //           });
  //         }
  //       } else if(response.Message === 'No data Found!') {
  //         console.log(response.Message + ' in wishlist');
  //       }else{
  //         toast.error(response.Message + ' in getting wishlist');
  //       }
  //   })
  //   .catch((error) => {
  //     toast.error(error);
  //   });

  // }
  // }, [ prodData]);



  const saveToCart = (data, count) => {
    const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
  
    if (storedUserId) {

          if(count >= 1){

            let cartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};
        
            if (!cartArray[storedUserId]) {
              cartArray[storedUserId] = [];
            }
        
            const dataWithCartCount = {
              ...data[0],
              "CartCount": count
            };

            const existingItemIndex = cartArray[storedUserId].findIndex(item => {
              return item.BookId === data[0].BookId;
          });

            if (existingItemIndex !== -1) {
                cartArray[storedUserId][existingItemIndex].CartCount = count;
            } else {
                cartArray[storedUserId].push(dataWithCartCount);
            }

            toast.success("Product added to cart")
        
            localStorage.setItem('bookUserCart', JSON.stringify(cartArray));
        }else{
          toast.error("Please choose cart count")
        }
    } else {
      toast.error("Please login to continue");
    }
  }
  

const handleAddtoCart = async (code , count) => {


    try {
        const data = await getBookData(code);
        
        if (data.Message === 'Sucess') {

            saveToCart(data.Data , count);
        } else {
            toast.error("Something went wrong");
        }
    } catch (error) {
        console.error(`Error fetching data:`, error);
    }
}
  
  const [isWishlist , setIsWishlist ] = useState(false);


  const handleWishlist = (code , name) => {


    console.log(code , name , "kkkkkkkkkkkkkkkk")
    const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;

    if(storedUserId){
      
      const data = {
        OrgId: book.OrgId,
        CustomerId: storedUserId,
        ProductCode: code,
        ProductName: name,
        IsActive: true,
        CreatedBy: "user",
        CreatedOn: new Date(),
      }

      addtoWishlist(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            toast.success("Product added to wishlist");
            setIsWishlist(true);
          } else {
            toast.error(data.Message + ' in adding product');
          }
      })
      .catch((error) => {
        toast.error(error);
      });

    }else{
      toast.error('Please Login to continue')
    }

  }


  const handleRemoveWishlist = (code , name) => {

    const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;

    if(storedUserId){

      const data = {
        OrgId: book.OrgId,
        code:storedUserId,
        pcode:code,
      }

      removeWishlistData(data)
      .then((data) => {
        if (data.Message === 'Sucess') {
            toast.success("Product removed from wishlist");
            setIsWishlist(false);
          } else {
            toast.error(data.Message + ' in adding product');
          }
      })
      .catch((error) => {
        toast.error(error);
      });

    }else{
      toast.error('Please Login to continue')
    }
  }


  function truncateDescription(description, maxLength) {
    const regex = /(<([^>]+)>)/ig; // Regular expression to match HTML tags
    const plainText = description.replace(regex, ''); // Removing HTML tags
    if (plainText.length > maxLength) {
      return `${plainText.substring(0, maxLength)}...`;
    } else {
      return plainText;
    }
  }


  if (loading) {
    return (
      <>
      <Grid
          sx={{
            height: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DotLoaderComponent />
        </Grid>
      </>
    );
  }



  return (
    <>
    {/* <ToastContainer /> */}
      <Grid sx={{width:'90%' , margin:'50px auto'}}>
        <Grid container justifyContent='space-between'>
          <Grid item md={5.7}>
            {/* <Grid container justifyContent='space-between'>
              <Grid item md={3.5}>
                  <div className='deskscroll'>
                    {prodData.EcommerceGalleryImages && prodData.EcommerceGalleryImages.length ? (
                        <>
                          {prodData.EcommerceGalleryImages.map((image, index) => (
                              <img key={index} src={image.ImageFilePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'200px', maxHeight:'200px'}} />
                          ))}
                        </>
                    ):(
                      <>
                            <img src={prodData.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'200px', maxHeight:'200px'}} />
                      </>
                    )}
                </div>

              </Grid>
              <Grid item md={8} sx={{display:'flex' , justifyContent:'center'}}>
                <img src={prodData.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'500px', maxHeight:'500px'}} />
              </Grid>
              <div className='mobscroll'>
                    {prodData.EcommerceGalleryImages && prodData.EcommerceGalleryImages.length ? (
                        <>
                          {prodData.EcommerceGalleryImages.map((image, index) => (
                              <img key={index} src={image.ImageFilePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'150px', maxHeight:'150px'}} />
                          ))}
                        </>
                    ):(
                      <>
                        <img src={prodData.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt='p1' width='100%' style={{ maxWidth:'150px', maxHeight:'150px'}} />
                      </>
                    )}
                </div>
            </Grid> */}
            <Grid container justifyContent='center' sx={{ background:'#f5f5f5' , borderRadius:'20px'}}>
                <img className='prod-img' src={prodData.BookImage || "https://ap-bookory.myshopify.com/cdn/shop/files/26.jpg?v=1688354383&width=800"} alt="d1" />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
              <Grid container direction='column'>
                <Grid item>
                  <Typography className='typo8'>{prodData.AuthorName}</Typography>
                </Grid>
                <Grid item>
                  <Typography className='typo9'>{prodData.Title}</Typography>
                </Grid>
                <Grid item pt={2}> 
                  <Typography className='typo10'>S$ {prodData.SellingPrice.toFixed(2)}</Typography>
                </Grid>
                <Grid container direction="column">
                  <Grid>
                    <Typography className='typo8' pt={2}>Quantity</Typography>
                  </Grid>
                  <Grid>
                      <Grid container justifyContent='space-between' sx={{margin:'20px 0' ,padding:'7px' , border:'1px solid black' , maxWidth:'150px'}}>
                        <Typography className='typo3'><RemoveIcon sx={{cursor:'pointer'}} onClick={() => {setCount(count - 1)}} /></Typography>
                        <Typography className='typo3'>{count}</Typography>
                        <Typography className='typo3'><AddIcon sx={{cursor:'pointer'}} onClick={() => {setCount(count + 1)}} /></Typography>
                      </Grid>
                  </Grid>
                  <Grid>
                    <Button className='cartBtn' onClick={(e) => {handleAddtoCart(prodData.BookId , count)}}>Add to Cart</Button>
                  </Grid>
                </Grid>
            
                {/* <Grid item PT={2}>
                    <Button className='cartBtn' sx={{marginTop:{xs:'7px',sm:'7px' , md:'0'}}}>Add Options</Button>
                </Grid> */}
                <Grid item pt={3}>
                  <Grid container justifyContent='space-between'>
                      <Grid item md={5.7}>
                        {isWishlist ? (
                            // <Grid container className='wishbox' justifyContent='center' alignItems='center' onClick={()=>{handleRemoveWishlist(prodData.Code , prodData.Name)}}>
                            <Grid container className='wishbox' justifyContent='center' alignItems='center' onClick={()=>{handleRemoveWishlist(prodData.BookId , prodData.Title)}}>
                                 <Typography sx={{fontSize:'20px' , fontWeight:'bold'}}>Wishlist</Typography>
                                 <FavoriteIcon sx={{fontSize:'30px'}}/>
                            </Grid>
                        ):(
                            // <Grid container className='wishbox' justifyContent='center' alignItems='center' onClick={()=>{handleWishlist(prodData.Code , prodData.Name)}}>
                            <Grid container className='wishbox' justifyContent='center' alignItems='center' onClick={()=>{handleWishlist(prodData.BookId , prodData.Title)}}>
                              <Typography sx={{fontSize:'20px' , fontWeight:'bold'}}>Wishlist</Typography>
                              <FavoriteBorderIcon sx={{fontSize:'30px'}}/>
                            </Grid>
                        )}
                      </Grid>
                      <Grid item md={5.7}>
                        <Grid container  className='sharebox' justifyContent='center' alignItems='center'>
                            <Typography sx={{fontSize:'20px' , fontWeight:'bold'}}>Share</Typography>
                            <ReplyIcon sx={{fontSize:'30px'}} />
                        </Grid>
                      </Grid>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container width='90%' sx={{margin:'0 auto' , paddingBottom:'50px'}}>
        <Grid item>
          <Typography className='typo1' pt={4}>Description</Typography>
          <Typography className='typo5' pt={4}>{truncateDescription(prodData.DetailDescription)}</Typography>
        </Grid>
      </Grid>
      <Divider sx={{border:'2px solid grey' , width:'90%' , margin:'0 auto'}} />

      <Grid sx={{width:'90%' , margin:'50px auto'}}>
        <Grid container justifyContent="space-between" alignItems="center" mt={6} mb={6}>
            <Grid item md={3}>
                <Typography className="typo1">Related Books</Typography>
            </Grid>
            <Grid item md={8.5}>
                <Divider sx={{border:'1px solid grey'}} />
            </Grid>
            {/* <Grid item md={1}>
                <button className="cmn-btn">View more</button>
            </Grid> */}
        </Grid>
        <Grid container spacing={6}>
            {randomTagData && randomTagData.length && randomTagData.map((item, index) => (
                <>
                    <TagOneBooks item={item} key={index} />
                </>
            ))}
        </Grid>
      </Grid>
    </>
  );
}
