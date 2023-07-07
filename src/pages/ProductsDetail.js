import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import { toast } from 'react-hot-toast'

const ProductsDetail = () => {
   const params = useParams()
   const [product,setProduct]= useState({})
   const [category,setCategory]=useState({})
   const [relatedProducts,setrelatedProducts]=useState([])
   const[cart,setCart]=useCart()

   useEffect(()=>{
      if(params?.slug){
        getProducts()
      }
   },[params?.slug])
    const getProducts = async ()=>{

        try {
            const {data}= await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            
            getSimilarProducts(data?.product._id,data?.product.category)
        } catch (error) {
            console.log(error)
        }
    }

   
        const getCategory = async ()=>{
            if(product){
            try {
                
                const {data}= await axios.get(`http://localhost:8080/api/v1/category/single-category-by-id/${product.category}`)
                setCategory(data?.category)
                
            } catch (error) {
                console.log(error)
            }
        }
    }            

    useEffect(()=>{
        getCategory()
    },[product])

    //get smilar products
    const getSimilarProducts = async (pid, cid) => {
        try {
            console.log(pid,cid)
          const { data } = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`);
          setrelatedProducts(data?.products);
        } catch (error) {
          if (error.response) {
            // The request was made and the server responded with a status code outside of the range 2xx
            console.error('Request failed with status:', error.response.status);
            console.log('Response data:', error.response.data);
            console.log('Response headers:', error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server:', error.request);
          } else {
            // Something else happened while setting up the request
            console.error('Error setting up the request:', error.message);
          }
        }
      };
      

  return (
    <Layout>
        <div className="row container mt-2">       
         <div className="col-md-6">
         <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    width={'300px'}
                    height={"300px"}
                  />
         </div>
        <div className="col-md-6 text-center">
            <h1>Product Detail</h1>
            <h6>Name : {product?.name}</h6>
            <h6>Description : {product?.description}</h6>
            <h6>Price : {product?.price}</h6>
            <h6>Category : {category?.name}</h6>
            {/* <h6>Shipping : {product.shipping}</h6> */}
            <button className="btn btn-secondary ms-1" onClick={()=>{setCart([...cart,product])
                     localStorage.setItem('cart',JSON.stringify([...cart,product]))
                     toast.success("item added") }}   >
                    Add To Cart
                  </button>
        </div>
        </div>
        <div className="row">
            <h2>similar products</h2>
            {JSON.stringify(relatedProducts,null,4)}
        </div>
    </Layout>
  )
}

export default ProductsDetail