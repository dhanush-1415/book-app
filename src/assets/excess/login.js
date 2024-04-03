// AlertDialogSlide.js

import  React , {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Grid , Typography , TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import './login.css'
import Signin from './signin';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Login({ open, handleClose }) {

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    handleClose()
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  return (
    <>
    <Signin open={dialogOpen} handleClose={handleCloseDialog} />
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md" 
      >
        <DialogContent sx={{border:'5px solid #ff4d04'}} >
        <Grid container direction="row">
            <Grid item md={6}>
              <img
                src="https://borobazar.vercel.app/_next/image?url=%2Fassets%2Fimages%2Flogin.png&w=1920&q=75"
                width="100%"
              />
            </Grid>
            <Grid item md={6}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                textAlign="center"
                gap={2.5}
                sx={{padding:'20px 30px'}}
              >
                <Grid item>
                  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Welcome Back!
                  </Typography>
                </Grid>
                <Grid item>
                  <span>Don’t have an account? </span>
                  <span style={{ color: '#ff4d04', fontWeight: 'bold' }}
                  onClick={handleOpenDialog}
                  >
                    Create Account
                  </span>
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    fullWidth // Set full width
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    fullWidth // Set full width
                  />
                </Grid>
                <Grid item>
                  <Typography  textAlign='right'>Forgot Password?</Typography>
                </Grid>
                <Grid item md={12}>
                  <Button className='authbtn' sx={{color:'white'}}>Sign In</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
    </>
  );
}
