import React from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [Auth, setAuth] = useAuth();

  return (
    <Layout title={"Dashboard"}>
      <div className="container-flui m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>{Auth?.user?.name}</h3>
              <h3>{Auth?.user?.email}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
