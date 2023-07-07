import React ,{useState,useEffect} from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {Select} from "antd"
import { useNavigate } from 'react-router-dom'

const {Option} = Select



const CreateProducts = () => {
  const navigate = useNavigate()
  const [categories,setCategories] = useState([])
  const [photo,setPhoto] = useState("")
  const [name,setName] = useState("")
  const [category,setCategory] = useState("")
  const [description,setdescription] = useState("")
  const [price,setPrice] = useState("")
  const [quantity,setQuantity] = useState("")
  const [shipping,setShipping] = useState("")
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong While Geting Categories");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const  handleCreate = async(e)=>{
    e.preventDefault()
    try {
      const productdata = new FormData()
      productdata.append("name",name)
      productdata.append("description",description)
      productdata.append("price",price)
      productdata.append("quantity" ,quantity)
      productdata.append("category",category)
      productdata.append("photo",photo)
      productdata.append("shipping",shipping)
      

      const {data} = axios.post("http://localhost:8080/api/v1/product/create-product",productdata)
      if(data?.success){
        toast.error(data?.message)
      }else{
        
        toast.success("Product created successfully") 
        navigate('/dashboard/admin/products')
      }
      
    } catch (error) {
      console.log(error)
      toast.error("some thing went wrong")
    }
  }
  return (
    <Layout title={"Dashboard-Create products "} >
      <>
       <div className='container-fluid m-3 p-3' > 
              <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>  
            </div>
            <div className='col-md-9'>
            <h1>Create Product</h1>
            <div className='m-1 w-75'>
              <Select bordered={false} placeholder="Select a category" size="large" showSearch 
              className='form-select mb-3' onChange={(value)=>{setCategory(value)}} >
                {
                  categories?.map((c)=>(<Option key={c._id} value={c._id} >{c.name}</Option>))
                }

              </Select>
              <div className='mb-3'>
                <label  className='btn btn-outline-secondary col-md-12'>
                  {photo ? photo.name : "upload image"} 
                <input type='file' name='photo' accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div className='mb-3'>
                {photo &&(
                  <div  className='text-center' >
                    <img src={URL.createObjectURL(photo)} alt='photo' height={"200px"} className='img img-responsive' al/>
                  </div>
                )}
              </div>
              <div className='mb-3'>
                <input type='text' value={name} placeholder='Write a name'
                className='form-control'
                onChange={(e)=> setName(e.target.value)}
                />
              </div><div className='mb-3'>
                <input type='text' value={description} placeholder='Write Description'
                className='form-control'
                onChange={(e)=> setdescription(e.target.value)}
                
                />
              </div>
              <div className='mb-3'>
                <input type='number' value={price} placeholder='Enter Price'
                className='form-control'
                onChange={(e)=> setPrice(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <input type='number' value={quantity} placeholder='Enter Quantity'
                className='form-control'
                onChange={(e)=> setQuantity(e.target.value)}
                />
              </div>
              <div className='mb-3'>
                <Select  bordered={false} placeholder="Select shipping" size="large" 
              className='form-select mb-3' onChange={(value)=>{setShipping(value)}} >
                
                <Option value="0">
                  No
                </Option>
                <Option value="1" >
                  Yes
                </Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handleCreate} > Create Product</button>
              </div>

            </div>
            </div>
        </div>
        </div>

      </>
    </Layout>
  )
}

export default CreateProducts
