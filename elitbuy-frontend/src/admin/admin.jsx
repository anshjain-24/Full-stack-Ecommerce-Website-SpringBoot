import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LabelIcon from '@mui/icons-material/Label';
import GroupIcon from '@mui/icons-material/Group';
import GradingIcon from '@mui/icons-material/Grading';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Customers from './components/Users';
import Orders from './components/Orders';
import AddProductForm from './components/AddProductForm';
import AdminHome from './components/AdminHome';
import { getUser } from '../State/Auth/Action';
import PageNotFound from '../customer/components/404 page/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon style={{ color: 'white' }} /> },
    { name: "Products", path: "/admin/products", icon: <LabelIcon style={{ color: 'white' }} /> },
    { name: "Users", path: "/admin/users", icon: <GroupIcon style={{ color: 'white' }} /> },
    { name: "Orders", path: "/admin/orders", icon: <GradingIcon style={{ color: 'white' }} /> },
    { name: "Add New Product", path: "/admin/product/create", icon: <LibraryAddIcon style={{ color: 'white' }} /> },
    { name: "Home", path: "/", icon: <LocalMallIcon style={{ color: 'white' }} /> },
];

const Admin = () => {
    const theme = useTheme();
    const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
    const [slideBarVisible, setSlideBarVisible] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store)

    const [isAdmin, setIsAdmin] = useState(false);
    const [redirectTimer, setRedirectTimer] = useState(5);

    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
        }
    }, [jwt, auth.jwt])

    useEffect(() => {
        if (auth.user && auth.user?.role == 'admin') {
            setIsAdmin(true);
            // navigate("/admin")
        }
        else {
            setIsAdmin(false);
            const timer = setInterval(() => {
                setRedirectTimer(prevTimer => prevTimer - 1);
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [auth.user])

    useEffect(() => {
        if (!isAdmin && redirectTimer === 0) {
            navigate("/");
        }
    }, [isAdmin, redirectTimer])


    console.log("the value of isadmin : ", isAdmin);

    // Function to handle mouse movement
    const handleMouseMove = (e) => {
        const threshold = 20; // Adjust the value to control the sensitivity
        const threshold2 = 275;
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
            {/* <List>
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
            </List> */}
        </Box>
    );

    return (

       
        <div>
            <div>
                <ToastContainer />
            </div>

            {isAdmin && <div>
                <CssBaseline />
                <div style={{ display: 'flex' }}>
                    {slideBarVisible && drawer}
                    <div style={{ flexGrow: 1, height:'100%' }}>
                        <Routes>
                            <Route path='/' element={<AdminHome />}></Route>
                            <Route path='/dashboard' element={<Dashboard />}></Route>
                            <Route path='/products' element={<Products />}></Route>
                            <Route path='/users' element={<Customers />}></Route>
                            <Route path='/orders' element={<Orders />}></Route>
                            <Route path='/product/create' element={<AddProductForm />}></Route>
                            
                            <Route path='*' element={<PageNotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>}
            {!isAdmin && (
                <div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100vh',
                        fontFamily: 'Cascadia Mono SemiBold',
                        color: 'red',
                        fontSize: '24px'
                    }}>
                        <div>You are not an admin</div>
                        <div>This is an unauthorized access</div>
                        <div>Redirecting in {redirectTimer} seconds...</div>
                    </div>
                </div>
            )}
        </div>


    );
};

export default Admin;
