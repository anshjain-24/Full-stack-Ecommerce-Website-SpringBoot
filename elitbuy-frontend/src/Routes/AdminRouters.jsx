import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../admin/admin'
import Dashboard from '../admin/components/Dashboard'

const AdminRouters = () => {
    console.log("here...in routers admin")
    return(
        
    <div className=''>
       {/* <Dashboard/>  */}
        <Routes>
            <Route path='/*' element={<Admin />}> </Route>
        </Routes>
    </div> 
    )
}
export default AdminRouters