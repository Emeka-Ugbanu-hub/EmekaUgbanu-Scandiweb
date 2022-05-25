import React from "react";
import getSvg from "../../svg/getSvg";
import CategoryName from "../../GraphQL/CategoryNameGraphql";
import Currencyswitch from "../../GraphQL/currenySwitchGraphql";
import CartItem from "./partials/CartItem/cartItem";
import "./header.css";
class Header extends React.Component {
  render() {
    return (
      <div className="header_container">
        {/* category name grid*/}

        <div className="header_grid_one">
          <div className="categoryname">
            <CategoryName />
          </div>
        </div>

        {/*Logo Grid */}
        <div className="header_grid_two">
          <img src={getSvg.logo} alt="logo" className="header_logo" />
        </div>

        {/*Cart Grid */}
        <div className="header_grid_three">
          <Currencyswitch />
          <CartItem />
        </div>
      </div>
    );
  }
}

export default Header;
