// ...........................Starting Point of the Whole Website......................

// import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import CustomerRoutes from './Routes/CustomerRoutes';

function App() {
  return (
    <div className="">
      
      <Routes>

        <Route path='/*' element={<CustomerRoutes/>}></Route>

      </Routes>
      

    </div>
  );
}

export default App;