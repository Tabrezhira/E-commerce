import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from "react-icons/fa";
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
import ProductsGrid from '../components/Products/ProductsGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../../redux/slices/productSlice';


function CollectionPage() {
    const {collection} = useParams()
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch()
    const {products, loading, error} = useSelector((state) => state.products)
    const queryParams = Object.fromEntries([...searchParams])
    // const [products, setProducts] = useState([])
    const sidebarRef =useRef(null) 
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() =>{
        dispatch(fetchProductsByFilters({collection, ...queryParams}))
    },[dispatch, collection, searchParams])

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleClickOutside = (e) => {
        //Close sidebar if clicked outside
        if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
            setSidebarOpen(false)
        }
    }

    useEffect(() => {
        // Add Event listner for clicks

        document.addEventListener('mousedown', handleClickOutside)

        //clean event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }

    },[])

    // useEffect(() => {
    //     setTimeout(() => {
    //         const fetchedProducts = [
    //             {
    //                 _id:1,
    //                 name:"Product 1",
    //                 price:100,
    //                 images:[{url:'https://picsum.photos/500/500?random=7'}]
    //             },
    //             {
    //                 _id:2,
    //                 name:"Product 2",
    //                 price:100,
    //                 images:[{url:'https://picsum.photos/500/500?random=8'}]
    //             },
    //             {
    //                 _id:3,
    //                 name:"Product 3",
    //                 price:100,
    //                 images:[{url:'https://picsum.photos/500/500?random=9'}]
    //             },
    //             {
    //                 _id:4,
    //                 name:"Product 4",
    //                 price:100,
    //                 images:[{url:'https://picsum.photos/500/500?random=10'}]
    //             },
    //             {
    //               _id:5,
    //               name:"Product 1",
    //               price:100,
    //               images:[{url:'https://picsum.photos/500/500?random=11'}]
    //             },
    //             {
    //               _id:6,
    //               name:"Product 2",
    //               price:100,
    //               images:[{url:'https://picsum.photos/500/500?random=12'}]
    //             },
    //             {
    //               _id:7,
    //               name:"Product 3",
    //               price:100,
    //               images:[{url:'https://picsum.photos/500/500?random=13'}]
    //             },
    //             {
    //               _id:8,
    //               name:"Product 4",
    //               price:100,
    //               images:[{url:'https://picsum.photos/500/500?random=14'}]
    //             }
    //         ];
    //         setProducts(fetchedProducts)
    //     })
    // },[])
  return (
    <div className='flex flex-col lg:flex-row'>
        {/* {Mobile Filter button} */}
        <button onClick={toggleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
            <FaFilter className='mr-2' /> Filters
        </button>

        {/* Filter Sidebar */}
        <div ref={sidebarRef} className={`${isSidebarOpen ? "translate-x-0" : '-translate-x-full'} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>
        <div className='flex-grow p-4'>
            <h2 className='text-2xl uppercase mb-4'>
            All Collection
            </h2>
             {/* Sort options */}
             <SortOptions/>
             {/* Product Grid */}
             <ProductsGrid products={products} loading={loading} error={error}/>
        </div>
    </div>
  )
}

export default CollectionPage