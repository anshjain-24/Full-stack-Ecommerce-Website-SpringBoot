
import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { Box, Button, Grid, LinearProgress, Rating } from '@mui/material'
import { Girl } from '@mui/icons-material'
import ProductReviewCard from './ProductReviewCard'
import { mens_Tshirt } from '../../../data/men/mens_Tshirt'
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../State/Product/Action'
import { addItemToCart, getCart } from '../../../State/Cart/Action'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeSectionCarousel from '../HomeSectionCarousel/HomeSectionCarousel'
import ProductRatingCard from './ProductRatingCard'

const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    // const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(null)
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const params = useParams()
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);

    const parentCategory = products.product?.category.parentCategory.parentCategory?.name;
    useEffect(() => {
        console.log("parent category name : ", parentCategory)
        if (parentCategory === 'electronics') {
            setSelectedSize('N/A');
        }
    }, [parentCategory]);

    const handleAddToCart = () => {

        if (!selectedSize) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 5000); // 5 seconds
            return;
        }

        const data = { productId: params.productId, size: selectedSize.name }
        // dispatch(addItemToCart(data))
        // navigate("/cart")
        dispatch(addItemToCart(data)).then(() => {
            // Fetch cart data again after adding item
            dispatch(getCart());
            navigate("/cart");
            toast.success("item added to cart")
        });
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        const data = { productId: params.productId }
        dispatch(findProductsById(data))
    }, [params.productId])

    // const updateSetSelectedSizeValue = (emptySize) => {
    //     setSelectedSize('');
    // };

    return (
        <div className="bg-white lg:px-5">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">

                        <li key={""}>
                            <div className="flex items-center">
                                <div className="mr-2 text-sm font-medium text-gray-900">
                                    {products?.product?.category?.parentCategory?.name}
                                </div>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                                <div className="mr-2 text-sm font-medium text-gray-900">
                                    {products?.product?.category?.parentCategory?.parentCategory?.name}
                                </div>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>

                        <li className="text-sm">
                            <div aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {products?.product?.title}
                            </div>
                        </li>
                    </ol>
                </nav>

                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>




                    {/* Image gallery */}
                    <div className="flex flex-col items-center">
                        <div className="ovreflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                src={products.product?.imageUrl}
                                alt={product.images[0].alt}
                                className="w-full h-full object-cover object-center" // Adjusts the width to fill the container
                            // style={{ height: 'calc(100% + 225px)' }} // Increases the height more than the width
                            />
                        </div>

                    </div>

                    {/* Product info */}
                    <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8
                    lg:px-24">
                        <div className="lg:col-span-2">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900 ">{products.product?.brand}</h1>
                            <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>{products.product?.title}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6 '>

                                <p className='font-semibold '>₹{products.product?.discountedPrice}</p>
                                <p className='opacity-50 line-through'>  ₹{products.product?.price}</p>
                                <p className='text-green-600 font-semibold'>{products.product?.discountedPercent}% off </p>


                            </div>
                            {/* Reviews */}
                            <div className="mt-6">
                                <div className='flex items-center space-x-3'>
                                   

                                </div>

                            </div>
                            <div>
                                <form className="mt-10">

                                    {/* Sizes */}
                                    {products.product?.category.parentCategory.parentCategory?.name !== 'electronics' ? (


                                        <div className="mt-10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium text-gray-900">Size</h3>

                                            </div>

                                            <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                                    {products.product?.sizes.map((size) => (
                                                        <RadioGroup.Option
                                                            key={size.name}
                                                            value={size}
                                                            disabled={!(size.quantity > 1)}
                                                            className={({ active }) =>
                                                                classNames(
                                                                    (size.quantity > 1)
                                                                        ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                        : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                    active ? 'ring-2 ring-indigo-500' : '',
                                                                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                                )
                                                            }
                                                        >
                                                            {({ active, checked }) => (
                                                                <>
                                                                    <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                                    {(size.quantity > 1) ? (
                                                                        <span
                                                                            className={classNames(
                                                                                active ? 'border' : 'border-2',
                                                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                                                'pointer-events-none absolute -inset-px rounded-md'
                                                                            )}
                                                                            aria-hidden="true"
                                                                        />
                                                                    ) : (
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                                        >
                                                                            <svg
                                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                                                viewBox="0 0 100 100"
                                                                                preserveAspectRatio="none"
                                                                                stroke="currentColor"
                                                                            >
                                                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                            </svg>
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </RadioGroup.Option>
                                                    ))}
                                                </div>
                                            </RadioGroup>
                                        </div>

                                    ) : (
                                        <div>

                                        </div>
                                    )}

                                    <div className='flex' style={{ display: 'block' }}>
                                        <Button onClick={handleAddToCart} variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd", mt: "2rem" }}>
                                            Add to Cart
                                        </Button>
                                    </div>

                                </form>
                                {showPopup && (
                                    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg p-4 shadow-lg">
                                        <p className="text-gray-800">Please select a size before adding to cart.</p>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h2 className="text-large font-medium text-gray-900" style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1A202C' }}>Description</h2>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{products.product?.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.details}</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </section>

                {/* Rating and Reviews */}

                <section>

                    <h1 className='font-semibold text-lg pb-4'> Recent Rating and Reviews </h1>
                    <div className='border p-5' style={{border: '', padding: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <Grid container spacing={7}>

                            <Grid item xs={7}>
                                <div className='space-y-5'>

                                    <ProductReviewCard productId={products?.product?.id} />

                                </div>
                            </Grid>

                            <Grid item xs={5}>
                                <ProductRatingCard productId={products?.product?.id} />
                            </Grid>

                        </Grid>
                    </div>
                </section>

                {/* Similar Products */}

                <section className='pt-10'>

                    <h1 className='py-5 text-xl font-bold'>You May like these</h1>

                    <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                        <HomeSectionCarousel sectionName={""} thirdLevelName={products.product?.category?.name} />
                    </div>
                </section>
            </div>
        </div>
    )
}
