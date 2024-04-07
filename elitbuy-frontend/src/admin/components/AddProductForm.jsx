import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createProduct } from '../../State/Product/Action';
import { Typography, MenuItem } from "@mui/material"
import { Box, Button, Grid, Modal, TextField, FormControl, InputLabel, Select } from '@mui/material'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initializeSizes = [
  { name: 'S', quantity: 0 },
  { name: 'M', quantity: 0 },
  { name: 'L', quantity: 0 }
]

const AddProductForm = () => {

  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountedPercent: "",
    sizes: [...initializeSizes],
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: ""
  });

  const [showSizes, setShowSizes] = useState(false);

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevState => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "topLevelCategory") {
      setShowSizes(value === "women" || value === "men");
    }
  }

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name === "size_quantity" ? name = "quantity" : name = e.target.name;

    const sizes = [...productData.sizes];
    sizes[index][name] = value;
    setProductData(prevState => ({
      ...prevState,
      sizes: sizes
    }))
  }

  const getSecondLevelCategoryOptions = () => {
    switch (productData.topLevelCategory) {
      case "women":
        return ["clothings"];
      case "men":
        return ["Shirts", "Trousers", "Jackets"];
      case "electronics":
        return ["Mobile", "Laptops", "Tablets"];
      default:
        return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productData.topLevelCategory === 'electonics'){
      productData.sizes = []
    }
    dispatch(createProduct(productData))
    toast.success("Product added successfully!"); // Trigger toast notification
    console.log(productData);
  }

  const handleReset = () => {
    setProductData({
      imageUrl: "",
      brand: "",
      title: "",
      color: "",
      discountedPrice: "",
      price: "",
      discountedPercent: "",
      sizes: [...initializeSizes],
      quantity: "",
      topLevelCategory: "",
      secondLevelCategory: "",
      thirdLevelCategory: "",
      description: ""
    });
    setShowSizes(false);
  }

  const [slideBarVisible, setSlideBarVisible] = useState(false);

  const handleMouseMove = (e) => {
    const threshold = 20; // Adjust the value to control the sensitivity
    const threshold2 = 275;
    if (e.clientX > threshold2) {
      setSlideBarVisible(true);
    } else if (e.clientX < threshold) {
      setSlideBarVisible(false);
    }
  };
  const dynamicMargin = slideBarVisible ? '10px' : '257px';

  useEffect(() => {
    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='overflow-auto' style={{ backgroundColor: "black", color: 'white' }}>
      <div style={{ flex: '0 0 25%', backgroundColor: 'black', height: '100vh' }}>

        <div style={{
          flex: '1',
          overflowY: 'auto',
          marginLeft: dynamicMargin,
          padding: '10px',
          backgroundColor: 'black'
        }}>
          <Fragment>
            <Typography
              variant='h3'
              sx={{ textAlign: "center" }}
              className='py-10 text-center'
            >
              Add new Product
            </Typography>
            <form
              onSubmit={handleSubmit}
              className='min-h-screen'
              style={{ color: 'white' }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="imageUrl"
                    value={productData.imageUrl}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Brand'
                    name='brand'
                    value={productData.brand}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} >
                  <TextField
                    fullWidth
                    label="Title"
                    name='title'
                    value={productData.title}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Color"
                    name="color"
                    value={productData.color}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} >
                  <TextField
                    fullWidth
                    label="Quantity"
                    name='quantity'
                    value={productData.quantity}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Discounted Price"
                    name="discountedPrice"
                    value={productData.discountedPrice}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Discounted Percentage"
                    name="discountedPercent"
                    value={productData.discountedPercent}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControl style={{ width: '100%' }}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}>
                    <InputLabel>
                      Top Level Category
                    </InputLabel>
                    <Select
                      name="topLevelCategory"
                      value={productData.topLevelCategory}
                      onChange={handleChange}
                      label="Top Level Category" >
                      <MenuItem value="women">Women's</MenuItem>
                      <MenuItem value="men">Men's</MenuItem>
                      <MenuItem value="electronics">Electronics</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <FormControl style={{ width: '100%' }}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}>
                    <InputLabel>
                      Second Level Category
                    </InputLabel>
                    <Select
                      name="secondLevelCategory"
                      value={productData.secondLevelCategory}
                      onChange={handleChange}
                      label="Second Level Category" >
                      {getSecondLevelCategoryOptions().map((option, index) => (
                        <MenuItem key={index} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Third Level Category"
                    name="thirdLevelCategory"
                    value={productData.thirdLevelCategory}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                {showSizes && (
                  <Fragment>

                    {productData.sizes.map((size, index) => (
                      <Grid container item spacing={3} key={index}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Size"
                            name='name'
                            value={size.name}
                            onChange={(event) => handleSizeChange(event, index)}
                            required
                            fullWidth
                            sx={{
                              '& .MuiInputBase-root': {
                                color: 'white', // Text color
                                borderColor: 'white', // Border color
                              },
                              '& .MuiInputLabel-root': {
                                color: 'white', // Label color
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'white', // Border color
                                },
                                '&:hover fieldset': {
                                  borderColor: 'white', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'white', // Border color when focused
                                },
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Quantity"
                            name='size_quantity'
                            type='number'
                            onChange={(event) => handleSizeChange(event, index)}
                            required
                            fullWidth
                            sx={{
                              '& .MuiInputBase-root': {
                                color: 'white', // Text color
                                borderColor: 'white', // Border color
                              },
                              '& .MuiInputLabel-root': {
                                color: 'white', // Label color
                              },
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'white', // Border color
                                },
                                '&:hover fieldset': {
                                  borderColor: 'white', // Border color on hover
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: 'white', // Border color when focused
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Total Quantity"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        sx={{
                          '& .MuiInputBase-root': {
                            color: 'white', // Text color
                            borderColor: 'white', // Border color
                          },
                          '& .MuiInputLabel-root': {
                            color: 'white', // Label color
                          },
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: 'white', // Border color
                            },
                            '&:hover fieldset': {
                              borderColor: 'white', // Border color on hover
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: 'white', // Border color when focused
                            },
                          },
                        }}
                      />
                    </Grid>
                  </Fragment>
                )}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    sx={{
                      '& .MuiInputBase-root': {
                        color: 'white', // Text color
                        borderColor: 'white', // Border color
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white', // Label color
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'white', // Border color
                        },
                        '&:hover fieldset': {
                          borderColor: 'white', // Border color on hover
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'white', // Border color when focused
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} className='justify-center'>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Button
                        variant='contained'
                        sx={{ p: 1.8 }}
                        size="large"
                        type="submit"
                        className='flex justify-center'
                      >
                        Add Product
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        variant='outlined'
                        sx={{ p: 1.8 }}
                        size="large"
                        onClick={handleReset}
                      >
                        Reset Form
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Fragment>
        </div>
      </div>
    </div>
  )
}

export default AddProductForm
