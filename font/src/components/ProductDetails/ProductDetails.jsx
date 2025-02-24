  /*
    This example requires some changes to your config:
    
    ```
    // tailwind.config.js
    module.exports = {
      // ...
      theme: {
        extend: {
          gridTemplateRows: {
            '[auto,auto,1fr]': 'auto auto 1fr',
          },
        },
      },
    }
    ```
  */
  'use client'

  import { useState } from 'react'
  import { Radio, RadioGroup } from '@headlessui/react'
  import { Rating, Button, Grid, Box, LinearProgress } from '@mui/material'
  import ProductReviewCard from './ProductReviewCard'
  import {mens_kurta} from '../../components/Data/mens_kurta'
  import HomeSectionCard from '../HomeSectionCard/HomeSectionCard'

  const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
      { id: 1, name: 'Men', href: '#' },
      { id: 2, name: 'Clothing', href: '#' },
    ],
    note:
      'The Basic Tee 6-Pack is a collection of our three signature colors.', 
    images: [
      {
        src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
        alt: 'Two each of gray, white, and black shirts laying flat.',
      },
      {
        src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
        alt: 'Model wearing plain black basic tee.',
      },
      {
        src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
        alt: 'Model wearing plain gray basic tee.',
      },
      {
        src: 'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
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
      { name: 'XL', inStock: true },
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
  const reviews = { href: '#', average: 4, totalCount: 117, reviewsCount: 35 }

  const reviewsWrite = [
    {
      name: 'Sang',
      date: 'February 23 2025',
      rating: 4.5,
      review: 'Nice product!!!!!!!!!',
      avatar: 'https://nguoiduatin.mediacdn.vn/thumb_w/930/media/luong-quoc-tiep/2020/11/09/han-tin-duoc-luu-danh-thien-co-khong-chi-boi-bach-chien-bach-thang.jpg'
    },
    {
      name: 'Lila',
      date: 'February 24 2025',
      rating: 4.8,
      review: 'Love this so much!!!!',
      avatar: 'https://nguoiduatin.mediacdn.vn/thumb_w/930/media/luong-quoc-tiep/2020/11/09/han-tin-duoc-luu-danh-thien-co-khong-chi-boi-bach-chien-bach-thang.jpg'
    },
    {
      name: 'Kai',
      date: 'February 25 2025',
      rating: 4.3,
      review: 'Really cool item!!',
      avatar: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg'
    },
    {
      name: 'Mina',
      date: 'February 26 2025',
      rating: 4.7,
      review: 'Super happy with it!!!!!',
      avatar: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg'
    }
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  export default function ProductDetails() {
    const [selectedColor, setSelectedColor] = useState(product.colors[0])
    const [selectedSize, setSelectedSize] = useState(product.sizes[2])

    return (
      <div className="bg-white mb-[-38px]">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {product.breadcrumbs.map((breadcrumb) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </a>
                    <svg
                      fill="currentColor"
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {product.name}
                </a>
              </li>
            </ol>
          </nav>


          <section className='flex flex-col lg:flex-row gap-12 items-start'>
          
          {/* Image gallery */}
          <div className="flex flex-col items-center lg:w-1/2">
              <div className='overflow-hidden rounded-lg max-w-[35rem] max-h-[40rem]'>
                  <img
                  alt={product.images[0].alt}
                  src={product.images[0].src}
                  className="hidden size-full rounded-lg object-cover lg:block"
              />
              </div>

            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              {product.images.map((image, index) => (
                <div key={index} className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[10rem] max-h-[12rem]">
                  <img
                    alt={image.alt}
                    src={image.src}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="lg:w-1/2">
            <div className="lg:col-span-2">
              <h1 className="text-lg lg:text-xl text-gray-900 sm:text-3xl font-semibold">{product.name}</h1>

              <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>{product.note}</h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              
              <div className='flex items-center space-x-5 text-lg text-gray-900 mt-6 lg:text-xl'>
                <p className='font-semibold'>$199</p>
                <p className='opacity-50 line-through'>$211</p>
                <p className='text-green-500 font-semibold'>5% off</p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className='flex items-center space-x-3.5'>
                  <Rating name="read-only" value={reviews.average} readOnly />
                  <p className='opacity-50 text-sm'>{reviews.totalCount} Ratings</p>
                  <p className='ml-3 text-sm font-medium text-fuchsia-600 hover:text-indigo-500'>{reviews.reviewsCount} Reviews</p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-center gap-x-3">
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-hidden data-checked:ring-2 data-focus:data-checked:ring-3 data-focus:data-checked:ring-offset-1',
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(color.class, 'size-8 rounded-full border border-black/10')}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>

                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? 'cursor-pointer bg-white text-gray-900 shadow-xs'
                              : 'cursor-not-allowed bg-gray-50 text-gray-200',
                            'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6',
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <div className='mt-3'>
                  <Button variant='contained' sx={{p:"2rem", py:"1rem", bgcolor: "#ab00ff"}} >
                    Add to cart
                  </Button>
                </div>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">{product.description}</p>
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

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        
          </section>

          {/* rating and reviews */}
          <section className="lg:px-20">
            <h1 className="font-semibold text-4xl pb-4 border-t-2 pt-7">Recent Review & Rating</h1>

            <div className="p-5">
              <Grid container spacing={7}>
                {/* Recent Review & Rating - Equal width with Product Ratings */}
                <Grid item xs={6}>
                  <div className="space-y-5">
                    {reviewsWrite.map((review, index) => (
                      <ProductReviewCard
                        key={index}
                        name={review.name}
                        date={review.date}
                        rating={review.rating}
                        review={review.review}
                        avatar={review.avatar} // Fixed prop name from 'avt' to 'avatar'
                      />
                    ))}
                  </div>
                </Grid>

                {/* Product Ratings - Equal width with Recent Review & Rating */}
                <Grid item xs={6} >
                  <h1 className="text-4xl font-semibold pb-1">Product Ratings</h1>

                  <div className="flex items-center">
                    <Rating readOnly value={reviews.average} name="half-rating" precision={0.5} />
                    <p>{reviews.totalCount} Ratings</p>
                  </div>

                  <Box className="mt-5 space-y-3.5">
                    {[
                      { label: 'Excellent', value: 80, color: 'success' },
                      { label: 'Very Good', value: 70, color: 'info' },
                      { label: 'Good', value: 60, color: 'secondary' },
                      { label: 'Normal', value: 30, color: 'warning' },
                      { label: 'Poor', value: 20, color: 'error' },
                    ].map((rating, index) => (
                      <Grid key={index} container alignItems="center" spacing={2}>
                        <Grid item xs={2}>
                          <p className="text-sm font-medium text-gray-700">{rating.label}</p>
                        </Grid>
                        <Grid item xs={8}>
                          <LinearProgress
                            sx={{
                              bgcolor: '#d0d0d0', // Background color of the progress bar
                              borderRadius: 2, // Smaller radius for a flatter look
                              height: 6, // Thinner bar to match the image
                            }}
                            variant="determinate"
                            value={rating.value}
                            color={rating.color} // Dynamic color based on rating
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </div>
          </section>


          {/* rating and reviews  */}
          <section className='lg:pt-10 lg:px-20'>
            
            <h1 className='font-semibold text-4xl py-7 border-t-2 '> Similar Product</h1>

            <div className='flex flex-wrap gap-8 justify-center space-y-5'>
                {mens_kurta.slice(0, 10).map((pro, index)=>(
                  <HomeSectionCard key={index} product={pro} />
                ))}
            </div>
          </section>
        </div>
      </div>
    )
  }
