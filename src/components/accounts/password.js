import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button , FormHelperText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AuthCheck from '../Auth/AuthCheck';
import './common.css';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { changePassword } from '../../apiCalls';


function Password({ user }) {
  const [oldPass, setOldPass] = useState('');
  const [custId , setCustId ] = useState('');
  const [email , setEmail ] = useState('');
  const [org , setOrg ] = useState('');
  const [passbtn , setPassbtn] = useState("Submit")

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [formErrors, setFormErrors] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const handleChange = (passwordType, value) => {
    setPasswords((prevPasswords) => ({ ...prevPasswords, [passwordType]: value }));
  };

  const handleShowPassword = (passwordType) => {
    setShowPasswords((prevShowPasswords) => ({
      ...prevShowPasswords,
      [passwordType]: !prevShowPasswords[passwordType],
    }));
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  useEffect(() => {
    if (user && user.length) {
      setOldPass(user[0].Password);
      setCustId(user[0].B2CCustomerId);
      setEmail(user[0].EmailId);
      setOrg(user[0].OrgId);
    }
  }, [user]);

  useEffect(() => {
    const validatePassword = (input, regex, passwordType, errorMessage) => {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [passwordType]: input.trim() === '' || regex.test(input) ? '' : errorMessage,
      }));
    };

    // Validation for the new password
    validatePassword(
      passwords.new,
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'new',
      'Invalid new password'
    );

    // Validation for the confirm password
    validatePassword(
      passwords.confirm,
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'confirm',
      'Invalid confirm password'
    );
  }, [passwords]);

  const handleSubmit = () => {
    if (!(passwords.current === '' || passwords.new === '' || passwords.confirm === '')) {
      if (oldPass === passwords.current) {
        if (!(passwords.new === '' || passwords.confirm === '') && passwords.new === passwords.confirm) {
          if(oldPass === passwords.confirm){
            toast.error("Old and nwe password cannot be same")
          }else{
            setPassbtn(<CircularProgress sx={{color:'white'}} size='1.5rem' />)
              const data = {
                "OrgId": org,
                "B2CCustomerId": custId,
                "EmailId": email,
                "Password": passwords.confirm
              }
              changePassword(data)
              .then((data)=>{
                if(data.Message === 'Sucess'){
                  toast.success("Password changed successfully");
                  setPasswords({
                    current: '',
                    new: '',
                    confirm: '',
                  })
                  setPassbtn("Submit")
                }
              })
              .catch((error)=>{
                toast.error("Password not changes");
                console.error(error)
                setPassbtn("Submit")
              })
            
          }
        } else {
          toast.error("New and confirm passwords are not the same");
        }
      } else {
        toast.error('Current password is wrong');
      }
    } else {
      toast.error('Please fill all inputs');
    }
  };
  
  
  

  return (
    <>
      <AuthCheck />
      <ToastContainer />
      <Grid container sx={{ padding: '30px' }}>
        <Typography className='typo2' sx={{ fontWeight: 'bold' }}>Change Password</Typography>
        <Grid container justifyContent="space-between" sx={{ padding: '30px 0px' }}>
          <Grid md={3.9}>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-current-password">Current Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-current-password"
                type={showPasswords.current ? 'text' : 'password'}
                value={passwords.current}
                onChange={(e) => handleChange('current', e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword('current')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswords.current ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Current Password"
              />
            </FormControl>
          </Grid>
          <Grid md={3.9}>
            <FormControl variant="outlined" error={Boolean(formErrors.new)}>
              <InputLabel htmlFor="outlined-adornment-new-password">New Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-new-password"
                type={showPasswords.new ? 'text' : 'password'}
                value={passwords.new}
                onChange={(e) => handleChange('new', e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword('new')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswords.new ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="New Password"
              />
            <FormHelperText>{formErrors.new}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid md={3.9}>
            <FormControl variant="outlined" error={Boolean(formErrors.confirm)}>
              <InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-confirm-password"
                type={showPasswords.confirm ? 'text' : 'password'}
                value={passwords.confirm}
                onChange={(e) => handleChange('confirm', e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => handleShowPassword('confirm')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPasswords.confirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              <FormHelperText>{formErrors.confirm}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Button className="cmn-btn3" onClick={handleSubmit} disabled={formErrors.new || formErrors.confirm}>
            {passbtn}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Password;
