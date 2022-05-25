import React from "react";
import ProductList from "../../GraphQL/productListGraphql";

class Home extends React.Component {
  render() {
    return (
      <>
        <ProductList />
      </>
    );
  }
}

export default Home;
