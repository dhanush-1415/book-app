import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, styled } from "@mui/material";
import { createCustomerOrder } from "../apiCalls";
import { toast } from "react-toastify";

const StyledTableHead = styled(TableHead)({
    backgroundColor: "#ff4d04",
    color:'white',
    fontWeight:'bold',
  });
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.mode === "light" ? "#f5f5f5" : "#424242", 
    },
  }));
  
  const StyledTableCell = styled(TableCell)({
    color: 'black',
  });

const Success = () => {

    const [orderData , setOrderData] = useState();

    const [productData , setProducts] = useState();

    const createOrder = (data) => {

        createCustomerOrder(data)
        .then((data)=>{
          if(data.Message === 'Sucess'){
            toast.success("Order placed successfully")
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }

  useEffect(() => {

      const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [] ;

      const cartArray = JSON.parse(localStorage.getItem('makanUserCart')) || {};

      const storedUserId = ((JSON.parse(localStorage.getItem('makanUserToken')) || [])[0] || {}).B2CCustomerId;


      if (orderDetails && orderDetails.length) {
        setOrderData(orderDetails);
        createOrder(orderDetails[0]);
        setProducts(orderDetails[0].OrderDetail)
        if(orderDetails[0].BrachCode === "MATE"){
            const mateArray = cartArray[storedUserId]['MATE'];
            mateArray.length = 0 ;
        }else if(orderDetails[0].BrachCode === "MART"){
            const martArray = cartArray[storedUserId]['MART'];
            martArray.length = 0 ;
        }

        localStorage.setItem('makanUserCart', JSON.stringify(cartArray));

      } else {
        console.log("No data found in localStorage");
      }
   
  }, []); 


    const handleHomepage = () => {

        window.location.href='/';
    }  

  return (
    <>
      <Grid sx={{width:'70%' ,margin:'100px auto'}}>
        <Grid item  sx={{margin:'50px 0'}}>
            <Grid container sx={{background:'#f8f9fb' , borderRadius:'5px' , padding:'25px' , border:'1px slid grey'}}>
                <DoneIcon sx={{background:'#02b290' , padding:'5px' , margin:'0px 10px' , borderRadius:'50%' , color:'white'}} /><Typography>Thank you. Your order has been received.</Typography>
            </Grid>
        </Grid>
        <Grid item sx={{margin:'50px 0'}}>
            <Grid >
                <Typography sx={{fontSize:'25px' , fontWeight:'bold' , padding:'20px 0'}}>Order Details</Typography>
            </Grid>
            <Grid container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <StyledTableHead>
                        <TableRow>
                            <StyledTableCell sx={{color:'white' , fontWeight:'bold'}}>Product</StyledTableCell>
                            <StyledTableCell sx={{color:'white' , fontWeight:'bold'}}>Quantity</StyledTableCell>
                            <StyledTableCell sx={{color:'white' , fontWeight:'bold'}}>Price</StyledTableCell>
                        </TableRow>
                        </StyledTableHead>
                        <TableBody>
                        {productData && productData.length && productData.map((row, index) => (
                            <StyledTableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <StyledTableCell component="th" scope="row">
                                {row.ProductName}
                            </StyledTableCell>
                            <StyledTableCell>{row.Qty}</StyledTableCell>
                            <StyledTableCell>{row.Total}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
        <Grid item>
            <Grid container justifyContent='flex-end' spacing={3}>
                <Grid item>
                    <Typography sx={{padding:'5px 0'}}>Subtotal</Typography>
                    <Typography sx={{padding:'5px 0'}}>Shipping</Typography>
                    <Typography sx={{padding:'5px 0'}}>Total</Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{fontWeight:'bold' , textAlign:'right' , padding:'5px 0'}}>S$ {orderData && orderData.length && orderData[0].SubTotal}</Typography>
                    <Typography sx={{fontWeight:'bold' , textAlign:'right' , padding:'5px 0'}}>S$ {orderData && orderData.length && orderData[0].ShippingCost.toFixed(2)}</Typography>
                    <Typography sx={{fontWeight:'bold' , textAlign:'right' , padding:'5px 0'}}>S$ {orderData && orderData.length && orderData[0].NetTotal}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid>
            <button className="combtn" onClick={handleHomepage}>Return to homepage</button>
        </Grid>
      </Grid>
    </>
  );
};

export default Success;
