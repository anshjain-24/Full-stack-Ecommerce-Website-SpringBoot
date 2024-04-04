import React, { useState } from 'react';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
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
    { name: "Dashboard", path: "/admin", icon: <DashboardIcon /> },
    { name: "Products", path: "/admin/products", icon: <LabelIcon /> },
    { name: "Customers", path: "/admin/customers", icon: <GroupIcon /> },
    { name: "Orders", path: "/admin/orders", icon: <GradingIcon /> },
    { name: "Add New Product", path: "/admin/product/create", icon: <LibraryAddIcon /> },
];

const Admin = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [slideBarVisible, setslideBarVisible] = useState(false);
    const navigate = useNavigate();

    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                display: isLargeScreen ? "flex" : "block",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                backgroundColor: "#ADDFF1", // Add light background color here
                padding: "15px",
            }}
        >
            {/* {isLargeScreen && <Toolbar />} */}
            <List>
                {menu.map((item, index) => (
                    <ListItem key={item.name} disablePadding onClick={() => navigate(item.path)}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" style={{ fontFamily: "Cascadia Mono SemiBold", color: "#333" }}>{item.name}
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
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant="body1" style={{ fontFamily: "Cascadia Mono SemiBold", color: "#333" }}>Account
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <div className='flex h-[100vh]'>

            <CssBaseline />
                    
                    <div className='w-[18%] '>
                        {drawer}
                    </div>

                    <div className='w-[82%] '>
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
