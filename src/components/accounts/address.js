import { Grid , Typography , Button} from '@mui/material';
import React , {useState , useEffect} from 'react';
// import './About.css';
import AddAddress from './addAddress';
import AuthCheck from '../Auth/AuthCheck';
import { getAllAddress , removeAddress } from '../../apiCalls';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import DialogTitle from '@mui/material/DialogTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Address(user) {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [addressData , setAddressData] = useState();

  const [open, setOpen] = useState(false);

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(()=>{
    if(user.user && user.user.length){
      getAllAddress(user.user[0])
      .then((data)=>{
        if(data.Data && data.Data.length){
          setAddressData(data.Data);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
    }
  },[user , dialogOpen , open]);

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

  return (
    <>
      <AuthCheck />
      <ToastContainer/>
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
      <Grid container sx={{padding:'30px'}}>
        <Typography className='typo2' sx={{fontWeight:'bold'}}>My Address</Typography>
        <Grid container justifyContent='space-between' sx={{padding:'20px 0px'}}>
        {addressData && addressData.length > 0 && addressData.map((item, index) => (
          <>
            <Grid key={item.DeliveryId} item md={5.8} sx={{border:'1px solid grey' , marginTop:'20px' }}>
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
        <Grid container justifyContent="flex-start">
          <Button className="cmn-btn3" onClick={handleOpenDialog}>Add New</Button>
          <AddAddress open={dialogOpen} handleClose={handleCloseDialog} user={user} />
        </Grid>
      </Grid>
    </>
  );
}

export default Address;
