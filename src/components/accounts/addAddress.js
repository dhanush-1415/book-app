import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {  Grid, Button, TextField } from '@mui/material';
import { getPostalAddress } from '../../apiCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { saveNewAddress } from '../../apiCalls';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddAddress({ open, handleClose, user }) {

  const [postalfetch , setPostalFetch ] = useState("Fetch");
  const [savebtn , setSaveBtn] = useState("Save Address");
  const [address, setAddress] = useState({
    OrgId: 0,
    DeliveryId: 0,
    CustomerId: '',
    Name: '',
    AddressLine1: '',
    AddressLine2: '',
    AddressLine3: '',
    CountryId: '',
    PostalCode: '',
    Mobile: '',
    Phone: '',
    Fax: '',
    IsDefault: true,
    IsActive: true,
    CreatedBy: '',
    CreatedOn: '2024-01-04T16:35:33.286Z',
    ChangedBy: '',
    ChangedOn: new Date(),
    FloorNo: '',
    UnitNo: '',
  });
  
  useEffect(()=>{
    if(user.user && user.user.length){
      const data = user.user[0];
      setAddress((prevAddress) => ({
        ...prevAddress,
        OrgId: data.OrgId,
        CustomerId: data.B2CCustomerId,
        Name: data.B2CCustomerName,
        CountryId: data.CountryId,
        Mobile: data.MobileNo,
        CreatedBy: data.CreatedBy,
        ChangedBy: data.CreatedBy,
        CreatedOn:data.CreatedOn,
      }));
    }

  },[user])

  const handleChange = (property) => (event) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [property]: event.target.value,
    }));
  };


  const getAddress = async () => {
    const isValidPostalCode = /^\d{6}$/.test(address.PostalCode);
    
    if (!isValidPostalCode) {
      toast.error("Please enter a valid postal code");
    } else {
        setPostalFetch(<CircularProgress sx={{color:'white'}} size='1.5rem' />)
        getPostalAddress(address.PostalCode)
        .then((data) => {
          if(data.results && data.results.length){
            let addressLine1 = `${data.results[0].BLK_NO} ${data.results[0].ROAD_NAME}`;
            let addressLine3 = data.results[0].BUILDING !== 'NIL' ? `${data.results[0].BUILDING}, SINGAPORE ${address.PostalCode}` : `SINGAPORE ${address.PostalCode}`;
            setAddress(prevAddressData => ({
              ...prevAddressData,
              AddressLine1: addressLine1,
              AddressLine3: addressLine3
            }));
            setPostalFetch("Fetch");
          }else{
            setPostalFetch("Fetch")
            toast.error("Cannot find the addess");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  }

  const handleSaveAddress = () => {
    if (
      address.AddressLine1.trim() === '' ||
      address.AddressLine3.trim() === '' ||
      address.FloorNo.trim() === '' ||
      address.UnitNo.trim() === '' ||
      address.PostalCode.trim() === '' ||
      address.CustomerId.trim() === ''
    ) {
      toast.error('Required fields are empty');
      return;
    }else{
      setSaveBtn(<CircularProgress sx={{color:'white'}} size='1.5rem' />)
        saveNewAddress(address)
        .then((data) => {
          if(data.Message ===  'Sucess'){
            toast.success("Successfully added address");
            setAddress({
              OrgId: 0,
              DeliveryId: 0,
              CustomerId: '',
              Name: '',
              AddressLine1: '',
              AddressLine2: '',
              AddressLine3: '',
              CountryId: '',
              PostalCode: '',
              Mobile: '',
              Phone: '',
              Fax: '',
              IsDefault: true,
              IsActive: true,
              CreatedBy: '',
              CreatedOn: '2024-01-04T16:35:33.286Z',
              ChangedBy: '',
              ChangedOn: new Date(),
              FloorNo: '',
              UnitNo: '',
            })
            handleClose();
            setSaveBtn("Save Address")
          }else{
            toast.error("Cannot add the addess");
            setSaveBtn("Save Address")
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  

  return (
    <React.Fragment>
      <ToastContainer/>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }} id="alert-dialog-title">
          {"Add Address"}
        </DialogTitle>
        <DialogContent sx={{ minWidth: '500px' }}>
          <Grid>
            <Grid container justifyContent="space-between" sx={{ marginTop: '10px' }}>
              <Grid item md={7}>
                <TextField
                  id="outlined-basic"
                  label="PostalCode"
                  variant="outlined"
                  fullWidth
                  value={address.PostalCode}
                  onChange={handleChange('PostalCode')}
                />
              </Grid>
              <Grid item md={4}>
                <Button className='cmn-btn4' onClick={getAddress}>{postalfetch}</Button>
              </Grid>
            </Grid>
            <Grid container gap={2} sx={{ marginTop: '16px' }}>
              <Grid item md={12}>
                <TextField
                  id="outlined-basic"
                  label="AddressLine1"
                  variant="outlined"
                  fullWidth
                  value={address.AddressLine1}
                  onChange={handleChange('AddressLine1')}
                />
              </Grid>
              <Grid item md={12}>
                <Grid container justifyContent='space-between'>
                  <Grid item md={5.5}>
                    <TextField
                      id="outlined-basic"
                      label="FloorNo"
                      variant="outlined"
                      fullWidth
                      value={address.FloorNo}
                      onChange={handleChange('FloorNo')}
                    />
                  </Grid>
                  <Grid item md={5.5}>
                    <TextField
                      id="outlined-basic"
                      label="UnitNo"
                      variant="outlined"
                      fullWidth
                      value={address.UnitNo}
                      onChange={handleChange('UnitNo')}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <TextField
                  id="outlined-basic"
                  label="AddressLine3"
                  variant="outlined"
                  fullWidth
                  value={address.AddressLine3}
                  onChange={handleChange('AddressLine3')}
                />
              </Grid>
            </Grid>
            <Grid item md={6} sx={{ marginTop: '16px' }}>
              <Button className='cmn-btn4' onClick={handleSaveAddress}>
                {savebtn}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
