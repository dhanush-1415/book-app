import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useParams } from 'react-router-dom';
import AccountSettings from '../components/accounts/accountSettigs';
import Orders from '../components/accounts/orders';
import Password from '../components/accounts/password';
import Address from '../components/accounts/address';
import { useAuth } from '../components/Auth/AuthContet';
import { UserbyCode } from '../apiCalls';
import { toast } from 'react-toastify';

function Account() {
    const { activepage } = useParams();

    const [user, setUserData] = useState({});
  
    useEffect(() => {
      let isMounted = true; 
  
      const fetchData = async () => {
        try {
          const storedToken = localStorage.getItem('bookUserToken');
  
          if (storedToken) {
            const tokenObject = JSON.parse(storedToken);
  
            if (tokenObject && tokenObject.length) {
              const response = await UserbyCode(tokenObject);
  
              if (isMounted) {
                if (response.Message === 'Sucess') {
                  setUserData(response.Data);
                }else{
                    toast.error("Please Login Again")
                }
              }
            }
          } else {
            if (isMounted) {
              toast.error("Please Login Again");
              window.location.href = '/';
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
  
      fetchData();
  
      return () => {
        isMounted = false;
      };
    }, []);


    const { setLoggedOut } = useAuth();
    
    const handleLogout = () => {
      setLoggedOut();
    };
    


    const menuItems = [
        {index: 1 , path: 'accountsettings', text: 'Profile', icon: <AccountCircleIcon /> },
        {index: 2 , path: 'orders', text: 'Orders', icon: <LocalMallIcon /> },
        {index: 3 , path: 'address', text: 'Address', icon: <LocationOnIcon /> },
        {index: 4 , path: 'change-password', text: 'Change Password', icon: <SettingsIcon /> },
    ];



    return (
        <>
            <Grid>
                <Grid container justifyContent='space-between' sx={{ width: '90%', margin: '0 auto' , padding:'50px 0px'}}>
                    <Grid item xs={12} sm={12} md={3.7} sx={{ border: '1px solid #e9eef2' }}>
                        <List component="nav" aria-label="main mailbox folders"   
                        sx={{
                            display: {
                              xs: 'flex',
                              sm: 'flex',
                              md: 'block',
                            },
                            maxWidth:{
                              xs: '100vh',
                              sm:'100vh'
                            },
                            overflow:'auto'
                          }}
                          >
                            {menuItems.map((item, index) => (
                                <Link
                                    to={`/my-account/${item.path}`}
                                    key={index}
                                    style={{ textDecoration: 'none', color: 'inherit' }} 
                                >
                                    <ListItemButton selected={activepage === item.path} >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText 
                                        sx={{
                                          padding:'10px',
                                          display: {
                                          xs: 'none',
                                          sm: 'none',
                                          md: 'block', 
                                        },}} 
                                        primary={item.text} />
                                    </ListItemButton>
                                </Link>
                            ))}
                             <Link
                                style={{ textDecoration: 'none', color: 'inherit' }} 
                                onClick={handleLogout}
                                to={`/`}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LockIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                     sx={{
                                      padding:'10px',
                                      display: {
                                      xs: 'none',
                                      sm: 'none',
                                      md: 'block', 
                                    },}}  
                                    primary="Logout" />
                                </ListItemButton>
                            </Link>
                        </List>
                    </Grid>
                    <Grid item md={8} sx={{ border: '1px solid #e9eef2' }}>
                        {activepage === 'accountsettings' && <AccountSettings user={user} />}
                        {activepage === 'orders' && <Orders />}
                        {activepage === 'address' && <Address user={user} />}
                        {activepage === 'change-password' && <Password user={user} />}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Account;
