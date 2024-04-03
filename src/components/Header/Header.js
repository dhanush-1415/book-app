import React, { useState, useEffect  } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Drawer,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import './Header.css';
import MenuIcon from '@mui/icons-material/Menu';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Auth from '../Auth/auth';
import { useAuth } from '../Auth/AuthContet';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InputAdornment from '@mui/material/InputAdornment';
import FavoriteSidebar from '../favourites/favourites';
import ShoppingCartSidebar from '../cart/cart';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HeaderL2 from './HeaderL2';
import HeaderL1 from './HeaderL1';
import { getWishlistData, getBookData, removeWishlistData } from '../../apiCalls';
import { toast } from 'react-toastify'
import { book } from '../../config';
import { getValue, setValue } from '../../utility';

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [count , setChangeCount ] = useState(0);

  setInterval(function() {
    setChangeCount(getValue());
  }, 1000);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  const [isFavoriteSidebarOpen, setFavoriteSidebarOpen] = useState(false);
  const [isShoppingCartSidebarOpen, setShoppingCartSidebarOpen] = useState(false);

  const toggleFavoriteSidebar = () => {
    setFavoriteSidebarOpen(!isFavoriteSidebarOpen);
  };

  const toggleShoppingCartSidebar = () => {
    setShoppingCartSidebarOpen(!isShoppingCartSidebarOpen);
  };


  const { isLogged } = useAuth();

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleMenuMouseEnter = () => {
    setMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setMenuOpen(false);
  };


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleSignin = () => {
    window.location.href = "/account/register";
  }

  const handleLogin = () => {
    window.location.href = "/account/login";
  }


  const [ dataArray , setCartArray ] =  useState({});

  const [cartSubTotal , setSubtotal ] = useState(0);

  const [cartCount , setCartCount ] = useState(0);

  const [wishlistData , setWishlistData] = useState();

  const [wishlistCount , setWishlistCount ] = useState(0);

  const [update , setUpdate]  = useState(false);


  useEffect(() => {
    setSubtotal(0);
  
    const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
  
    const cartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};
  
    const shopArray = cartArray[storedUserId] || [];
  
    setCartCount(shopArray.length);
  
    if (shopArray && shopArray.length) {
      let total = 0;
  
      shopArray.forEach((item) => {
        const subtotal = item.CartCount * item.SellingPrice;
        total += subtotal;
      });
  
      setSubtotal(total);
    }
  
    setCartArray(shopArray);
  
  }, [ dataArray , update , count]);
  


  const saveToCart = (data, count) => {
    const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
  
    if (storedUserId) {
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
  
      localStorage.setItem('bookUserCart', JSON.stringify(cartArray));
      setUpdate(!update);
      setValue(count + 1)
      toast.success("Product asded to cart")
  

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


  const handleRemoveFromCart = (code) => {

    const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
   
    if (storedUserId) {
      let cartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};
  
      if (cartArray[storedUserId]) {

        const index = cartArray[storedUserId].findIndex(item => item.BookId === code);

        if (index !== -1) {
            cartArray[storedUserId].splice(index, 1);
    
            localStorage.setItem('bookUserCart', JSON.stringify(cartArray));
    
            toast.success("Item removed from cart");
            setUpdate(!update);
            setValue(count + 1)

          }
      }
  
    } else {
      toast.error("Please login to continue");
    }
  }

  

  useEffect(() => {

    const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;

    if(storedUserId){
        const getWishlist = async () => {
            try {
                const response = await getWishlistData(storedUserId);
                
                if (response.Message === 'Sucess') {
                      setWishlistData(response.Data)
                      setWishlistCount(response.Data.length)
                  }
            } catch (error) {
                console.error(`Error fetching data:`, error);
            }
        }

        getWishlist();
    }
    
},[update , count]);


  const handleHome = () => {
    window.location.href = "/"
  }



  const handleRemoveWishlist = (code ) => {

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
            setUpdate(!update);
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


  return (
    <>
    <HeaderL1 />

      {/* Mobile Header */}
      <AppBar  position='relative' sx={{  background:'white', display: { md: 'none', sm: 'block' }}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon sx={{color:'black'}} />
          </IconButton>
          <img onclick={handleHome} src='https://www.basheergraphic.com/cdn/shop/t/1/assets/logo.png?v=162072033459672328741473575341' width='60px' alt='def1'/>

        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        onClose={closeSidebar}
        PaperProps={{
          style: {
            width: '70%',
            background: 'white',
          },
        }}
      >
        <List>
          <ListItem onClick={closeSidebar} sx={{display:'flex' , justifyContent:'flex-end'}}>
            <CloseIcon />
          </ListItem>
          <ListItem>
            <Link to={`/`}>
              <Typography className="bold-text">Home</Typography>
            </Link>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Link to={`/about`}>
              <Typography className="bold-text">BestSelling Books</Typography>
            </Link>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Latest Books</Typography>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Coming Soon</Typography>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Blog</Typography>
          </ListItem>
          <ListItem onClick={closeSidebar}>
            <Typography className="bold-text">Contact Us</Typography>
          </ListItem>
          {/* Add more menu items as needed */}
        </List>
      </Drawer>
      {/* Desktop Header */}
      <AppBar position='relative' sx={{ background:'white',padding:'30px 0', display: { xs:'none', sm: 'none', md: 'block' } }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent='space-between' >
            <Grid item md={1.5}>
              <img onclick={handleHome} src='https://www.basheergraphic.com/cdn/shop/t/1/assets/logo.png?v=162072033459672328741473575341' width='250px' alt='def2' />
            </Grid>
            <Grid  item md={7} >
              <Grid  container justifyContent='center'>
                <Grid item >
                <div className="about-container">
                <Button
                    className="about-button"
                    onClick={handleButtonClick}
                    onMouseEnter={handleButtonClick}
                    onMouseLeave={handleButtonClick}
                    sx={{color:'white',
                    background:'#f65d4e' , 
                    borderRadius:'100px',
                    padding:'10px 25px' , 
                    minWidth:'300px',
                    '&:hover': {
                      background: '#e54c3c', 
                    }
                  }}
                  >
                    <Grid container direction='row' justifyContent='space-around'>
                      <Grid item  sx={{display:'flex', flexDirection:'row'}}>
                        <ListIcon sx={{fontSize:'40px'}} />
                        <Typography sx={{fontWeight:'bold' , display:'flex' , alignItems:'center'}}>Categories</Typography>
                      </Grid>
                      <Grid item sx={{ display:'flex' , alignItems:'center'}}>
                        <ExpandMoreIcon />
                      </Grid>
                    </Grid>
                  </Button>
                    {isMenuOpen && (
                      <div
                        className="about-menu"
                        onMouseEnter={handleMenuMouseEnter}
                        onMouseLeave={handleMenuMouseLeave}
                      >
                  <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    <nav aria-label="main mailbox folders">
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <DraftsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Drafts" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </nav>
                    <Divider />
                    <nav aria-label="secondary mailbox folders">
                      <List>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText primary="Trash" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton component="a" href="#simple-list">
                            <ListItemText primary="Spam" />
                          </ListItemButton>
                        </ListItem>
                      </List>
                    </nav>
                  </Box>
                      </div>
                    )}
                  </div>
                </Grid>
                <Grid item>
                  <TextField
                    label="What are you looking for?"
                    id="SearchInput"
                    fullWidth
                    
                    sx={{
                      marginLeft:'20px',
                      minWidth:'350px',
                      background: '#f6f6f6',
                      borderRadius: '100px',
                      border: 'none',  // Remove the border
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: 'none', // Remove the border
                        },
                      },
                      '& input': {
                        fontSize: '16px',        // Set font size for the input text
                        border: 'none',  // Remove the input border
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '18px',         // Set font size for the label
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={2} sx={{paddingLeft:'50px'}}>
             <Grid container direction='row' justifyContent='space-between'>
                <Grid item md={10} sx={{display:'flex' , justifyContent:'center'}}>
                  <Grid container direction='row' justifyContent='space-evenly' alignItems='center'>
                    <Grid item>
                      <Badge badgeContent={wishlistCount} color="primary" onClick={toggleFavoriteSidebar}>
                        <FavoriteIcon sx={{color:'black'}} />
                      </Badge>
                      <FavoriteSidebar remove={handleRemoveWishlist} data={wishlistData} isOpen={isFavoriteSidebarOpen} onClose={toggleFavoriteSidebar} />
                    </Grid>
                    <Grid item>
                      <Badge badgeContent={cartCount} color="primary"  onClick={toggleShoppingCartSidebar}>
                        <ShoppingCartIcon sx={{color:'black'}} />
                      </Badge>
                      <ShoppingCartSidebar updateCount={handleAddtoCart} cartDataArray={dataArray} remove={handleRemoveFromCart} subTotal={cartSubTotal} isOpen={isShoppingCartSidebarOpen} onClose={toggleShoppingCartSidebar} />
                    </Grid>
                    <Grid item>
                      {isLogged ? (
                        <Link
                          to={`/my-account/accountsettings`}
                        >
                          <Typography sx={{color:'black' , fontWeight:'bold', cursor:'pointer'}}>Account</Typography>
                        </Link>
                      ):(
                        <>
                          <Typography 
                          sx={{color:'black' , 
                          fontWeight:'bold', 
                          cursor:'pointer'}} 
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={handleClick}
                          >< AccountCircleIcon /></Typography>
                          <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem onClick={handleLogin}>Login</MenuItem>
                          <MenuItem onClick={handleSignin}>Register</MenuItem>
                        </Menu>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
             </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <HeaderL2 />
    </>
  );
};

export default Header;