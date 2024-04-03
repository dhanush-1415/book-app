import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const PrivacyPolicy = () => {
  const [activeHeader, setActiveHeader] = useState(null);

  const headers = [
    { title: 'Who we are', content: 'Our website address is: https://makanmate.com.' },
    { title: 'Comments', content: 'When visitors leave comments...' },
    { title: 'Media', content: 'If you upload images to the website...' },
    { title: 'Cookies', content: 'If you leave a comment on our site...' },
    { title: 'Embedded content from other websites', content: 'Articles on this site may include embedded content...' },
    { title: 'Who we share your data with', content: 'If you request a password reset, your IP address will be included...' },
    { title: 'How long we retain your data', content: 'If you leave a comment, the comment and its metadata are retained indefinitely...' },
    { title: 'What rights you have over your data', content: 'If you have an account on this site, or have left comments...' },
    { title: 'Where your data is sent', content: 'Visitor comments may be checked through an automated spam detection service.' },
  ];

  const handleHeaderClick = (index) => {
    setActiveHeader(index);
    const contentElement = document.getElementById(`content-${index}`);
    contentElement.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Grid container spacing={2} sx={{ width: '80%', margin: '10px auto' }}>
      {/* Left Container */}
      <Grid item xs={12} md={3} style={{ position: 'sticky', top: 0, maxHeight: '100vh', overflowY: 'auto' }}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <List>
            {headers.map((header, index) => (
              <ListItem
                key={index}
                button
                selected={activeHeader === index}
                onClick={() => handleHeaderClick(index)}
              >
                <ListItemText primary={header.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={12} md={9}>
        <Paper elevation={3} style={{ padding: '16px' }}>
          {headers.map((header, index) => (
            <div key={index} id={`content-${index}`}>
              <h3>{header.title}</h3>
              <Typography>{header.content}</Typography>
            </div>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PrivacyPolicy;
