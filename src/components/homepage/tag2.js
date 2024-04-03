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


const TagTwoBooks  = (item) => {


    const [isINWishlist , setIsInWishlist] = useState(false);
    const [isInCart , setIsInCart ] = useState(false);


    const data = item.item;


    const [changeCount , setChangeCount] = useState(0);


    useEffect(()=>{
        setValue(changeCount);
      },[changeCount])


      
      setInterval(function() {
        setChangeCount(getValue());
      }, 1000);

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
      }, [data.BookId ,isINWishlist,isInCart, changeCount ]);


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
          setChangeCount(changeCount + 1)
          setIsInCart(true);
      
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
                    setChangeCount(changeCount + 1)
                    setIsInWishlist(false);
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



    function truncateDescription(description, maxLength) {
        const regex = /(<([^>]+)>)/ig; // Regular expression to match HTML tags
        const plainText = description.replace(regex, ''); // Removing HTML tags
        if (plainText.length > maxLength) {
          return `${plainText.substring(0, maxLength)}...`;
        } else {
          return plainText;
        }
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
            <Grid style={{ background: '#fef5f5', borderRadius: '20px', padding: '20px', margin: '20px' }}>
                <Grid container spacing={5}>
                <Grid item md={3}>
                    <img onClick={(e) => { handleProduct(data.BookId) }} src={data.BookImage || "https://ap-bookory.myshopify.com/cdn/shop/files/20.jpg?v=1688356240"} alt="d1" width='100%' style={{ borderRadius: '20px' , maxHeight:'200px' }} />
                </Grid>
                <Grid item md={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Grid onClick={(e)=>{handleProduct(data.BookId)}} sx={{cursor:'pointer'}}>
                    <Grid><Typography className="typo2" sx={{padding:'2px 0'}}>{truncateName(data.Title,35)}</Typography></Grid>
                    <Grid><Typography className="typo3" sx={{padding:'2px 0'}}>{truncateAuth(data.AuthorName,40)}</Typography></Grid>
                        <Grid>
                            <Typography className="typo5" sx={{padding:'4px 0'}}>
                                {truncateDescription(data.DetailDescription, 120)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid>
                    <Grid><Typography className="typo4" style={{ padding: '2px 0' }}>S$ {data.SellingPrice.toFixed(2)}</Typography></Grid>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default TagTwoBooks ;