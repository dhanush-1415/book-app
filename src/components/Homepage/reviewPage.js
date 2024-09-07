import React , {useState, useEffect} from "react";
import { CardContent,Card, Grid, Typography, TextField, Divider } from "@mui/material";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useParams } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Header from "../Navbar/Header";
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { getBusinessIdData, getSpecialistIdData , userReview, getreviewData } from "../../apiCalls";
import { toast } from "react-toastify";
import { top20 } from "../../config";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { styled } from '@mui/material/styles';
import { RiseLoaderComponent } from "../loader";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });
  

const useStyles = makeStyles({
    btnStyle: {
        background: '#2e6ed5',
        color: 'white',
        fontWeight: 'bold',
        padding: '15px 30px',
        fontSize:'1.2rem',
        border: '1px solid #2e6ed5',
        transition: 'background-color 0.3s, color 0.3s', 
        cursor:'pointer',
        borderRadius:'4px',
        '&:hover': {
        background: 'white', 
        color: '#2e6ed5', 
        },
    },
});

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  }

const ReviewPage = () => {

    const { type , profile } = useParams();

    const [data , setData ] = useState([]);

    const classes = useStyles();

    const [rating, setRating] = useState(0);

    const [review , setReview]= useState();

    const [hover, setHover] = React.useState(-1);

    const [reviewData , setReviewData] = useState();

    const [UserData , setUserData] = useState();

    const [load , setLoad] = useState(true);

    const [load1 , setLoad1] = useState(true);

    const [load2 , setLoad2] = useState(true);


    const handleSubmit = () => {
  
        if (UserData) {

              const data = {
                OrgId: top20.orgId,
                ReviewDate: new Date(),
                MemberId: UserData,
                CreatedBy: "admin",
                ReviewDescription: review,
                RatingValue: rating,
                IsReviewValidated: false,
                BusinessId: "",
                SpecialistId: ""
              };
              
              if (type === "business") {
                data.BusinessId = profile;
              } else {
                data.SpecialistId = profile;
              }
              
            if(rating && review){
                userReview(data)
                .then((response) => {
                    if(response.Message === `Member Review has been created successfully!,  reference ${response.Data}`){
                        toast.success("Successfully Reviewed");
                        setRating(0)
                        setReview("");
                    }else{
                        toast.error(response.Message)
                    }
                })
            }else{
                toast.error("Please give star rating and review")
            }
        }else{
            toast.error("Please Login to continue")
        }

    }


    useEffect(()=>{
        const data = {
            type:type,
            profile:profile,
        }
        if(load){
            getreviewData(data)
            .then((response)=>{
                if(response.Message === "Sucess"){
                    setReviewData(response.Data);
                    setLoad(false)
                }
            })
            .catch(e => {
                setLoad(true)
            })
        }

    },[profile, type , rating , load])


    useEffect(() => {
        
        const storedData = localStorage.getItem('top20User');

        setUserData(storedData);

        const fetchData = () => {
          if (type === 'business') {
            if(load1){
                getBusinessIdData(profile)
              .then((fetchedData) => {
                if (fetchedData.Message === "Sucess") {
                    setData([fetchedData.Data[0]]);
                    setLoad1(false)
                }
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
                setLoad1(true)
              });
            }
          } else if (type === 'specialist') {
            if(load2){
                getSpecialistIdData(profile)
              .then((fetchedData) => {
                if (fetchedData.Message === "Sucess") {
                    setData([fetchedData.Data[0]]);
                    setLoad2(false)
                }
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
                setLoad2(true)
              });
            }
          }
        };
    
        fetchData();
      }, [type, profile, load1, load2]);
    


    const handleRatingChange = (event, newValue) => {
      setRating(newValue);
    };


    return(
        <>
        <Header />
            <Grid sx={{width:{xs:'98%' , sm:'98%' , md:'80%'} , margin:'20px auto'}}>
                {data && data.length  ? (
                    <>
                        <Card>
                            <CardContent>
                                <Grid>
                                    <Grid container justifyContent='space-between'>
                                        {/* <Grid item md={6} sx={{display:'flex' , justifyContent:'center' , padding:'20px'}}>
                                            <img src={type === 'business' ? data[0].LogoFilePath : data[0].FilePath} alt="profile" style={{width:'70%' , maxHeight:'65vh' }} />
                                        </Grid> */}
                                        <Grid item md={6} sx={{padding:'20px'}}>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                    <Rating name="read-only" value={data[0].RatingValue} precision={0.1} readOnly />
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                    <Typography className="typo5">Name</Typography>
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                    <Typography className="typo6">{data[0].DisplayName}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                    <Typography className="typo5">City</Typography>
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                    <Typography className="typo6">{data[0].City}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                    <Typography className="typo5">Country</Typography>                            
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                <Typography className="typo6">{data[0].Country}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                <Typography className="typo5">PostalCode</Typography>                            
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                <Typography className="typo6">{data[0].PostalCode }</Typography>                           
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                <Typography className="typo5">OpenTime</Typography>                        
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                <Typography className="typo6">{data[0].OpenTime}</Typography>                             
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                <Typography className="typo5">CloseTiime</Typography>                              
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                <Typography className="typo6">{data[0].CloseTiime}</Typography>                        
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                <Typography className="typo5">Services</Typography>                            
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                <Typography className="typo6">{data[0].ServicesList && data[0].ServicesList.length && data[0].ServicesList.map((item , index) => (
                                                        item.BusinessServiceName + ","
                                                    ))}</Typography>                                    
                                                </Grid>
                                            </Grid>
                                            <Grid container>
                                                <Grid item xs={5} sm={5} md={4.5}>
                                                <Typography className="typo5">Bio</Typography>                            
                                                </Grid>
                                                <Grid item xs={7} sm={7} md={7.5}>
                                                <Typography className="typo6" sx={{wordBreak:'break-word'}}>{data[0].BioInfo}</Typography>                                      
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={0.2} sx={{justifyContent:'center'}}>
                                            <Divider orientation="vertical" variant="middle" flexItem sx={{minHeight:'100%'}} />
                                        </Grid>
                                        <Grid item md={5.5}>
                                            <Grid container justifyContent="center" sx={{padding:'30px 0'}}>
                                                <Typography className="typo7">Review Us</Typography>
                                            </Grid>
                                            <Grid container justifyContent='center' direction='column' sx={{padding:'30px 0'}} >
                                                <Grid item xs={12} sm={12} md={4} >
                                                    <Stack spacing={1}>
                                                        <Rating 
                                                            name="hover-feedback"
                                                            getLabelText={getLabelText}
                                                            onChange={handleRatingChange}
                                                            onChangeActive={(event, newHover) => {
                                                            setHover(newHover);
                                                            }}
                                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                                            size="large" 
                                                            sx={{fontSize:{xs:'8vh' , sm:'10vh' , md:'4vw'} }}
                                                            precision={0.5} 
                                                            value={rating} 
                                                        />
                                                            {rating !== null && (
                                                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
                                                            )}
                                                    </Stack>
                                                </Grid>
                                                <Grid item xs={12} sm={12} md={6} sx={{marginTop:'20px'}} >
                                                    <TextField
                                                        id="outlined-multiline-static"
                                                        label="Write a review"
                                                        multiline
                                                        fullWidth
                                                        rows={4}
                                                        defaultValue=""
                                                        value={review}
                                                        onChange={(e)=>{setReview(e.target.value)}}
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid sx={{float:'right' , padding:'20px 0'}}>
                                                <button className={classes.btnStyle} onClick={handleSubmit}>Submit</button>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{margin:'30px 0'}} />

 
                                    <Grid container direction="column" sx={{width:{xs:'100%',sm:'100%',md:'70%'}}}>
                                        {reviewData && reviewData.length ? (
                                            <>
                                                {reviewData.map((item , index) => (
                                                    <Card key={index} sx={{margin:'10px 0'}}>
                                                        <CardContent>
                                                            {/* <Grid container justifyContent='space-between'>
                                                                <Grid item xs={12} sm={12} md={4} >
                                                                    <Typography>{item.MemberId}({item.CreatedOn})</Typography>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={2} sx={{display:'flex'}}>
                                                                    <Typography>Rating:</Typography>
                                                                    <StyledRating name="read-only" value={item.RatingValue} precision={0.1} readOnly />
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} sx={{display:'flex'}}>
                                                                    <Typography>Review:</Typography>
                                                                    <Typography>{item.ReviewDescription}</Typography>
                                                                </Grid>
                                                            </Grid> */}
                                                            <Grid>
                                                                <Grid container>
                                                                    <StyledRating name="read-only" value={item.RatingValue} precision={0.1} readOnly />{item.RatingValue}
                                                                </Grid>
                                                                <Grid container sx={{margin:'10px 0'}}>
                                                                    <Grid item><AccountCircleIcon /></Grid>
                                                                    <Grid item sx={{margin:'0px 5px' , display:'flex',flexDirection:'row'}}><Typography>{item.MemberName}</Typography><Typography>({item.ReviewDate.split('T')[0]})</Typography></Grid>
                                                                </Grid>
                                                                <Grid container>
                                                                    <Typography>Review: {item.ReviewDescription}</Typography>
                                                                </Grid>
                                                            </Grid>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </>
       
                                        ):(
                                                <>
                                                
                                                </>
                                        )}
    
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </>
                ): (
                    <>
                        <Grid container justifyContent='center' alignItems='center' p={4}>
                          <RiseLoaderComponent />
                        </Grid>
                    </>
                )}
 

            </Grid>
        </>
    )
}

export default ReviewPage;