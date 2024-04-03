import React , {useState , useEffect} from "react";
import { Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify'
import { getBookData, getWishlistData , addtoWishlist , removeWishlistData } from "../../apiCalls";
import { book } from "../../config";
import { getValue, setValue } from "../../utility";

const TagThreeBooks  = (item) => {


    const [isINWishlist , setIsInWishlist] = useState(false);
    const [isInCart , setIsInCart ] = useState(false);


    const data = item.item;

    const [changeCount , setChangeCount] = useState(0);

    
    setInterval(function() {
        setChangeCount(getValue());
      }, 1000);

    useEffect(()=>{
        setValue(changeCount);
      },[changeCount])


    useEffect(() => {
        const storedCartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};

        const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
      
        if (storedUserId) {      
            
            if(storedCartArray[storedUserId]){
                      
                storedCartArray[storedUserId].forEach(item => {
                if (item.BookId === data.BookId) {
                    setIsInCart(true);
                }
                });
            }
        
        }
      }, [data.BookId ,isINWishlist,isInCart , changeCount ]);


      useEffect(() => {

        const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
    
        if(storedUserId){
            const getWishlist = async () => {
                try {
                    const response = await getWishlistData(storedUserId);
                    
                    if (response.Message === 'Sucess') {
                        const wishData = response.Data
                            wishData.forEach(item => {
                                if (item.ProductCode === data.BookId) {
                                    setIsInWishlist(true);
                                }
                            });
                    }
                } catch (error) {
                    console.error(`Error fetching data:`, error);
                }
            }
    
            getWishlist();
        }
        
    },[data.BookId ,isINWishlist,isInCart, changeCount]);
    
      

    const saveToCart = (data, count) => {
        const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
      
        if (storedUserId) {
          let cartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};
      
          if (!cartArray[storedUserId]) {
            cartArray[storedUserId] = [];
          }
      
          const dataWithCartCount = {
            ...data[0],
            "CartCount": 1
          };
      
          cartArray[storedUserId].push(dataWithCartCount);

          toast.success("Item added to cart");
          setIsInCart(true);
          setChangeCount(changeCount + 1)
      
          localStorage.setItem('bookUserCart', JSON.stringify(cartArray));
        } else {
          toast.error("Please login to continue");
        }
      }
      

    const handleAddtoCart = async (code) => {
        try {
            const data = await getBookData(code);
            
            if (data.Message === 'Sucess') {
                saveToCart(data.Data);
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(`Error fetching data:`, error);
        }
    }



    const handleRemoveFromCart = (code) => {

        const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
       
        if (storedUserId) {
          let cartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};
      
          if (cartArray[storedUserId]) {

            const index = cartArray[storedUserId].findIndex(item => item.BookId === data.BookId);

            if (index !== -1) {
                cartArray[storedUserId].splice(index, 1);
        
                localStorage.setItem('bookUserCart', JSON.stringify(cartArray));
        
                toast.success("Item removed from cart");
                setIsInCart(false);
                setChangeCount(changeCount + 1)
              }
          }
      
        } else {
          toast.error("Please login to continue");
        }
      }



      const handleAddtoWishlist = (code , name) => {

        const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;


        if(storedUserId){

            const postData = {
                "OrgId": book.OrgId,
                "CustomerId": storedUserId,
                "ProductCode": code,
                "ProductName": name,
                "IsActive": true,
                "CreatedBy": "user",
                "CreatedOn": new Date()
              }

              
            addtoWishlist(postData)
            .then((data) => {
                if (data.Message === 'Sucess') {
                    toast.success("Product added to wishlist");
                    setIsInWishlist(true);
                    setChangeCount(changeCount + 1)
                } else {
                    toast.error(data.Message + ' in adding product');
                }
            })
            .catch((error) => {
                toast.error(error);
            });


        }else{
            toast.error("Please login to continue")
        }

      }

      const handleRemoveFromWishlist = (code) => {

        const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;

        if(storedUserId){

            const postData = {
                code:storedUserId,
                pcode:code
            }

            removeWishlistData(postData)
            .then((data) => {

                if (data.Message === 'Sucess') {
                    toast.success("Product removed from wishlist");
                    setIsInWishlist(false);
                    setChangeCount(changeCount + 1)
                } else {
                    toast.error(data.Message + ' in removing product');
                }
            })
            .catch((error) => {
                toast.error(error);
            });
        } 

      }
    

    const handleProduct = (code) => {
        window.location.href = `/product/${code}`
    }


    function truncateName(description, maxLength) {
        const regex = /(<([^>]+)>)/ig; // Regular expression to match HTML tags
        const plainText = description.replace(regex, ''); // Removing HTML tags
        if (plainText.length > maxLength) {
          return `${plainText.substring(0, maxLength)}...`;
        } else {
          return plainText;
        }
    }

    function truncateAuth(description, maxLength) {
        const regex = /(<([^>]+)>)/ig; // Regular expression to match HTML tags
        const plainText = description.replace(regex, ''); // Removing HTML tags
        if (plainText.length > maxLength) {
          return `${plainText.substring(0, maxLength)}...`;
        } else {
          return plainText;
        }
      }

    return(
        <>
            <Grid item xs={6} sm={4} md={4} lg={3} xl={3}>
                <div className="image-container">
                    <img onClick={(e)=>{handleProduct(data.BookId)}} src={data.BookImage || "https://ap-bookory.myshopify.com/cdn/shop/files/20.jpg?v=1688356240"} alt="d1" width="270px" style={{maxHeight:'350px' , minHeight:'350px'}} />
                    <div className="option-buttons">
                        {isINWishlist ? (
                            <span><FavoriteBorderIcon sx={{width:'30px' ,  background:'#F65D4E' , color:'white' , padding:'13px 10px', borderRadius:'50%'}} onClick={(e)=>{handleRemoveFromWishlist(data.BookId)}} /></span>
                        ):(
                            <span><FavoriteBorderIcon sx={{width:'30px' , background:'white' , color:'black' , padding:'13px 10px', borderRadius:'50%'}} onClick={(e)=>{handleAddtoWishlist(data.BookId , data.Title)}} /></span>
                        )}
                        {isInCart ? (
                            <span><ShoppingCartOutlinedIcon sx={{width:'30px' , background:'#F65D4E' , color:'white' , padding:'13px 10px', borderRadius:'50%'}} onClick={(e)=>{handleRemoveFromCart(data.BookId)}} /></span>
                        ):(
                            <span><ShoppingCartOutlinedIcon sx={{width:'30px' , background:'white' , color:'black' , padding:'13px 10px', borderRadius:'50%'}} onClick={(e)=>{handleAddtoCart(data.BookId)}} /></span>
                        )}
                        <span><RemoveRedEyeIcon onClick={(e)=>{handleProduct(data.BookId)}} sx={{width:'30px' , background:'white' , color:'black' , padding:'13px 10px', borderRadius:'50%'}} /></span>
                    </div>
                </div>
                <Grid onClick={(e)=>{handleProduct(data.BookId)}} sx={{cursor:'pointer'}}>
                    <Grid><Typography className="typo2" sx={{padding:'2px 0'}}>{truncateName(data.Title,18)}</Typography></Grid>
                    <Grid><Typography className="typo3" sx={{padding:'2px 0'}}>{truncateAuth(data.AuthorName,27)}</Typography></Grid>
                    <Grid><Typography className="typo4" sx={{padding:'2px 0'}}>S$ {data.SellingPrice.toFixed(2)}</Typography></Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default TagThreeBooks ;