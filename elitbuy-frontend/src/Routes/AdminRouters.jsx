import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../admin/admin'

const AdminRouters = () => {
    console.log("here...in routers admin")
    return(
        
    <div className=''>
        
        <Routes>
            <Route path='/*' element={<Admin />}> </Route>
        </Routes>
    </div>
    )
}
export default AdminRouters