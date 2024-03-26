import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../customer/pages/HomePage/HomePage'
import Product from '../customer/components/Product/Product';
import ProductDetails from '../customer/components/ProductDetails/ProductDetails';
import Cart from '../customer/components/Cart/Cart';
import CheckOut from '../customer/components/CheckOut/CheckOut';
import Order from '../customer/components/Order/Order';
import OrderDetail from '../customer/components/Order/OrderDetail';
import Navigation from '../customer/components/navigation/Navigation';
import Footer from '../customer/Footer/Footer';


const CustomerRoutes = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>

                <Route path='/' element={<HomePage />}> </Route>
                <Route path='/Login' element={<HomePage />}> </Route>
                <Route path='/Signup' element={<HomePage />}> </Route>
                <Route path='/cart' element={<Cart />}> </Route>
                <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product />}> </Route>
                <Route path='/product/:productId' element={<ProductDetails />}> </Route>
                <Route path='/checkout' element={<CheckOut />}> </Route>
                <Route path='/account/order' element={<Order />}> </Route>
                <Route path='/account/order/:orderId' element={<OrderDetail />}> </Route>

            </Routes>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRoutes