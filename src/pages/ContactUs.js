import React from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import Header from '../components/Navbar/Header';


const ContactUs = () => {
  return (
    <>
    <Header/>
    <Container maxWidth="md" sx={{margin:'50px auto'}}>
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you have any questions or comments, feel free to reach out to us using the form below or via the contact information provided.
      </Typography>
      <form noValidate autoComplete="off">
        <TextField
          fullWidth
          label="Name"
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          variant="outlined"
          type="email"
          required
        />
        <TextField
          fullWidth
          label="Subject"
          margin="normal"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          required
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ marginTop: '20px' }}
        >
          Submit
        </Button>
      </form>
      <Typography variant="h6" component="h3" gutterBottom style={{ marginTop: '40px' }}>
        Contact Information
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: support@etuapps.com
      </Typography>
      <Typography variant="body1" gutterBottom>
        Address: <br />
        Top20UAE,<br />
        Marina Bay, Abu Dhabi<br />
        United Arab Emirates
      </Typography>
    </Container>
    </>
  );
};

export default ContactUs;
