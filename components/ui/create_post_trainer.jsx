"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

return (
    <React.Fragment>
        <Button onClick={handleClickOpen} style={{ borderRadius: '50%', backgroundColor: '#ED6262', padding: '10px' }}>
            <AddIcon style={{fontSize: "40", color: "#FFFFFF" }} />
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                    handleClose();
                },
                sx: {
                    borderRadius: 5, // Rounded corners
                    backgroundColor: '#363C40', // Background color
                    width: 500, // Set the width of the dialog
                    height: 660,
                },
            }}
        >
            <Box display="flex" justifyContent="center"
                 sx={{
                    borderRadius: 5, // Rounded corners
                    backgroundColor: '#363C40', // Background color
                    width: 500, // Set the width
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)', // Add shadow
                }}
            >
                <DialogTitle color='white'>Create a new Post</DialogTitle>
            </Box>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
);
}
