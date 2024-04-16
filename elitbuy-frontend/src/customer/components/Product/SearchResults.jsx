import React, { useState, useEffect } from 'react';
import { api } from '../../../Config/ApiConfig';
import { useLocation } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import ProductCard from './ProductCard';
import Pagination from '@mui/material/Pagination';

const SearchResults = ({ searchQuery }) => {

  const { query } = useParams();
  const location = useLocation()
  const navigate = useNavigate()

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const pageNumber = searchParams.get("pageNumber") || 1;

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set("pageNumber", value)
    const query = searchParams.toString();
    navigate({ search: `?${query}` })
  }


  const [data, setData] = useState([]);

  useEffect(() => {
    const dataaa = {
      pageNumber: pageNumber - 1,
      pageSize: 3,
    }
    async function fetchProducts() {
      try {
        const response = await api.get(`product/search/${query}?pageNumber=0&pageSize=20`);
        console.log("Product data: ", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
        // Handle the error appropriately
      }
    }

    fetchProducts();
  }, [query, pageNumber]);


  return (
    <div style={{ justifyContent: 'center', marginLeft: "225px" }}>
      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">

          {/* Product grid */}
          {data?.content?.length > 0 ? (
            
              <div className="lg:col-span-3">

                <div className='flex flex-wrap justify-center bg-white py-5'>
                  {data?.content?.map((item) => <ProductCard product={item} />)}
                </div>
              </div>
            
          ) : (
            <div>
              sorry, we couldn't find anything similar to {query}
            </div>
          )}
        </div>
      </section>

      {/* <section className='w-full px=[3.6rem]' style={{marginRight:"225px"}}> */}
      <div className='px-4 py-5 flex justify-center' style={{ justifyContent: 'center', marginRight: "225px" }}>
        <Pagination count={data?.totalPages} color="secondary" onChange={handlePaginationChange} />
      </div>
      {/* </section> */}
    </div>

  );
}

export default SearchResults;
