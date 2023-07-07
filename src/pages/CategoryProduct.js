import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-2">
        <h4 className="text-center">Category -{category?.name}</h4>
        <h2 className="text-center">{products?.length}</h2>
        <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text">$ {p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=>{navigate(`/product/${p.slug}`)}} >More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
