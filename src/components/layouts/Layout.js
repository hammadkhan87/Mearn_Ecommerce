import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';


const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
       
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords}/>
          <meta name="author" content={author} />
        

        <title>{title}</title>
      </Helmet>
      <Header />

      <main style={{ minHeight: "72vh" }}>{children}
      <Toaster/>
      </main>
      <Footer />
    </div>
  );
};
//default props for seo 
Layout.defaultProps = {
  title:"Ecommerce app",
  description:"mern stack app",
  keywords:"mern,react,node,mongodb",
  author:'hammad'
}
export default Layout;
