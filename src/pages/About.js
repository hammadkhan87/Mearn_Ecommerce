import React from 'react'
import Layout from '../components/layouts/Layout'

const About = () => {
  return (
    <Layout title={"About us - Ecommerce App"} >
       <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/aboutus.png"
            alt="contactus"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-md-4 d-flex justify-content-center">
          <p className="mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default About
