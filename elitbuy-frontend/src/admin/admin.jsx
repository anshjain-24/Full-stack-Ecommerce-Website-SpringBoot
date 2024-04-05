// import React, { useState } from 'react';
// import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import LabelIcon from '@mui/icons-material/Label';
// import GroupIcon from '@mui/icons-material/Group';
// import GradingIcon from '@mui/icons-material/Grading';
// import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import Dashboard from './components/Dashboard';
// import Products from './components/Products';
// import Customers from './components/Customers';
// import Orders from './components/Orders';
// import AddProductForm from './components/AddProductForm';

// const menu = [
//     { name: "Dashboard", path: "/admin", icon: <DashboardIcon style={{color:'white'}} /> },
//     { name: "Products", path: "/admin/products", icon: <LabelIcon style={{color:'white'}}/> },
//     { name: "Customers", path: "/admin/customers", icon: <GroupIcon style={{color:'white'}}/> },
//     { name: "Orders", path: "/admin/orders", icon: <GradingIcon style={{color:'white'}}/> },
//     { name: "Add New Product", path: "/admin/product/create", icon: <LibraryAddIcon style={{color:'white'}}/> },
// ];

// const Admin = () => {
//     const theme = useTheme();
//     const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
//     const [slideBarVisible, setslideBarVisible] = useState(false);
//     const navigate = useNavigate();

//     const drawer = (
//         <Box
//             sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 backgroundColor: "#242B2E",
//                 padding: "15px",
//                 height: "100%",
//                 overflowY: 'auto'
//             }}
//         >
//             <List sx={{ flexGrow: 1 }}>
//                 {menu.map((item, index) => (
//                     <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
//                         <ListItemButton>
//                             <ListItemIcon>
//                                 {item.icon}
//                             </ListItemIcon>
//                             <ListItemText>
//                                 <Typography variant="body1" style={{ fontFamily: "Cascadia Mono SemiBold", color: 'white' }}>
//                                     {item.name}
//                                 </Typography>
//                             </ListItemText>
//                         </ListItemButton>
//                     </ListItem>
//                 ))}
//             </List>
//             <List>
//                 <ListItem disablePadding >
//                     <ListItemButton>
//                         <ListItemIcon>
//                             <AccountCircleIcon style={{color:'white'}}/>
//                         </ListItemIcon>
//                         <ListItemText>
//                             <Typography variant="body1" style={{ fontFamily: "Cascadia Mono SemiBold", color:'white' }}>
//                                 Account
//                             </Typography>
//                         </ListItemText>
//                     </ListItemButton>
//                 </ListItem>
//             </List>
//         </Box>
//     );

//     return (
//         <div>
//             <div className='flex' style={{ flexGrow: 1, height: '100vh', overflowY: 'auto', display: 'flex' }}>


//                 <CssBaseline />

//                 <div className='w-[18%] h-[100%]' style={{ display: 'flex', flexGrow: 1 }}>
//                     {drawer}
//                 </div>

//                 <div className='w-[82%] h-[100vh] ' style={{ flexGrow: 1, height: '100vh', overflowY: 'auto', display: 'flex', backgroundColor: 'gray' }}>
//                     <Routes>
//                         <Route path='/' element={<Dashboard />}></Route>
//                         <Route path='/products' element={<Products />}></Route>
//                         <Route path='/customers' element={<Customers />}></Route>
//                         <Route path='/orders' element={<Orders />}></Route>
//                         <Route path='/product/create' element={<AddProductForm />}></Route>
//                     </Routes>
//                 </div>
//             </div>
//         </div>


//     );
// };

// export default Admin;

import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LabelIcon from '@mui/icons-material/Label';
import GroupIcon from '@mui/icons-material/Group';
import GradingIcon from '@mui/icons-material/Grading';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Customers from './components/Customers';
import Orders from './components/Orders';
import AddProductForm from './components/AddProductForm';

const menu = [
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon style={{ color: 'white' }} /> },
    { name: "Products", path: "/admin/products", icon: <LabelIcon style={{ color: 'white' }} /> },
    { name: "Customers", path: "/admin/customers", icon: <GroupIcon style={{ color: 'white' }} /> },
    { name: "Orders", path: "/admin/orders", icon: <GradingIcon style={{ color: 'white' }} /> },
    { name: "Add New Product", path: "/admin/product/create", icon: <LibraryAddIcon style={{ color: 'white' }} /> },
];

const Admin = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [slideBarVisible, setSlideBarVisible] = useState(false);
    const navigate = useNavigate();

    // Function to handle mouse movement
    const handleMouseMove = (e) => {
        const threshold = 50; // Adjust the value to control the sensitivity
        const threshold2 = 300;
        if (e.clientX < threshold) {
            setSlideBarVisible(true);
        } else if (e.clientX > threshold2) {
            setSlideBarVisible(false);
        }
    };


    useEffect(() => {
        // Add event listener for mouse movement
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const drawer = (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#242B2E",
                padding: "15px",
                height: "100vh",
                width: "20%",
                position: 'fixed',
                top: 0,
                left: slideBarVisible ? 0 : '-20%',
                transition: 'left 0.3s ease-in-out', // Smooth transition for the drawer
                zIndex: 1
            }}
        >
            <List>
                {menu.map((item, index) => (
                    <ListItem key={item.name} disablePadding onClick={() => { navigate(item.path); setSlideBarVisible(false); }}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" style={{ fontFamily: "Cascadia Mono SemiBold", color: 'white' }}>
                                    {item.name}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <List>
                <ListItem disablePadding >
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountCircleIcon style={{ color: 'white' }} />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body1" style={{ fontFamily: "Cascadia Mono SemiBold", color: 'white' }}>
                                Account
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <CssBaseline />
            <div style={{ display: 'flex' }}>
                {slideBarVisible && drawer}
                <div style={{ flexGrow: 1 }}>
                    <Routes>
                        <Route path='/' element={<Dashboard />}></Route>
                        <Route path='/products' element={<Products />}></Route>
                        <Route path='/customers' element={<Customers />}></Route>
                        <Route path='/orders' element={<Orders />}></Route>
                        <Route path='/product/create' element={<AddProductForm />}></Route>
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Admin;
