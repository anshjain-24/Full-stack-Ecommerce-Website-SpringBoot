import React, { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { deleteProduct, findProducts } from '../../State/Product/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, CardHeader } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'; // Import Radio and RadioGroup
import { filters, singleFilter, sortOptions } from './FilterOptions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Products = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector(store => store);

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const priceValue = searchParams.get("price");
  const discount = searchParams.get("discount");
  const sortValue = searchParams.get("sort");
  const pageNumber = searchParams.get("page") || 1;
  const stock = searchParams.get("stock");
  const categoryValue = searchParams.get("category") || "";

  const [sortKey, setSortKey] = useState(0); // Key to force re-render

  useEffect(() => {
    const fetchProducts = () => {
      const data = {
        sort: sortValue,
      };
      dispatch(findProducts(data));
    };

    fetchProducts();
  }, [sortValue, dispatch, sortKey]); // Include sortKey in the dependency array


  useEffect(() => {
    const [minPrice, maxPrice] = priceValue == null ? [0, 1000000] : priceValue.split("-").map(Number);

    const data = {
      colors: colorValue || [],
      sizes: sizeValue || [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 1000000,
      minDiscount: discount || 0,
      category: categoryValue,
      stock: stock,
      sort: sortValue,
      pageNumber: pageNumber - 1,
      pageSize: 100,
    };
    dispatch(findProducts(data));
  }, [colorValue, sizeValue, priceValue, discount, sortValue, pageNumber, stock, categoryValue, products.deletedProduct, products.products]);

  const handleNoFilter = () => {
    navigate(location.pathname);
  };

  const handleSort = (value) => {

    // Optionally, navigate to the same page with the updated query parameters
    const searchParam = new URLSearchParams(location.search);
    searchParam.set("sort", value);
    const query = searchParam.toString();
    navigate({ search: `?${query}` });
    setSortKey(prevKey => prevKey + 1); // Update sortKey to force re-render
  };


  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
    toast.success("product deleted successfully")

  };

  return (
    <div className='flex w-full h-full overflow-hidden'>
      {/* Filter options */}
      <div className='p-4 w-1/5 flex flex-col' style={{ backgroundColor: '#34393B', minHeight: '100vh', overflow: 'hidden', flex: 'none' }}>
        {/* Filter options */}
        <div className='m-2 p-1 flex items-center justify-between fixed'>
          <div className='p-2 pr-6' style={{
            fontWeight: 'bold',
            color: '#666',
            fontSize: '1.2rem', // 2x bigger font size
            width: '200%', // Increased width
          }}>
            Filter Options
          </div>


          {/* FilterAltOffIcon button */}
          <div className="ml-6">
            <button type="button">
              <span className="sr-only">View grid</span>
              <FilterAltOffIcon style={{ color: 'white', fontSize: '30px' }} onClick={handleNoFilter} />
            </button>
          </div>
        </div>
        {/* Sorting options */}
       
        <div className='p-2 pr-6 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none p-2 mt-20 mr-5 fixed' style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: '1.2rem', // 2x bigger font size
            width: '200%', // Increased width
          }}>
          <RadioGroup value={sortValue} onChange={(e) => handleSort(e.target.value)}>
            {sortOptions.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.name}
              />
            ))}
          </RadioGroup>
        </div>
        {/* Add more filter options as needed */}
      </div>
      {/* Table container */}
      <div className='flex-grow h-full overflow-y-auto' style={{ backgroundColor: 'white' }}>
        <Card className='p-1 m-1' style={{ backgroundColor: 'black', color: 'white' }}>
          <div className='flex justify-center' >
            <CardHeader title="All Products" />
          </div>
          <TableContainer sx={{ bgcolor: '#242B2E', color: '#000000' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Image</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Title</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Price</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Category</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>quantity</TableCell>
                  {/* <TableCell align="center" sx={{ color: 'white' }}>Update</TableCell> */}
                  <TableCell align="center" sx={{ color: 'white' }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.products?.content?.map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'white' }}
                  >
                    <TableCell align='center' component="th" scope="row" sx={{ color: 'white' }}>
                      <Avatar>
                        <img src={row?.imageUrl} alt="Product" />
                        {/* <img /> */}
                      </Avatar>
                    </TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{row.title}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>₹{row.discountedPrice}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{row.category.name}</TableCell>
                    <TableCell align="center" sx={{ color: 'white' }}>{row.quantity}</TableCell>
                    {/* <TableCell align="center" sx={{ color: 'white' }}>
                      <Button >Update </Button>
                    </TableCell> */}
                    <TableCell align="center" sx={{ color: 'white' }}>
                      <div style={{ color: 'white' }}>
                        <Button onClick={() => handleProductDelete(row.id)} sx={{ color: 'white' }}>
                          <RemoveCircleOutlineIcon className={`rounded-full bg-[red]`} sx={{ padding: '2px' }} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </div>
  );
};

export default Products;
