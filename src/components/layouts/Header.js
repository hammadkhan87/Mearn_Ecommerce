import React from "react";
import { NavLink, Link } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import Dashboard from "./../../pages/user/Dashboard";
import SearchInput from "../Forms/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import {Badge} from "antd"
const Header = () => {
  const [Auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart,setCart] = useCart()
  const handlelogout = () => {
    setAuth({
      ...Auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("logout successfully");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <GiShoppingBag style={{ alignItems: "center" }} /> Ecommerce App
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>

                <ul className="dropdown-menu" style={{textDecoration: "none"}}>
                  <li style={{textDecoration: "none"}}>
                    <Link classname="dropdown-item" to={`/categories`}>
                      All categories
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <div>
                      <li style={{textDecoration: "none"}}>
                        <Link
                          classname="dropdown-item"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    </div>
                  ))}
                </ul>
              </li>
              {!Auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  <div>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link">
                        Login
                      </NavLink>
                    </li>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {Auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            Auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                          href="#"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/login"
                          className="dropdown-item"
                          onClick={handlelogout}
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
              <Badge count={cart?.length} className="m-2" >
              <NavLink to="/cart" className="nav-link" style={{fontSize:"18px", fontWeight:"400"}}>
                  Cart
                </NavLink>
               </Badge>
               
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
