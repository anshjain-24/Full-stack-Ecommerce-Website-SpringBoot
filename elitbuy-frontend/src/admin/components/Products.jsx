import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(store => store);

  console.log("all product ----->", Products)

  useEffect(() => {
    const data = {
      colors: [],
      sizes: null,
      minPrice: 1,
      maxPrice: 10000000,
      minDiscount: 0,
      category: "",
      stock: null,
      sort: "",
      pageNumber: 0,
      pageSize: 13,
    };
    console.log("data before api call : ", data);
    dispatch(findProducts(data));

  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='p-5 w-[100%] h-[100%]' style={{ flexGrow: 1, height: '100vh', overflowY: 'auto', display: 'flex' }}>
      <TableContainer sx={{bgcolor:'#242B2E', color:'#000000'}} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Image</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Title</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Category</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>Price</TableCell>
              <TableCell align="right" sx={{ color: 'white' }}>quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.products?.content?.map((row) => (
              <TableRow
                // key={row.title}
                // sx={{ '&:last-child td, &:last-child th': { border: 0 } , color:'white'}} // Applying white color here
              >
                <TableCell component="th" scope="row"  sx={{ color: 'white' }}><img src={row?.imageUrl} /></TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>{row.id}</TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>{row.category.name}</TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>{row.discountedPrice}</TableCell>
                <TableCell align="right" sx={{ color: 'white' }}>{row.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Products;
