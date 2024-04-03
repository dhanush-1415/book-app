// FavoriteSidebar.js
import React , {useState} from 'react';
import { Drawer, List, ListItem, Typography, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import styled from 'styled-components';


const StyledGridItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  border: 1px solid grey;
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

const FavoriteSidebar = ({ data , isOpen, onClose , remove }) => {


  const [isHovered, setIsHovered] = useState(false);


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
        },
      }}
    >
      <List>
      <ListItem sx={{ display: 'flex', justifyContent: 'space-between', margin:'10px 0', position: 'sticky', top: 0, zIndex: 1, backgroundColor: 'white' }}>
          <Typography className="bold-text" sx={{fontSize:'22px'}}>Wishlist </Typography> <CloseIcon onClick={onClose} sx={{cursor:'pointer'}} />
        </ListItem>
        <Divider sx={{border:'1px solid grey'}}/>
        {data && data.length > 0 ? data.map((product, index) => (
          <>
            <ListItem key={index}>
              <Grid container justifyContent='space-between' sx={{minHeight:'100px'}}>
                {/* <Grid item md={3} sx={{display:'flex' , alignItems:'center' , justifyContent:'center'}}>
                  <img src={product.ProductImagePath || 'https://makanmate.com/wp-content/uploads/2022/09/logo.png'} alt={`product-${index}`} style={{maxWidth:'100px' , maxHeight:'100px'}} />
                </Grid> */}
                <Grid item md={3} sx={{display:'flex' , justifyContent:'center' , alignItems:'center'}}>

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
                            <CloseIcon onClick={() => remove(product.ProductCode)} />
                        </div>
                      )}
                    </StyledGridItem>
                </Grid>
                <Grid item md={6} sx={{display:'flex' , flexDirection:'column' , justifyContent:'space-evenly'}}>
                  <Grid>
                    <Typography sx={{fontWeight:'bold'}} onClick={(e)=>{handleProduct(product.ProductCode)}}>{product.ProductName}</Typography>
                  </Grid>
                  {/* <Grid container className='cartCalc2'>
                    <Typography sx={{border:'1px solid grey' , borderRadius:'50%'}}><AddIcon /></Typography>
                    <Typography className='typo5' sx={{padding:'0px 10px'}}>{product.CartCount}</Typography>
                    <Typography sx={{border:'1px solid grey' , borderRadius:'50%'}}><RemoveIcon /></Typography>
                  </Grid> */}
                </Grid>
                <Grid item md={2.5} sx={{display:'flex' , flexDirection:'column' , justifyContent:'space-evenly'}}>
                  <Typography className='typo5' onClick={(e)=>{handleProduct(product.ProductCode)}}>S$ {product.SellingCost || '-'}</Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider sx={{border:'1px solid grey'}}/>
          </>
      )):(
        <>
        <Grid>
          <Grid container justifyContent='center' alignItems='center' sx={{padding:'100px 0'}}>
            <Typography className='typo1' textAlign='center'>Your Wishlist is empty , Add products !</Typography>
          </Grid>
        </Grid>
      </>
      )}
      </List>
    </Drawer>
  );
};

export default FavoriteSidebar;
