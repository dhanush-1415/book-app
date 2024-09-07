import React, { useState, useEffect } from "react";
import { Card, CardContent, Grid, Typography, Pagination,TextField, List, ListItem,Divider,Button, Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, ListSubheader  } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Rating from '@mui/material/Rating';
import { getBusinessData, getSpecialistData, getBusinessServiceData , getBusinessCategoriesData, getBusinessIdData, getSpecialistIdData, bookAppointment } from "../../apiCalls";
import { RiseLoaderComponent } from "../loader";
import SearchIcon from '@mui/icons-material/Search';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { DatePicker, LocalizationProvider, TimePicker  } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { top20 } from "../../config";
import format from 'date-fns/format';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    minWidth: '50vw',
  },
}));

const ProductList = ({ category, setCategory, service, setSelectedServices }) => {

  const [businessData, setBusinessData] = useState([]);
  const [specialistData, setSpecialistData] = useState([]);
  const [activeCard, setActiveCard] = useState("Business");
  const [businessPage, setBusinessPage] = useState(1);
  const [specialistPage, setSpecialistPage] = useState(1);
  const itemsPerPage = 16; // Number of items per page
  const [search , setSearch] = useState("");
  const [serviceSearch , setServiceSearch] = useState("");
  const [UserData , setUserData] = useState();
  const [name , setName ] = useState()
  const [load1 , setLoad1] = useState(true);
  const [load2 , setLoad2] = useState(true);
  const [load3 , setLoad3] = useState(true);
  const [load4 , setLoad4] = useState(true);
  const [isLoader , setIsLoader] = useState(true);

  const [popData , setPopData] = useState();

  const [role, setRole] = useState('service');

  const [open, setOpen] = useState(false);

  const [fromDate, setFromDate] = useState(null);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);


  const formattedData = selectedItems.map((id, index) => {
    const item = activeCard === "Business"
      ? popData.ServicesList.find((item) => item.BusinessServiceId === id)
      : popData.ServicesList.find((item) => item.ServiceId === id);
  
    return {
      OrgId: 1,
      SlNo: index + 1,
      ServiceId: id,
      ServiceName: activeCard === "Business" ? item?.BusinessServiceName || '' : item?.ServiceName || '',
      Coins: 500,
      CreatedBy: name,
      CreatedOn: new Date().toISOString(),
    };
  });
  


  const handleServiceChange = (event) => {
    setSelectedItems(event.target.value);
  };


  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleFromTimeChange = (newTime) => {
    const formattedTime = format(newTime, 'HH:mm');
    setFromTime(formattedTime);
  };

  const handleToTimeChange = (newTime) => {
    const formattedTime = format(newTime, 'HH:mm');
    setToTime(formattedTime);
  };

  const handleClickOpen = (id , data) => {

    if(UserData){
      if(activeCard === "Business"){
        getBusinessIdData(id)
        .then((data)=> {
          if(data.Message === "Sucess"){
            setPopData(data.Data[0])
          }else{
            toast.error("Business Data not found")
          }
        })
      }else{
        getSpecialistIdData(id)
        .then((data)=> {
          if(data.Message === "Sucess"){
            setPopData(data.Data[0])
          }else{
            toast.error("Specialist Data not found")
          }
        })
      }
      setOpen(true);
    }else{
      toast.error("Please Login to continue")
    }
  };

  const handleClose = () => {
    setOpen(false);
    setFromDate("")
    setFromTime("")  
    setToTime("")
    setSelectedItems([]);
  };


  const handleBookAppointment = () => {

    if (fromDate === "" || fromTime === "" || toTime === "") {
      toast.error("Please choose Appontment Date and Time")
    }else{
      const appointmentData = {
        "OrgId": top20.orgId,
        "AppoinmentDate": fromDate,
        "MemberId": UserData,
        "AppoinmentFromTime": fromTime,
        "AppoinmentToTime": toTime,
        "TotailCoinsPaid": 500,
        "PaymentStatus": 1,
        "Status": 1,
        "IsRescheduled": false,
        "CategoryId": popData.BusinessCategory,
        "ServicePlace": 0,
        "CreatedBy": name,
        "AppoinmentDetail": formattedData,
        "BusinessId": "TOP0DF51",
        "SpecialistId": "TPSPLE1DF6",
      } 
      // if (activeCard === 'Business') {
      //   appointmentData.BusinessId = popData.BusinessId;
      // } else {
      //   appointmentData.SpecialistId = popData.SpecialistId;
      // }


      bookAppointment(appointmentData)
      .then((data)=>{
        if(data.Status){
          toast.success(data.Message)
          handleClose();
        }else{
          toast.error(data.Message)
        }
      })
      .catch(e => {
        toast.error(e)
      })
  
    }

  }


  const handleChange = (event) => {
    setRole(event.target.value);
    setSearch("")
    setLoad2(true);
    setLoad3(true);
    setFilteredServices([]);
  };


  const handleCardClick = (card) => {
    setActiveCard(card);
  }

  const [services , setServices] = useState();
  const [categories , setCategories] = useState([]);

  const [filteredServices, setFilteredServices] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      if(role === 'service'){
        const filtered = services.filter(service => 
          service.BusinessServiceName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredServices(filtered);
      }else{
        const filtered = categories.filter(service => 
          service.BusinessCategoryName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredServices(filtered);
      }

    } else {
      setFilteredServices([]);
    }
  };

  const handleItemClick = (serviceName, serviceId) => {
    setSearch(serviceName); 
    setServiceSearch(serviceId);
    setLoad2(true);
    setLoad3(true);
    setFilteredServices([]);
  };

  const handleSearchIconClick = () => {
    if (search.length > 0) {
      if(role === 'service'){
        const filtered = services.filter(service => 
          service.BusinessServiceName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredServices(filtered);
      }else{
        const filtered = categories.filter(service => 
          service.BusinessCategoryName.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredServices(filtered);
      }

    }
  };


  useEffect(() => {

    const storedData = localStorage.getItem('top20User');

    const DisplayName = localStorage.getItem('DisplayName');

    setUserData(storedData);

    setName(DisplayName);
        
    if(load1){
      getBusinessServiceData()
      .then((Response) => {
        if(Response.Message === "Sucess"){
          if(Response.Data && Response.Data.length){
            const activeServices = Response.Data.filter(item => item.IsActive);
            setServices(activeServices);
            setLoad1(false)
          }else{
            setLoad1(true)
          }
        }else{
          toast.error("cannot get services");
          setLoad1(true)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }

    if(load4){
      getBusinessCategoriesData()
      .then((Response) => {
        if(Response.Message === "Sucess"){
          if(Response.Data && Response.Data.length){
            const activeCategories = Response.Data.filter(item => item.IsActive);
            setCategories(activeCategories);
            setLoad4(false)
          }else{
            setLoad4(true)
          }
        }else{
          toast.error("cannot get services");
          setLoad4(true)
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }

    }, [load1,load4]);



  useEffect(() => {

      const data = {
        service:serviceSearch,
        role:role
      }

      if(load2){
        console.log('11111111111111111111')
        getBusinessData(data)
        .then((Response) => {
          console.log(Response , '222222222222222')
          if(Response.Message === "Sucess"){
            if(Response.Data && Response.Data.length){
              console.log(Response.Data , '3333333333333333333333333333')
              setBusinessData(Response.Data);
              setLoad2(false)
              setIsLoader(false)
            }else{
              setLoad2(true)
              setIsLoader(false)
            }
          }else{
            toast.error("cannot get services");
            setLoad2(true)
            setIsLoader(false)
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoader(false)
        });
      }

      if(load3){
        getSpecialistData(data)
        .then((Response) => {
          if(Response.Message === "Sucess"){
            if(Response.Data && Response.Data.length){

              setSpecialistData(Response.Data);
              setLoad3(false)
              setIsLoader(false)
            }else{
              setLoad3(true)
              setIsLoader(false)
            }
          }else{
            toast.error("cannot get services");
            setLoad3(true)
            setIsLoader(false)
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoader(false)
        });
      }

  }, [load2, load3, role, serviceSearch]);

  const handleReview = (name , type) => {
    const formattedBusinessName = encodeURIComponent(name);
    window.location.href = `/${type}/review/${formattedBusinessName}`;
  }

  function truncateName(description, maxLength) {
    const regex = /(<([^>]+)>)/ig;
    const plainText = description.replace(regex, '');
    if (plainText.length > maxLength) {
      return `${plainText.substring(0, maxLength)}...`;
    } else {
      return plainText;
    }
  }

  const handleBusinessPageChange = (event, value) => {
    setBusinessPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSpecialistPageChange = (event, value) => {
    setSpecialistPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderBusinessCards = () => {
    const startIndex = (businessPage - 1) * itemsPerPage;
    const paginatedBusinessData = businessData.slice(startIndex, startIndex + itemsPerPage);

    return paginatedBusinessData.map((item, index) => (
      <Grid item xs={11} sm={4} md={3} sx={{ padding: { xs: '3px', sm: '3px', md: '14px' } }} key={index}>

        <Card sx={{ cursor: 'pointer',minHeight:{xs:'unset',sm:'unset',md:'440px'} , borderRadius:'15px',boxShadow:'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;' }}>
          <CardContent>
            <Grid>
              <Grid container justifyContent='center' sx={{ minHeight:'165px'}}>
                <img 
                  src={item.LogoFilePath} 
                  alt="profile"  width="50%" 
                  style={{ margin: '10px', maxHeight: '150px' , borderRadius:'50%' , border:'2px solid #2e6ed5' }} 
                  onError={(e) => { e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"; }}
                  />
              </Grid>
              <Grid container justifyContent='center'>
                <Typography sx={{fontWeight:'bold'}}>{item.DisplayName}</Typography>
              </Grid>
              <Grid container justifyContent="center" sx={{padding:'3px 0'}}>
                <Typography>{item.City}</Typography>
              </Grid>
              <Grid container justifyContent='center' sx={{padding:'15px 0'}}>
                <Divider sx={{border:'0.8px solid rgba(0, 0, 0, 0.12)' , width:'100%'}} />
              </Grid>
              <Grid container justifyContent="flex-start" sx={{padding:'3px 0' , overflow:'hidden' , minHeight:'60px'}}>
                <Typography sx={{wordBreak:'break-word'}}>{truncateName(item.BioInfo, 49)}</Typography>
              </Grid> 
              <Grid container justifyContent='center' sx={{padding:'7px 0'}}>
                <StyledRating name="read-only" value={item.RatingValue} precision={0.1} readOnly />
              </Grid>
              <Grid container justifyContent='space-between' sx={{ padding: '10px 0' }}>
                <Grid item xs={12} sm={12} md={5.95}>
                  <Button fullWidth variant="contained" onClick={(e) => handleClickOpen(item.BusinessId, "business")}>
                    Appointment
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={5.95}>
                  <Button fullWidth variant="contained" onClick={(e) => handleReview(item.BusinessId, "business")}>
                    Review
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  const renderSpecialistCards = () => {
    const startIndex = (specialistPage - 1) * itemsPerPage;
    const paginatedSpecialistData = specialistData.slice(startIndex, startIndex + itemsPerPage);

    return paginatedSpecialistData.map((item, index) => (
      <Grid item xs={11} sm={4} md={3} sx={{ padding: { xs: '3px', sm: '3px', md: '14px' } }} key={index}>
        {/* <Card sx={{ cursor: 'pointer' , minHeight:{xs:'unset',sm:'unset',md:'425px'} }}>
          <CardContent>
            <Grid container direction='column'>
              <Typography className="typo2" sx={{ padding: '5px 0' }}>{item.DisplayName}</Typography>
              <Grid container sx={{ justifyContent: 'center', alignItems: 'center' }}>
                <img className={classes.zoom} src={item.LogoFilePath || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} alt="d1" width="70%" style={{ margin: '10px', maxHeight: '190px' }} />
              </Grid>
              <Grid item md={12}>
                <Typography className="typo3" sx={{ padding: '5px 0' }}>{truncateName(item.BioInfo, 60)}</Typography>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: { xs: 'center', sm: 'center', md: 'end' }, margin: '10px' }}>
            <Rating name="read-only" value={item.RatingValue} precision={0.1} readOnly />
            <button className={classes.btnStyle} onClick={(e) => { handleReview(item.SpecialistId,"specialist") }}>Review</button>
          </CardActions>
        </Card> */}
                <Card sx={{ cursor: 'pointer',minHeight:{xs:'unset',sm:'unset',md:'440px'} , borderRadius:'15px',boxShadow:'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;' }}>
          <CardContent>
            <Grid>
              <Grid container justifyContent='center' sx={{ minHeight:'165px'}}>
                <img src={item.LogoFilePath || "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"} alt="profile"  width="50%" style={{ margin: '10px', maxHeight: '150px' , borderRadius:'50%' , border:'2px solid #2e6ed5' }} />
              </Grid>
              <Grid container justifyContent='center'>
                <Typography sx={{fontWeight:'bold'}}>{item.DisplayName}</Typography>
              </Grid>
              <Grid container justifyContent="center" sx={{padding:'3px 0'}}>
                <Typography>{item.City}</Typography>
              </Grid>
              <Grid container justifyContent='center' sx={{padding:'15px 0'}}>
                <Divider sx={{border:'0.8px solid rgba(0, 0, 0, 0.12)' , width:'100%'}} />
              </Grid>
              <Grid container justifyContent="flex-start" sx={{padding:'3px 0' , overflow:'hidden' , minHeight:'60px'}}>
                <Typography sx={{wordBreak:'break-word'}}>{truncateName(item.BioInfo, 49)}</Typography>
              </Grid> 
              <Grid container justifyContent='center' sx={{padding:'7px 0'}}>
                <StyledRating name="read-only" value={item.RatingValue} precision={0.1} readOnly />
              </Grid>
              <Grid container justifyContent='space-between' sx={{ padding: '10px 0' }}>
                <Grid item xs={12} sm={12} md={5.95}>
                  <Button fullWidth variant="contained" onClick={(e) => {handleClickOpen(item.SpecialistId,"specialist") }}>
                    Appointment
                  </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={5.95}>
                  <Button fullWidth variant="contained" onClick={(e) => { handleReview(item.SpecialistId,"specialist") }}>
                    Review
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    ));
  };


  
  return (
    <>
       <CustomDialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{minWidth:'80vw'}}
      >
        <DialogTitle sx={{display:'flex' , justifyContent:'center' , fontWeight:'bold'}}>Book Your Appoinment</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Grid container justifyContent='space-between' >
              <Grid item md={4} sx={{marginTop:'10px'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Appointment Date"
                      value={fromDate}
                      onChange={handleFromDateChange}
                      minDate={new Date()}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                borderColor: 'blue', // Change this to the desired border color
                              },
                              '&:hover fieldset': {
                                borderColor: 'blue', // Change this to the desired border color on hover
                              },
                            },
                          }}
                        />
                      )}
                    />
                  </LocalizationProvider>
              </Grid>
              <Grid item md={3.6} sx={{marginTop:'10px'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="From Time"
                    value={fromTime}
                    onChange={handleFromTimeChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'blue', // Change this to the desired border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'blue', // Change this to the desired border color on hover
                            },
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item md={3.6} sx={{marginTop:'10px'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <TimePicker
                    label="To Time"
                    value={toTime}
                    onChange={handleToTimeChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'blue', // Change this to the desired border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'blue', // Change this to the desired border color on hover
                            },
                          },
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            <Grid container>
              <FormControl fullWidth sx={{marginTop:'20px'}}>
                <InputLabel id="multi-select-label">Select Services</InputLabel>
                <Select
                  labelId="multi-select-label"
                  id="multi-select"
                  multiple
                  label="Select Services"
                  value={selectedItems}
                  onChange={handleServiceChange}
                  renderValue={(selected) =>
                    selected
                      .map((id) => {
                        const item = popData.ServicesList.find((item) => 
                          activeCard === "Business" ? item.BusinessServiceId === id : item.ServiceId === id
                        );
                        return activeCard === "Business" ? item?.BusinessServiceName : item?.ServiceName;
                      })
                      .join(', ')
                  }
                
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 224, // Maximum height of the dropdown menu
                        width: 250, // Width of the dropdown menu
                      },
                    },
                  }}
                >
                  {popData && popData.ServicesList.length > 0 && popData.ServicesList.map((item, index) => (
                    activeCard === "Business" ? (
                      <MenuItem key={index} value={item.BusinessServiceId}>
                        <Checkbox checked={selectedItems.indexOf(item.BusinessServiceId) > -1} />
                        <ListItemText primary={item.BusinessServiceName} secondary={item.Duration_Minutes+" minutes"} />
                      </MenuItem>
                    ) : (
                      <MenuItem key={index} value={item.ServiceId}>
                        <Checkbox checked={selectedItems.indexOf(item.ServiceId) > -1} />
                        <ListItemText primary={item.ServiceName} secondary={item.Duration_Minutes+" minutes"} />
                      </MenuItem>
                    )
                  ))}
                </Select>
              </FormControl>
            </Grid>


          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Close</Button>
          <Button variant="contained" onClick={handleBookAppointment}>Submit</Button>
        </DialogActions>
      </CustomDialog>
      <Grid sx={{background:'#F2F7FF' , padding:'30px 0'}}>
        <Grid sx={{ width: { xs: '98%', sm: '99%', md: '90%' }, margin: '0px auto' }}>
          <Grid container justifyContent='center' alignItems="center"  mb={4}>
            {/* <Grid item md={4.6} sx={{display:'flex',justifyContent:'center'}}>
             <FormControl sx={{maxWidth:{xs:'90%' , sm:'90%' , md:'100%'} , padding:{xs:'20px 0' , sm:'20px 0' , md:'0'}}}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={role}
                  name="radio-buttons-group"
                  onChange={handleChange}
                >
                  <FormControlLabel value="service" control={<Radio />} label="By Service type (eg:haircut,manicure etc)" />
                  <FormControlLabel value="category" control={<Radio />} label="By Service Category (eg:salons, babysitting, house cleaning etc)" />
                </RadioGroup>
              </FormControl>
            </Grid> */}
            <Grid item >
              <Grid sx={{border: '3px solid #2e6ed5', display: 'flex', flexDirection: 'column', minWidth: '330px', maxWidth: '330px'}}>
                <Grid container justifyContent='space-between'>
                  <Grid item xs={10} sm={10} md={9}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Search for..."
                      value={search}
                      onChange={handleSearchChange}
                    />
                  </Grid>
                  <Grid item xs={2} sm={2} md={3} sx={{display:'flex' , alignItems:'center' , justifyContent:'center' , background:'#2e6ed5' , color:'white', cursor:'pointer'}}>
                      <SearchIcon sx={{fontWeight:'bold'}} onClick={handleSearchIconClick} />
                  </Grid>
                </Grid>
                {role === 'service' ? (
                  <>
                    {search && (
                      <Grid item xs={12} sm={12} md={12} sx={{ maxHeight: 200, overflow: 'auto' }}>
                        <List>
                          {filteredServices.map((service) => (
                            <ListItem button key={service.BusinessServiceId} onClick={() => handleItemClick(service.BusinessServiceName , service.BusinessServiceId)}>
                              <ListItemText primary={service.BusinessServiceName} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    )}
                  </>
                ):(
                  <>
                    {search && (
                      <Grid item xs={12} sm={12} md={12} sx={{ maxHeight: 200, overflow: 'auto' }}>
                        <List>
                          {filteredServices.map((service) => (
                            <ListItem button key={service.BusinessCategoryId} onClick={() => handleItemClick(service.BusinessCategoryName , service.BusinessCategoryId)}>
                              <ListItemText primary={service.BusinessCategoryName} />
                            </ListItem>
                          ))}
                        </List>
                      </Grid>
                    )}
                  </>
                )}

              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent='space-evenly' alignItems='center' sx={{ margin: { xs: '30px 0', sm: '30px 0', md: '35px 0px' } }} >
            <Grid>
              <Typography className="typo1" sx={{ fontWeight: 'bold', borderRadius: '10px', padding: '7px', borderBottom: activeCard === 'Business' ? " 4px solid #2e6ed5" : 'none', cursor: 'pointer' }} onClick={() => handleCardClick('Business')} >Business</Typography>
            </Grid>
            <Grid item>
              <Typography className="typo1" sx={{ fontWeight: 'bold', borderRadius: '10px', padding: '7px', borderBottom: activeCard === 'Specialist' ? " 4px solid #2e6ed5" : 'none', cursor: 'pointer' }} onClick={() => handleCardClick('Specialist')}>Specialist</Typography>
            </Grid>
          </Grid>
          {activeCard === "Business" ? (
            <Grid container sx={{justifyContent:{xs:'center',sm:'center',md:'space-between'}}}>
              {businessData && businessData.length ? (
                <>
                  {renderBusinessCards()}
                  <Grid container justifyContent='center' sx={{ marginTop: '20px' }}>
                    <Pagination count={Math.ceil(businessData.length / itemsPerPage)} page={businessPage} onChange={handleBusinessPageChange} />
                  </Grid>
                </>
              ) : (
                <Grid container justifyContent='center' alignItems='center' p={4}>
                  {isLoader ? (
                    <RiseLoaderComponent />
                  ):(
                    <img src="https://mrtruant.com/website/images/no-data-found.png" alt="No Products Found" style={{ maxWidth: '100%', height: 'auto' }} />
                  )}
                </Grid>
              )}
            </Grid>
          ) : (
            <Grid container sx={{justifyContent:{xs:'center',sm:'center',md:'space-between'}}}>
              {specialistData && specialistData.length ? (
                <>
                  {renderSpecialistCards()}
                  <Grid container justifyContent='center' sx={{ marginTop: '20px' }}>
                    <Pagination count={Math.ceil(specialistData.length / itemsPerPage)} page={specialistPage} onChange={handleSpecialistPageChange} />
                  </Grid>
                </>
              ) : (
                <Grid container justifyContent='center' alignItems='center' p={4}>
                  {isLoader ? (
                    <RiseLoaderComponent />
                  ):(
                    <img src="https://mrtruant.com/website/images/no-data-found.png" alt="No Products Found" style={{ maxWidth: '100%', height: 'auto' }} />
                  )}
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>

    </>
  );
};

export default ProductList;
