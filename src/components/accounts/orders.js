import React, {useEffect, useState} from 'react';
import { Grid, TextField, Typography ,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
// import OrderDetails from './orderDetails';
// import { getAllOrders } from '../../apiCalls';
import './common.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f65d4e',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Orders(user) {

  const [orderData, setOrderData] = useState([]);

  // useEffect(()=>{
  //   if(user.user && user.user.length){
  //     getAllOrders(user.user[0])
  //     .then((data)=>{
  //       if(data.Data && data.Data.length){
  //         setOrderData(data.Data);
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  //   }
  // },[user , orderData]);



  const [isOrderDetailSidebarOpen, setOrderDetailSidebarOpen] = useState(false);

  const toggleOrderDetailSidebar = () => {
    setOrderDetailSidebarOpen(!isOrderDetailSidebarOpen);
  };


  return (
    <>
      <Grid container sx={{padding:'30px'}}>
        <Typography className='typo2' sx={{fontWeight:'bold'}}>My Orders</Typography>
        <Grid container justifyContent="space-between" sx={{padding:'30px 0px'}}>
          <TableContainer component={Paper} sx={{ maxHeight: 540 }}>
            <Table stickyHeader  aria-label="customized table">
              <TableHead>
                <TableRow >
                  <StyledTableCell>Order Id</StyledTableCell>
                  <StyledTableCell>Order Date</StyledTableCell>
                  <StyledTableCell>Order Status</StyledTableCell>
                  <StyledTableCell>Order Total</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData && orderData.length && orderData.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {row.OrderNo}
                    </StyledTableCell>
                    <StyledTableCell>{row.OrderDateString}</StyledTableCell>
                    <StyledTableCell>{row.Status}</StyledTableCell>
                    <StyledTableCell>{row.NetTotal}</StyledTableCell>
                    <StyledTableCell>
                      <Grid>
                      {/* <button onClick={toggleOrderDetailSidebar}>View</button> */}
                      <button>View</button>
                      {/* <OrderDetails isOpen={isOrderDetailSidebarOpen} onClose={toggleOrderDetailSidebar} /> */}
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
     
      </Grid>
    </>
  );
}

export default Orders;
