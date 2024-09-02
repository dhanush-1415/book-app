import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Grid, Typography, TextField , FormHelperText } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContet';
import { sendOTP , verifyEmailOtp , UserbyEmail , registerUser , UserLogin , getPostalAddress} from '../../apiCalls';
import './auth.css';
import { book } from '../../config';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export let tokenUpdateCallback = false;

export const clear = () => {
  tokenUpdateCallback = false;
}


export default function Login() {
  const [isFirstDialogOpen, setFirstDialogOpen] = useState(false);
  const [isSecondDialogOpen, setSecondDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [verifyOtp , setVerifyOtp] = useState('Verify');
  const [registerOtp, setRegisterOtp] = useState(''); 
  const [otpCol , setOtpCol] = useState(false);
  const [verifyDisable , setverifyDisable] = useState(false);
  const [otpDisable , setOtpDisable ] = useState(false);
  const [emailVerified , setEmailVerified] = useState(false);
  const [regBtn , setRegBtn ] = useState('Register');
  const [regDisable , setRegDisable] = useState(false);
  const [logBtn , setLogBtn ] = useState("Sign In");
  const [loginDisable , setLoginDisable] = useState(false);
  const [postalfetch , setPostalFetch ] = useState("Fetch");
  const { setLoggedIn } = useAuth();


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

//   useEffect(() => {
//     setFirstDialogOpen(open);
//   }, [open]);

  const handleSignInNow = () => {
    setFirstDialogOpen(false);

    setTimeout(() => {
      setSecondDialogOpen(true);
    }, 200);
  };

  const handleOpenDialog = () => {
    setSecondDialogOpen(false);

    setTimeout(() => {
      setFirstDialogOpen(true);
    }, 200);
  };


  const [loginData , setLoginData ]= useState({
    "Username": "",
    "Password": "",
    "OrgId": book.OrgId,
    "BranchCode": "HQ"
  })


  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [id]: value,
    }));
  };



  const [loginErrors, setLoginErrors] = useState({
    Username: '',
  });


  useEffect(() => {
    const validateInput = (input, regex, errorMessage) => {
      return input.trim() === '' || regex.test(input);
    };

    const isValidEmail = validateInput(
      loginData.Username,
      /\S+@\S+\.\S+/,
      'Invalid email'
    );

    setLoginErrors((prevErrors) => ({
      ...prevErrors,
      Username: isValidEmail ? '' : 'Invalid email',
    }));
  }, [loginData.Username]);


  const handleLogin = async () => {
    if (loginData.Username === "" || loginData.Password === "") {
      toast.error("Please Fill all Inputs")
    }else{
      if (loginErrors.Username === "") {

        setLogBtn(<CircularProgress sx={{color:'white'}} size='2rem' />)
        setLoginDisable(true);
        const data = {
          email : loginData.Username,
          orgID : loginData.OrgId,
        }

        const user = await UserbyEmail(data);
        if(user.Message === "Sucess"){
          if(user.Data[0].EmailId !== null){

            const response = await UserLogin(loginData);

            if(response.Status === true) {
              setLogBtn("Sign In");
              setLoginDisable(false);
              toast.success("Successfully Logged in", {
                autoClose: 2000, 
              });
              setLoginData({
                "Username": "",
                "Password": "",
                "OrgId": book.OrgId,
                "BranchCode": "HQ"
              })

              const userId = response.Data[0].B2CCustomerId;



              let cartArray = JSON.parse(localStorage.getItem('bookUserCart')) || {};

              if (!cartArray[userId]) {
                cartArray[userId] = [];

                localStorage.setItem('bookUserCart', JSON.stringify(cartArray));
              }

              localStorage.setItem('bookUserToken', JSON.stringify(response.Data));

              setLoggedIn();


              setTimeout(() => {
                window.location.href = '/'
              }, 1000);
              
            }
            else{
              toast.error(response.Message);
              setLogBtn("Sign In");
              setLoginDisable(false);
            }

          }else{
            toast.error("Email not registered");
            setLogBtn("Sign In")
            setLoginDisable(false);
          }
        }else{
          setLogBtn("Sign In");
          setLoginDisable(false);
          toast.error("Failed to fetch user");
        }
    
      }else{
        toast.error("Please enter a valid email")
      }
    }
  }




  const [signupdata , setsignupdata] = useState(
    {
      "OrgId": book.OrgId,
      "BranchCode": "",
      "B2CCustomerId": "",
      "B2CCustomerName": "",
      "EmailId": "",
      "Password": "",
      "AddressLine1": "",
      "AddressLine2": "",
      "AddressLine3": "",
      "MobileNo": "+65",
      "CountryId": "IND",
      "PostalCode": "",
      "IsActive": true,
      "IsApproved": true,
      "CreatedBy": "user",
      "CreatedOn": new Date(),
      "ChangedBy": "user",
      "ChangedOn": new Date(),
      "FloorNo": "",
      "UnitNo": ""
    }
  );


  const [otpErrors, setOtpErrors] = useState({
    regOtp: '',
  });

  const [formErrors, setFormErrors] = useState({
    B2CCustomerName: '',
    EmailId: '',
    Password: '',
    PostalCode: '',
  });

 
  useEffect(() => {
    const validateInput = (input, regex, errorMessage) => {
      return input.trim() === '' || regex.test(input);
    };
  
    const isValidName = validateInput(
      signupdata.B2CCustomerName,
      /^[a-zA-Z ]{3,30}$/,
      'Invalid name'
    );
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      B2CCustomerName: isValidName ? '' : 'Invalid name',
    }));
  
    const isValidEmail = validateInput(
      signupdata.EmailId,
      /\S+@\S+\.\S+/,
      'Invalid email'
    );
    setFormErrors((prevErrors) => ({ ...prevErrors, EmailId: isValidEmail ? '' : 'Invalid email' }));
  
    const isValidPassword = validateInput(
      signupdata.Password,
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Invalid password'
    );
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      Password: isValidPassword ? '' : 'Invalid password',
    }));
  
    const isValidPostalCode = validateInput(
      signupdata.PostalCode,
      /^\d{6}$/,
      'Invalid postal code'
    );
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      PostalCode: isValidPostalCode ? '' : 'Invalid postal code',
    }));
  }, [signupdata]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsignupdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAddress = async () => {
    const isValidPostalCode = /^\d{6}$/.test(signupdata.PostalCode);
    
    if (!isValidPostalCode) {
      toast.error("Please enter a valid postal code");
    } else {
        setPostalFetch(<CircularProgress sx={{color:'white'}} size='1.5rem' />)
        getPostalAddress(signupdata.PostalCode)
        .then((data) => {
          if(data.results && data.results.length){
            let addressLine1 = `${data.results[0].BLK_NO} ${data.results[0].ROAD_NAME}`;
            let addressLine3 = data.results[0].BUILDING !== 'NIL' ? `${data.results[0].BUILDING}, SINGAPORE ${signupdata.PostalCode}` : `SINGAPORE ${signupdata.PostalCode}`;
            setsignupdata(prevSignupData => ({
              ...prevSignupData,
              AddressLine1: addressLine1,
              AddressLine3: addressLine3
            }));
            setPostalFetch("Fetch")
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
  

  function startCountdown(seconds) {
    let countdown = seconds;

    const countdownInterval = setInterval(() => {
      countdown--;

      if (countdown > 0) {
        setVerifyOtp(countdown);
      } else {
        clearInterval(countdownInterval);
        setVerifyOtp('Resend');
        setOtpDisable(false);
      }
    }, 1000);
  }

  const handleRegisterSendOtp = async () => {
    try {

      if (!formErrors.EmailId) {
      setVerifyOtp(<CircularProgress sx={{color:'white'}} size='1.5rem' />);
      const data = {
        orgID: signupdata.OrgId,
        email: signupdata.EmailId,
      };
      
      const user = await UserbyEmail(data);

      if(user.Message === "Sucess"){
          if(user.Data[0].EmailId === null){
            const response = await sendOTP(data);

            if (response.Message === 'Sucess') {
               localStorage.setItem('otpData', response.Data);
               setOtpCol(true);
               toast.success('OTP sent successfully');
               setOtpDisable(true);
               startCountdown(30);
             } else {
               toast.error('Failed to send OTP')
             }
          }else{
            toast.error('User Email already registered');
            setVerifyOtp("Verify");
          }
      }
    }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };


  const handleSubmitOtp = async () => {
    const otpData = localStorage.getItem('otpData');
  
    try {
      if (otpData === registerOtp) {
        const data = {
          "OrgId": book.OrgId,
          "Email": signupdata.EmailId,
          "OTP": registerOtp
        };
  
        const response = await verifyEmailOtp(data);  
        if (response.Status === true) {
          setVerifyOtp('Verified');
          setOtpCol(false);
          setverifyDisable(true);
          toast.success('OTP Verified successfully');
          setEmailVerified(true)
        } else {
          toast.error('Failed to Verify OTP');
        }
      } else {
        setOtpErrors({
          ...otpErrors,
          regOtp: 'Invalid OTP',
        });
      }
    } catch (error) {
      console.error('Error Verifying OTP:', error);
    }
  };

  const handleRegister = async () => {
    const inputFieldNames = ["B2CCustomerName", "EmailId", "Password", "AddressLine1", "AddressLine3", "MobileNo", "PostalCode", "FloorNo", "UnitNo"];
  
    const hasFormErrors = Object.values(formErrors).some((error) => error !== '');
  
    const isFormValid = inputFieldNames.every(
      (fieldName) => signupdata[fieldName].trim() !== '' && !formErrors[fieldName]
    );
    
    if(emailVerified){
      if (isFormValid && !hasFormErrors) {
        setRegBtn(<CircularProgress sx={{color:'white'}} size='2rem' />)
        setRegDisable(true);
        const response = await registerUser(signupdata);

        if(response.Message === "Sucess"){
          toast.success('User Registered successfully , Login to Continue');
          handleOpenDialog();
          setRegBtn("Register")
          setRegDisable(false);
          setsignupdata({
            "OrgId": book.OrgId,
            "BranchCode": "",
            "B2CCustomerId": "",
            "B2CCustomerName": "",
            "EmailId": "",
            "Password": "",
            "AddressLine1": "",
            "AddressLine2": "",
            "AddressLine3": "",
            "MobileNo": "+65",
            "CountryId": "IND",
            "PostalCode": "",
            "IsActive": true,
            "IsApproved": true,
            "CreatedBy": "user",
            "CreatedOn": new Date(),
            "ChangedBy": "user",
            "ChangedOn": new Date(),
            "FloorNo": "",
            "UnitNo": ""
          });
          setverifyDisable(false);
        }else{
          toast.error('Not able to Register');
          setRegBtn("Register")
          setRegDisable(false);
        }
      } else {
        toast.error('All fields must be filled correctly');
      }
    }else{
      toast.error('Please Verify Email'); 
    }
  };
  


  return(
    <>
        <Grid container>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <Grid md={7} className='signin-form' >
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
                    Login
                  </Typography>
                </Grid>

                <Grid item>
                  <TextField
                    id="Username"
                    label="Email"
                    variant="outlined"
                    fullWidth // Set full width
                    value={loginData.Username}
                    onChange={handleInputChange}
                    error={Boolean(loginErrors.Username)}
                    helperText={loginErrors.Username}
                  />
                </Grid>
                <Grid item>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="Password">Password</InputLabel>
                    <OutlinedInput
                      id="Password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.Password}
                      onChange={handleInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
                <Grid item>
                  <Typography  textAlign='right'>Forgot Password?</Typography>
                </Grid>
                <Grid item md={12}>
                  <Button className='loginbtn'
                  onClick={handleLogin}
                  sx={{
                    color: loginDisable ? 'white' : 'white',
                    '&:disabled': {
                      color: loginDisable ? 'white' : 'white',
                    },
                  }}
                  disabled={loginDisable}
                  >
                    {logBtn}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
        </Grid>
    </>
  );

}