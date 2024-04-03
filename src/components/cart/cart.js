// ShoppingCartSidebar.js
import React, {useState} from 'react';
import { Drawer, List, ListItem, Typography, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { toast } from 'react-toastify';
import styled from 'styled-components';


const StyledGridItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  border-radius: 5px;

  &:hover {
    background: rgba(0, 0, 0, 0.3);  // Transparent grey background on hover
  }
  
  &:hover img {
    filter: blur(4px);
  }

  img {
    max-width: 100px;
    max-height: 100px;
  }

  .close-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    cursor: pointer;
  }

  &:hover .close-icon {
    display: block;
  }
`;

const ShoppingCartSidebar = ({cartDataArray, subTotal, isOpen, onClose, remove, updateCount }) => {


  const [isHovered, setIsHovered] = useState(false);


  const handleCheckout =() => {
    if(cartDataArray && cartDataArray.length){

    window.location.href = `/checkout`;
    }else{
      toast.error("cart is empty")
    }
  }


  const handleProduct = (code) => {
    window.location.href = `/product/${code}`;
  }

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '30%',
          background: 'white',
          '@media (max-width: 600px)': {
            width: '100%', 
          },
        },
      }}
    >
      <List>
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', margin:'10px 0', position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
          <Typography className="bold-text" sx={{fontSize:'22px'}}>Cart</Typography> <CloseIcon onClick={onClose} sx={{cursor:'pointer'}} />
        </ListItem>
        <Divider sx={{border:'1px solid grey'}}/>
        {cartDataArray && cartDataArray.length > 0 ? cartDataArray.map((product, index) => (
          <>
            <ListItem key={index}>
              <Grid container justifyContent='space-between' sx={{minHeight:'100px'}}>
                <Grid item md={3} sx={{display:'flex' , justifyContent:'center' , alignItems:'center' , border:'1px solid grey'}}>
                    <StyledGridItem
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <img
                        src={product.BookImage || 'https://www.basheergraphic.com/cdn/shop/t/1/assets/logo.png?v=162072033459672328741473575341'}
                        alt={`product-${index}`}
                      />
                      {isHovered && (
                        <div className="close-icon">
                            <CloseIcon onClick={() => remove(product.BookId)} />
                        </div>
                      )}
                    </StyledGridItem>  
                </Grid>
                <Grid item md={6} sx={{display:'flex' , flexDirection:'column' , justifyContent:'space-evenly'}} >
                  <Grid onClick={(e)=>{handleProduct(product.BookId)}}>
                    <Typography sx={{fontWeight:'bold'}}>{product.Title}</Typography>
                  </Grid>
                  <Grid container className='cartCalc2'>
                    <Typography sx={{border:'1px solid grey' , borderRadius:'50%' , width:'25px' , height:'25px'}}>
                      <RemoveIcon
                        sx={{cursor:'pointer'}}
                        onClick={() => {
                          if (product.CartCount > 1) {
                            // setCount(product.CartCount - 1)
                            updateCount(product.BookId , product.CartCount - 1)
                          }else{
                            remove(product.BookId)
                          }
                        }}  
                      />
                    </Typography>
                    <Typography className='typo5' sx={{padding:'0px 10px'}}>{product.CartCount}</Typography>
                    <Typography sx={{border:'1px solid grey' , borderRadius:'50%' , width:'25px' , height:'25px'}}>
                      <AddIcon
                        sx={{cursor:'pointer'}}
                        onClick={() => {
                            updateCount(product.BookId , product.CartCount + 1)
                        }}
                      />
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item md={2.5} sx={{display:'flex' , flexDirection:'column' , justifyContent:'space-evenly'}} onClick={(e)=>{handleProduct(product.BookId)}}>
                  <Typography className='typo5'>{`S$ ${((product.CartCount * product.SellingPrice).toFixed(2))}`}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider sx={{border:'1px solid grey'}}/>
          </>
      )):(
        <>
          <Grid>
            <Grid container justifyContent='center' alignItems='center' sx={{padding:'100px 0'}}>
              <Typography className='typo1' textAlign='center'>Your Cart is empty , Add products !</Typography>
            </Grid>
          </Grid>
        </>
      )}
      </List>
        <ListItem sx={{ display: 'flex',  justifyContent: 'space-between', margin:'10px 0', position: 'sticky', bottom: 0, zIndex: 1, backgroundColor: 'white' }}>
          <Grid container direction='column' spacing={3}>
            <Grid item>
              <Grid container justifyContent='space-between'>
                <Grid item>
                  <Typography className='typo5'>Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography className='typo5'>S$ {subTotal.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <button className='cmn-btn2' onClick={handleCheckout}>Proceed to checkout</button>
            </Grid>
          </Grid>
        </ListItem>
    </Drawer>
  );
};

export default ShoppingCartSidebar;
