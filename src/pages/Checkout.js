import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Grid, Typography, Button, Divider } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getAllAddress , removeAddress } from "../apiCalls";
import AddAddress from "../components/accounts/addAddress";
import DeleteIcon from '@mui/icons-material/Delete';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';
import { book } from "../config";
// import { loadStripe } from '@stripe/stripe-js';
import CircularProgress from '@mui/material/CircularProgress';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});




const Checkout = () => {

    // const stripePromise = loadStripe('pk_test_51HPOEBJ42ylRHBRWbALRWPxpYLXOkmOIZn0tCCQ5gDhtHnqmw3F14GdOeOme1gjPYmINhkDx7pe2KibJEtltGzC400jK7kXbcM'); 

    
    const [addressData , setAddressData] = useState();  

    const [dialogOpen, setDialogOpen] = useState(false);

    const [open, setOpen] = useState(false);

    const userData = { user: (JSON.parse(localStorage.getItem('bookUserToken')) || []) };

    
    const [ dataArray , setCartArray ] =  useState({});

    const [subTotal , setSubtotal ] = useState(0);

    const [shipping , setShipping ] = useState(5);

    const [level , setLevel] = useState(1);

    const [selectedDate, setSelectedDate] = useState('');

    const [selectedAddress , setSelectedAddress] = useState();

    const [selectedPayment , setSelectedPayment ] = useState();

    const [boxLoad , setboxload ] = useState(false);



    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
      setValue(event.target.value);
    };



    useEffect(() => {
      setSubtotal(0);

      // localStorage.clear();

    
      const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;
    
      const cartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};
    
      const shopArray = cartArray[storedUserId] || [];
        
      if (shopArray && shopArray.length) {
        let total = 0;
    
        shopArray.forEach((item) => {
          const subtotal = item.CartCount * item.SellingPrice;
          total += subtotal;
        });
    
        setSubtotal(total);
      }
    
      setCartArray(shopArray);
    
    }, []);
    


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
      setDialogOpen(true);
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    const [data , setData] = useState({
      name:'',
      OrgId:'',
      DeliveryId:'',
      CustomerId:'',
    })
  
    const handleClickOpen = (OrgId, DeliveryId, CustomerId, Name) => {
      setOpen(true);
    
      setData((prevData) => ({
        ...prevData,
        name: Name,
        OrgId: OrgId,
        DeliveryId: DeliveryId,
        CustomerId: CustomerId,
      }));
    };
    
    useEffect(()=>{
        const user = (JSON.parse(localStorage.getItem('bookUserToken')) || []);

      if(user && user.length){
        getAllAddress(user[0])
        .then((data)=>{
          if(data.Data && data.Data.length){
            setAddressData(data.Data);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
      }
    },[ dialogOpen , open]);


    const handleRemoveAddress = () => {
        removeAddress(data)
        .then((data)=>{
          if(data.Message === "Sucess"){
            toast.success("Address Removed Successfully");
            handleClose();
          }else{
            toast.error("Address Not Deleted");
          }
        })
        .catch((error)=>{
          toast.error(error)
        })
      }




      const isDateValid = (date) => {
        const today = new Date();
        const selected = new Date(date);
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(today.getDate() + 10);
    
        return selected >= today && selected <= tenDaysFromNow;
      };
    
      const handleDateChange = (event) => {
        const newDate = event.target.value;
    
        if (isDateValid(newDate)) {
          setSelectedDate(newDate);
        } else {
          toast.error('Please select a valid date within the next 10 days.');
        }
      };
    
      const today = new Date().toISOString().split('T')[0];
      const tenDaysFromNow = new Date();
      tenDaysFromNow.setDate(new Date().getDate() + 10);
      const maxDate = tenDaysFromNow.toISOString().split('T')[0];

      const [address , setAddress ] = useState();


      console.log(address , "llllllllllllll")

      const handleAddressSelect = (id , add) => {
        setAddress(add);
        setSelectedAddress(id)
        
      }

      const [openPayment , setPayment ] = useState(false);

      const handlePaymentselect = (id) => {
        setSelectedPayment(id);
        setPayment(true);
      }

      const handleNext = (level) => {
        if(level === 2){
            if(selectedAddress){
                setLevel(2)
            }else{
                toast.error("Please choose any address to continue");
            }
        }else if(level === 3){
            if(selectedDate !== ''){
                setLevel(3)
            }else{
                alert("Please choose delivery date to continue")
            }
        }
      }


      const makePayment = async (preorderData) => {
        setboxload(true);
        const data = [{
          products: preorderData
        }];
      
        try {
        //   const response = await fetch('https://stripe-payment-service.onrender.com/create-checkout-session', {
          const response = await fetch('http://localhost:3001/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
      
          const session = await response.json();
      
          localStorage.setItem('paymentId', session.id);
      
          // const stripe = await stripePromise;
      
          // if (session.sessionId) {
          //   stripe.redirectToCheckout({ sessionId: session.sessionId });
          // } else {
          //   setboxload(false);
          //   toast.error('Some error occurred, please try again later');
          // }
      
        } catch (error) {
          setboxload(false);
          console.error('Error creating Stripe session:', error);
          toast.error("Error creating");
        }
      };

    
      const handleCheckout = async () => {

        if(dataArray && dataArray.length){

            try {
              // const response = await fetch('https://book-app-payment.onrender.com/create-order', {
              //   method: 'POST',
              //   headers: {
              //     'Content-Type': 'application/json'
              //   },
              //   body: JSON.stringify({ dataArray })
              // });
            
              // if (!response.ok) {
              //   throw new Error('Failed to initiate checkout');
              // }
            
              // const data = await response.json();
              // const orderId = data.orderId;
              // setboxload(false)
              // window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;
              
            } catch (err) {
              console.error('Failed to initiate checkout:', err);
              setboxload(false);
            }
          }else{
            toast.error("No products to checkout");
            setboxload(false)
          }
      };

    //   function createOrder(data, actions) {
    //     const totalAmount = getTotalPrice();
    
    //     return actions.order.create({
    //         purchase_units: [{
    //             amount: {
    //                 value: totalAmount.toString(),
    //                 breakdown: {
    //                     item_total: {
    //                         currency_code: "USD",
    //                         value: totalAmount.toString(),
    //                     }
    //                 }
    //             },
    //             items: dataArray.map(item => ({
    //                 name: item.Title,
    //                 quantity: item.CartCount.toString(),
    //                 unit_amount: {
    //                     currency_code: "USD",
    //                     value: item.SellingPrice.toString(),
    //                 },
    //             }))
    //         }]
    //     });    
    // }

    // function onApprove(data, actions) {
    //     return actions.order.capture().then(function(details) {
    //         alert("Transaction completed by " + details.payer.name.given_name);
    //     });
    // }

    // function getTotalPrice() {
    //     return dataArray.reduce((total, item) => total + (item.CartCount * item.SellingPrice), 0);
    // }



   
  //   function createOrder(data, actions) {
  //     const totalAmount = getTotalPrice();
  //     return actions.order.create({
  //         purchase_units: [{
  //             amount: {
  //                 value: totalAmount.toString(),
  //                 currency_code: "SGD",
  //                 breakdown: {
  //                     item_total: {
  //                         currency_code: "SGD",
  //                         value: totalAmount.toString(),
  //                     }
  //                 }
  //             },
  //             items: dataArray.map(item => ({
  //                 name: item.Title,
  //                 quantity: item.CartCount.toString(),
  //                 unit_amount: {
  //                     currency_code: "SGD",
  //                     value: item.SellingPrice.toString(),
  //                 },
  //             })),
  //             shipping: {
  //                 name: {
  //                     full_name: "John Doe"
  //                 },
  //                 address: {
  //                     address_line_1: "123 Shipping St.",
  //                     address_line_2: "Unit 5",
  //                     admin_area_2: "Singapore",
  //                     admin_area_1: "SG",
  //                     postal_code: "12345",
  //                     country_code: "SG"
  //                 }
  //             }
  //         }],
  //         application_context: {
  //             shipping_preference: 'SET_PROVIDED_ADDRESS'
  //         },
  //         intent: 'CAPTURE'
  //     });
  // }

  // function onApprove(data, actions) {
  //     return actions.order.capture().then(function(details) {
  //         alert("Transaction completed by " + details.payer.name.given_name);
  //         // Redirect to success URL
  //         window.location.href = "YOUR_SUCCESS_URL";
  //     });
  // }

  // function onCancel(data) {
  //     // Redirect to failure URL
  //     window.location.href = "YOUR_FAILURE_URL";
  // }

  // function getTotalPrice() {
  //     return dataArray.reduce((total, item) => total + (item.CartCount * item.SellingPrice), 0);
  // }


  function createOrder(data, actions) {
    const totalAmount = getTotalPrice();
    return actions.order.create({
        purchase_units: [{
            amount: {
                value: totalAmount.toString(),
                currency_code: "SGD",
                breakdown: {
                    item_total: {
                        currency_code: "SGD",
                        value: totalAmount.toString(),
                    }
                }
            },
            items: dataArray.map(item => ({
                name: item.Title,
                quantity: item.CartCount.toString(),
                unit_amount: {
                    currency_code: "SGD",
                    value: item.SellingPrice.toString(),
                },
            })),
            shipping: {
                name: {
                    full_name: address.Name
                },
                address: {
                    address_line_1: address.AddressLine1,
                    address_line_2: address.UnitNo + " " + address.AddressLine3,
                    admin_area_2: address.AddressLine3,
                    admin_area_1: "SG",
                    postal_code: address.PostalCode,
                    country_code: "SG"
                }
            }
        }],
        application_context: {
            shipping_preference: 'SET_PROVIDED_ADDRESS'
        },
        intent: 'CAPTURE'
    });
}

function onApprove(data, actions) {
    return actions.order.capture().then(function(details) {
        toast.success("Transaction completed by " + details.payer.name.given_name);
        // Redirect to success URL
        handleOrder()
        window.location.href = "/success";
    });
}

function onCancel(data) {
    // Redirect to failure URL
    window.location.href = "/failed";
}

function getTotalPrice() {
    return dataArray.reduce((total, item) => total + (item.CartCount * item.SellingPrice), 0);
}

      const handleOrder = () => {

      if(dataArray && dataArray.length){

        if (!selectedAddress || !selectedPayment || !selectedDate) {
            alert("Please choose all steps to continue")
        }else{

          setboxload(true)

            const storedUserId = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {}).B2CCustomerId;

            const storedUser = ((JSON.parse(localStorage.getItem('bookUserToken')) || [])[0] || {});

            const cartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};
    
            const shopArray = cartArray[storedUserId] || [];

            let address;

            addressData.forEach((item) => {
                if(item.DeliveryId === selectedAddress){
                    address = item;
                }
                
            });


            const temp = {
                "OrgId": book.OrgId,
                "BrachCode": "",
                "OrderNo": "",
                "MobileNo": book.MobileNo,
                "EmailId": book.EmailId,
                "OrderDate": new Date().toISOString(),
                "CustomerId": storedUserId,
                "CustomerName": storedUser.B2CCustomerName,
                "CustomerAddress": address.AddressLine1 + ' ' + address.FloorNo + ' ' + address.UnitNo + ' ' + address.AddressLine3,
                "PostalCode": address.PostalCode,
                "TaxCode": 1,
                "TaxType": "E",
                "TaxPerc": 0,
                "CurrencyCode": "SGD",
                "CurrencyRate": 1,
                "Total": Number(subTotal.toFixed(2)),
                "BillDiscount": 0,
                "BillDiscountPerc": 0,
                "SubTotal": Number(subTotal.toFixed(2)),
                "Tax": 0,
                "NetTotal": Number((subTotal + shipping).toFixed(2)),
                "PaymentType": 'card',
                "PaidAmount": 0,
                "Remarks": "",
                "IsActive": true,
                "CreatedBy": "admin",
                "CreatedOn": new Date().toISOString(),
                "ChangedBy": "admin",
                "ChangedOn": new Date().toISOString(),
                "Status": 0,
                "CustomerShipToId": "",
                "CustomerShipToAddress": address.AddressLine1 + ' ' + address.FloorNo + ' ' + address.UnitNo + ' ' + address.AddressLine3,
                "Latitude": 0,
                "Longitude": 0,
                "Signatureimage": "",
                "Cameraimage": "",
                "OrderDateString": new Date().toISOString(),
                "CreatedFrom": "",
                "ShippingCost": Number(shipping),
                "url":'bookapp',
                "CustomerEmail": book.EmailId,
                "DeliveryAmount": Number((subTotal + shipping).toFixed(2)),
                "OrderDetail":
                    shopArray.map((item, index) => {
                    return {
                      "OrgId": book.OrgId,
                      "OrderNo": "",
                      "SlNo": index + 1,
                      "ProductCode": item.BookId,
                      "ProductName": item.Title,
                      "Qty": item.CartCount,
                      "Price": Number(item.SellingPrice),
                      "Foc": 0,
                      "Total": Number((item.SellingPrice * item.CartCount).toFixed(2)),
                      "ItemDiscount": 0,
                      "ItemDiscountPerc": 0,
                      "SubTotal": Number(item.SellingPrice * item.CartCount),
                      // "Tax": (item.TaxPerc) / 100 * (item.SellingCost) * (item.CartCount),
                      // "NetTotal": ((item.TaxPerc) / 100 * (item.SellingCost) * (item.CartCount)) + (item.SellingCost) * item.CartCount,
                      "Tax": 0,
                      "NetTotal": Number(item.SellingPrice * item.CartCount),
                      "TaxCode": 1,
                      "TaxType": "E",
                      // "TaxPerc": item.TaxPerc,
                      "TaxPerc":0,
                      "Remarks": "",
                      "CreatedBy": "admin",
                      "CreatedOn": new Date(),
                      "ChangedBy": "admin",
                      "ChangedOn": new Date(),
                      "Weight": 0
                    }
                  })        
              }

              const temp2 = {
                "OrgId": book.OrgId,
                "BranchCode": "",
                "OrderNo": "",
                "MobileNo": book.MobileNo,
                "EmailId": book.EmailId,
                "OrderDate": new Date(),
                "CustomerId": storedUserId ,
                "CustomerName": storedUser.B2CCustomerName,
                "CustomerAddress": address.AddressLine1 + ' ' + address.FloorNo + ' ' + address.UnitNo + ' ' + address.AddressLine3,
                "PostalCode": address.PostalCode,
                "TaxCode": 0,
                "TaxType": "",
                "TaxPerc": 0,
                "CurrencyCode": "SGD",
                "CurrencyRate": 0,
                "Total": subTotal.toFixed(2),
                "BillDiscount": 0,
                "BillDiscountPerc": 0,
                "SubTotal": subTotal.toFixed(2),
                "Tax": 0,
                "NetTotal": Number((subTotal + shipping).toFixed(2)),
                "PaymentType": "card",
                "PaidAmount": 0,
                "Remarks": "string",
                "IsActive": true,
                "CreatedBy": "admin",
                "CreatedOn":new Date(),
                "ChangedBy": "admin",
                "ChangedOn": new Date(),
                "Status": 0,
                "CustomerShipToId": 0,
                "CustomerShipToAddress": address.AddressLine1 + ' ' + address.FloorNo + ' ' + address.UnitNo + ' ' + address.AddressLine3,
                "Latitude": 0,
                "Longitude": 0,
                "Signatureimage": "string",
                "Cameraimage": "string",
                "OrderDateString": new Date(),
                "CreatedFrom": "string",
                "ShippingCost":shipping,
                "CustomerEmail": book.EmailId,
                "OrderDetail": [
                  shopArray.map((item, index) => {
                    return {
                      "OrgId": book.OrgId,
                      "OrderNo": "",
                      "SlNo": index + 1,
                      "ProductCode": item.BookId,
                      "ProductName": item.Title,
                      "Qty": item.CartCount,
                      "Price": item.SellingPrice,
                      "Foc": 0,
                      "Total": (item.SellingPrice * item.CartCount),
                      "ItemDiscount": 0,
                      "ItemDiscountPerc": 0,
                      "SubTotal": item.SellingPrice * item.CartCount,
                      // "Tax": (item.TaxPerc) / 100 * (item.SellingCost) * (item.CartCount),
                      // "NetTotal": ((item.TaxPerc) / 100 * (item.SellingCost) * (item.CartCount)) + (item.SellingCost) * item.CartCount,
                      "Tax": 0,
                      "NetTotal": Number(item.SellingPrice * item.CartCount),
                      "TaxCode": 1,
                      "TaxType": "E",
                      // "TaxPerc": item.TaxPerc,
                      "TaxPerc":0,
                      "Remarks": "",
                      "CreatedBy": "admin",
                      "CreatedOn": new Date(),
                      "ChangedBy": "admin",
                      "ChangedOn": new Date(),
                      "Weight": 0
                    }
                  })  
                ],
                "DeliveryAmount": 0
              }

              const existingOrderDetails = JSON.parse(localStorage.getItem('orderDetails')) || [];
              existingOrderDetails.length = 0; 
              existingOrderDetails.push(temp2);
              localStorage.setItem('orderDetails', JSON.stringify(existingOrderDetails));

              // handleCheckout();
        }

      }else{
        toast.error("No products to checkout")
      }

      }

    return(
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure to delete the address ?"}
                </DialogTitle>
                <DialogActions>
                <Button onClick={handleRemoveAddress} >Agree</Button>
                <Button onClick={handleClose} >
                    Disagree
                </Button>
                </DialogActions>
            </Dialog>
           <Grid>
                <Grid container justifyContent='space-between' sx={{ width: '90%', margin: '0 auto' , padding:'50px 0px'}}>
                    <Grid item xs={12} sm={12}  md={6.5}>
                        <Accordion expanded={level === 1} onChange={(event, isExpanded) => isExpanded && setLevel(1)}>
                            <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{minHeight:'120px'}}
                            >
                            <Typography className="typo6">1</Typography>
                            <Typography className="typo7">Delivery Address</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container justifyContent='space-between' sx={{padding:'20px'}}>
                                    {addressData && addressData.length > 0 && addressData.map((item, index) => (
                                    <>
                                        <Grid key={index} xs={12} md={5.8} mt={2} sx={{ border: selectedAddress === item.DeliveryId ? '2px solid #ff4d04' : '1px solid grey' }} onClick={(e) => handleAddressSelect(item.DeliveryId , item)}>
                                        < DeleteIcon 
                                        sx={{float:'right' , marginTop:'-12px' , marginRight:'-12px' , color:'#ff4d04' , cursor:'pointer'}} 
                                        onClick={(e)=> {handleClickOpen(item.OrgId , item.DeliveryId , item.CustomerId , item.Name)}} />
                                        <Grid container direction='row' sx={{padding:'15px'}} >
                                            <Typography>{item.AddressLine1},</Typography>
                                            <Typography>{item.FloorNo},</Typography><Typography>{item.UnitNo}, </Typography>
                                            <Typography>{item.AddressLine3}</Typography>
                                        </Grid>
                                        </Grid>
                                    </>
                                    )) }
                                </Grid>
                                <Grid container justifyContent="space-between" sx={{padding:'20px'}} >
                                    <Button className="combtn3" onClick={handleOpenDialog}>Add New</Button>
                                    <AddAddress open={dialogOpen} handleClose={handleCloseDialog} user={userData} />
                                    <Button className="combtn3" onClick={(e)=>{handleNext(2)}}>Next Step</Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={level === 2} onChange={(event, isExpanded) => isExpanded && setLevel(2)}>
                            <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                            sx={{minHeight:'120px'}}
                            >
                            <Typography className="typo6">2</Typography>
                            <Typography className="typo7">Delivery Date</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="date-input-container">
                                    <label htmlFor="datePicker">Select Delivery Date:</label>
                                    <input
                                        type="date"
                                        id="datePicker"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        min={today}
                                        max={maxDate}
                                    />
                                    </div>

                                  {/* <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                    <RadioGroup
                                      aria-labelledby="demo-controlled-radio-buttons-group"
                                      name="controlled-radio-buttons-group"
                                      value={value}
                                      onChange={handleChange}
                                    >
                                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                  </FormControl> */}
                                <Grid container justifyContent='flex-end' sx={{padding:'20px'}}>
                                    <Button className="combtn3" onClick={(e)=>{handleNext(3)}}>Next Step</Button>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={level === 3} onChange={(event, isExpanded) => isExpanded && setLevel(3)}>
                            <AccordionSummary
                            expandIcon={<ArrowDropDownIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                            sx={{minHeight:'120px'}}
                            >
                            <Typography className="typo6">3</Typography>
                            <Typography className="typo7">Payment Option</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container sx={{width:'80%' , margin:'0 auto'}}>
                                    <Grid item xs={12} sm={12} md={5.7}>
                                        <Grid onClick={(e)=>{handlePaymentselect(121)}} container justifyContent='space-evenly' alignItems='center' direction='column' sx={{minHeight:'150px' , border: selectedPayment === 121 ? '2px solid #ff4d04' :'3px solid #f3f5f9'}}>
                                            <Grid item>
                                                <Typography>Pay via Paypal</Typography>
                                            </Grid>
                                            <Grid item>
                                                <img src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg" alt="pay" width='210px' />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item md={5.3} className="checkout" sx={{background:'#f5f5f5' , borderRadius:'5px'}} pt={4}>
                        <Grid container direction='column' sx={{width:'90%' , margin:'0 auto' }}>
                            <Grid item>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Product</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Subtotal</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {dataArray && dataArray.length && dataArray.map((item, index) => (
                            <Grid item key={index}>
                                <>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item xs={3} sm={3} md={2} sx={{display:'flex' , alignItems:'center' , justifyContent:'flex-start'}}>
                                        <img style={{border:'1px solid grey' , borderRadius:'2px' , maxWidth:'70px'}} src={item.BookImage || 'https://www.basheergraphic.com/cdn/shop/t/1/assets/logo.png?v=162072033459672328741473575341' } alt='a1' />
                                    </Grid>
                                    <Grid item xs={6} sm={5} md={7.7} sx={{display:'flex' , alignItems:'center' , justifyContent:'flex-start'}}>
                                        <Typography>{item.Title}</Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={3} md={2.3} sx={{display:'flex' , alignItems:'center' , justifyContent:'flex-end'}}>
                                        <Typography sx={{ fontWeight: 'bold' }}>S$ {(item.CartCount * item.SellingPrice).toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                                <Divider sx={{border:'1px solid grey'}} />
        
                                </>
                            </Grid>
                            ))}
                            <Grid item sx={{padding:'1px 0'}}>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Subtotal</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography >S$ {subTotal.toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{padding:'1px 0'}}>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Shipping</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography > S$ {shipping.toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{padding:'1px 0'}}>
                                <Grid container justifyContent='space-between' sx={{padding:'10px 0px'}}>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}}>Total</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography sx={{fontWeight:'bold'}} >S$ {(subTotal + shipping).toFixed(2)}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item sx={{padding:'10px 0'}}>
                                {/* <button  className='cmn-btn2' style={{background:'F65D4E'}} onClick={handleOrder} >{boxLoad ? <CircularProgress sx={{color:'white'}} /> : "Order Now"}</button> */}
                                {/* <PayPalScriptProvider options={{ 
                                    clientId: "ARczUVWk1e-x6ejyg0HiZpTzhHrUOkwEFl5bEN603Re_g29aKHtH9QTc7OICazEmdXh0nAg-RSiIuCED",
                                    currency: "SGD",
                                }}>
                                    <PayPalButtons
                                        createOrder={(data, actions) => createOrder(data, actions)}
                                        onApprove={(data, actions) => onApprove(data, actions)}
                                    />
                                </PayPalScriptProvider> */}

                              {openPayment ? ( 
                                <>
                                  <PayPalScriptProvider options={{ 
                                        clientId: "ARczUVWk1e-x6ejyg0HiZpTzhHrUOkwEFl5bEN603Re_g29aKHtH9QTc7OICazEmdXh0nAg-RSiIuCED",
                                        currency: "SGD",
                                    }}>
                                          <PayPalButtons
                                            createOrder={(data, actions) => createOrder(data, actions)}
                                            onApprove={(data, actions) => onApprove(data, actions)}
                                            onCancel={(data) => onCancel(data)}
                                            style={{ layout: 'vertical' }}
                                        />
                                    </PayPalScriptProvider>
                                </>
                              ) : ( 
                                <>
                                  <h1>Please select payment options</h1>
                                </>
                              ) }

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
           </Grid>
        </>
    )
}

export default Checkout;