import React from 'react'
import Layout from '../components/layouts/Layout'
import { Link } from 'react-router-dom';

const Pagenotfount = () => {
  return (
    <div>
        <Layout title={"Go back -Page not found"}>
        <div className='pnf'>
          <h1 className='pnf-title'>404</h1>
          <h2 className='pnf-heading'>Oops ! Page not Found</h2>
          <Link to='/' className='pnf-btn'>Go back</Link>


        </div>
      </Layout>
    </div>
  )
}

export default Pagenotfount
