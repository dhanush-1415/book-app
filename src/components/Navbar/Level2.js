import React , {useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { TextField, MenuItem, Select, FormControl } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getBusinessCategoriesData } from '../../apiCalls';

const styles = {
    root: {
      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
      '&.Mui-focused .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
  };

const L2Header = ({activeCard}) => {

const [category, setCategory] = useState('');

const [categoryData , setCategoryData ] = useState();



useEffect(() => {
    getBusinessCategoriesData()
      .then((Response) => {
        if(Response.Message === "Sucess"){
            setCategoryData(Response.Data);
        }else{

        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

const handleCategoryChange = (event) => {
  setCategory(event.target.value);
};

    return(

        <>
        <Grid sx={{width:'90%' , margin:'30px auto'}}>
            <Grid container justifyContent='space-between' >
                <Grid item xs={12} sm={12} md={3}>
                    <FormControl variant="outlined" fullWidth>
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                            sx={{background:'#2e6ed5' , color:'white'}}
                        >
                            <MenuItem value="">
                                <Typography sx={{fontWeight:'bold' }}>All categories</Typography>
                            </MenuItem>
                        </Select>
                    </FormControl>

                </Grid>
                <Grid item xs={12} sm={12} md={7} sx={{border:'3px solid #2e6ed5' , display:'flex'}}>
                    <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth>
                        <Select
                            value={category}
                            onChange={handleCategoryChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">
                                <Typography sx={{fontWeight:'bold' , textTransform:'uppercase'}}>All categories</Typography>
                            </MenuItem>
                            {categoryData && categoryData.length && categoryData.map((item, index) => (
                                item.IsActive ? (
                                    <MenuItem key={index} value={item.BusinessCategoryName}>
                                        <Typography sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{item.BusinessCategoryName}</Typography>
                                    </MenuItem>
                                ) : null
                            ))}
                        </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6.8}>
                        <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter your search key..."
                        className={styles}
                        />
                    </Grid>
                    <Grid item xs={12} sm={1.2} sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , background:'#2e6ed5' , color:'white'}}>
                        <SearchIcon sx={{fontWeight:'bold'}} />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={1.2} sx={{display:'flex' , justifyContent:'center' , alignItems:'center' , flexDirection:'column'}}>
                    <Grid item>
                        <ShoppingCartIcon />
                    </Grid>
                    <Grid item>
                        <Typography>Shopping Cart</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}

export default L2Header;