'use client'
import {mens_kurta} from '../Data/mens_kurta'
import {filters} from '../Data/FilterData'
import { singleFilter } from '../Data/FilterData'
import { useState, useEffect } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from './ProductCard'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../State/Product/Action'

const sortOptions = [
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedRadioValues, setSelectedRadioValues] = useState({})
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({})
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch= useDispatch()
  const {product} = useSelector(store => store.product)


  const decodedQueryString=decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const colorValue=searchParams.get('color');
  const sizeValue=searchParams.get('size');
  const priceValue=searchParams.get('price');
  const discountValue=searchParams.get('discount');
  const sortValue=searchParams.get('sort');
  const pageValue=searchParams.get('page') || 1;
  const stockValue=searchParams.get('stock');
  const { item } = useParams()
  const {loading, error} = useSelector(store => store.product)

  useEffect(() => {
    const data = {
      category: item,
      colors: colorValue ? colorValue.split(',') : [],
      sizes: sizeValue ? sizeValue.split(',') : [],
      minPrice: priceValue ? Number(priceValue.split('-')[0]) : 0,
      maxPrice: priceValue ? Number(priceValue.split('-')[1]) : 0,
      minDiscount: discountValue || 0,
      sort: sortValue || 'price_low',
      pageNumber: pageValue - 1,
      pageSize: 10,
      stock: stockValue
    }
    dispatch(findProducts(data));
  }, [item, colorValue, sizeValue, priceValue, discountValue, sortValue, pageValue, stockValue]);

  // Initialize selected filters from URL on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    
    // Initialize radio values
    const initialRadioValues = {}
    singleFilter.forEach(section => {
      const value = searchParams.get(section.id)
      if (value) {
        initialRadioValues[section.id] = value
      }
    })
    setSelectedRadioValues(initialRadioValues)
    
    // Initialize checkbox values
    const initialCheckboxes = {}
    filters.forEach(section => {
      const values = searchParams.get(section.id)
      if (values) {
        const selectedValues = values.split(',')
        initialCheckboxes[section.id] = selectedValues
      } else {
        initialCheckboxes[section.id] = []
      }
    })
    setSelectedCheckboxes(initialCheckboxes)
  }, [location.search])

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search)
    
    // Get current values for this section
    const filterValues = searchParams.get(sectionId)
    let selectedValues = filterValues ? filterValues.split(',') : []
    
    if (selectedValues.includes(value)) {
      // Remove the value if it already exists
      selectedValues = selectedValues.filter(item => item !== value)
    } else {
      // Add the value if it doesn't exist
      selectedValues.push(value)
    }
    
    // Update the URL and state
    if (selectedValues.length > 0) {
      searchParams.set(sectionId, selectedValues.join(','))
    } else {
      searchParams.delete(sectionId)
    }
    
    const query = searchParams.toString()
    navigate({ search: query ? `?${query}` : '' })
    
    // Update local state for checkbox selections
    setSelectedCheckboxes(prev => ({
      ...prev,
      [sectionId]: selectedValues
    }))
  }

  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search)
    const value = e.target.value
    
    // Update the URL parameter
    searchParams.set(sectionId, value)
    const query = searchParams.toString()
    navigate({ search: `?${query}` })
    
    // Update the selected radio value in state
    setSelectedRadioValues(prev => ({
      ...prev,
      [sectionId]: value
    }))
  }

  // Check if a checkbox should be checked based on URL parameters
  const isCheckboxChecked = (sectionId, value) => {
    if (selectedCheckboxes[sectionId]) {
      return selectedCheckboxes[sectionId].includes(value)
    }
    return false
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                          <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  onChange={() => handleFilter(option.value, section.id)}
                                  checked={isCheckboxChecked(section.id, option.value)}
                                  value={option.value}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                  <path
                                    d="M3 7H11"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-24 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Product</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            'block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden',
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
                <div>
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold text-gray-700">Filter</h1>
                  <FilterListIcon className="text-2xl text-gray-700 cursor-pointer opacity-60" />
                </div>
                <form className="hidden lg:block">
                {filters.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    onChange={() => handleFilter(option.value, section.id)}
                                    checked={isCheckboxChecked(section.id, option.value)}
                                    value={option.value}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                    <path
                                      d="M3 7H11"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-indeterminate:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label htmlFor={`filter-${section.id}-${optionIdx}`} className="text-sm text-gray-600">
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                  
                  {singleFilter.map((section) => (
                    <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">{section.name}</span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                            <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                onChange={(e) => handleRadioFilterChange(e, section.id)}
                                id={`filter-radio-${section.id}-${optionIdx}`}
                                name={`filter-radio-${section.id}`}
                                type="radio"
                                value={option.value}
                                checked={selectedRadioValues[section.id] === option.value}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-radio-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
                </div>


              {/* Product grid */}
              <div className="lg:col-span-3">
    {loading && <div>Đang tải...</div>}
    {!loading && product?.products?.content && (
      <div className='flex flex-wrap justify-center bg-white py-5'>
        {product.products.content.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>
    )}
  </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}