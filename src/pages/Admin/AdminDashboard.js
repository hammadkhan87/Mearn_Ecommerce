import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from './../../components/layouts/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
    const [Auth] = useAuth()
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className='row' >
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
                <div className='card w-75 p-3'>
                    <h4>Admin Name :{Auth?.user?.name}</h4>
                    <h4>Admin Email :{Auth?.user?.email}</h4>
                    <h4>Admin Contect :{Auth?.user?.phone}</h4>


                </div>
            </div>


        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
