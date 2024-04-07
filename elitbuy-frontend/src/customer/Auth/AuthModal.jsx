import React from 'react';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import RegisterForm from '../Auth/RegisterForm';  
import LoginForm from './LoginForm';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 650,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
  }

  const AuthModal = ({ handleClose, open }) => {
    const location = useLocation();
    return (
       <div>
        <div>
        <div>
        <ToastContainer />
      </div>
        </div>
         <Modal
           open={open}
           onClose={handleClose}
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
         >
           <Box sx={style}>
             {/* Close button at the top right */}
             {/* <IconButton
               edge="end"
               color="inherit"
               onClick={handleClose}
               aria-label="close"
               sx={{
                 position: 'absolute',
                 right: 9,
                 top: 9,
               }}
             >
               <CloseIcon />
             </IconButton> */}

            {location.pathname==="/Signup" ? <RegisterForm /> : <LoginForm />}
   
             
             {/* <SignUpSignInForm /> */}
           </Box>
         </Modal>
       </div>
    );
   };
   
   export default AuthModal;
   