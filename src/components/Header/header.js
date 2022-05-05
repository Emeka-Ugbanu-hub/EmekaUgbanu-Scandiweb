import React from "react";
import getSvg from "../../svg/getSvg";
import CategoryName from "./partials/CategoryName/CategoryNameGraphql";
import Currencyswitch from "./partials/CurrencySwitch/currenySwitchGraphql";
import CartItem from "./partials/CartItem/cartItem";
import "./header.css"
class Header extends React.Component {
  render() {
    return (
      <div
        className="header_container"
      >
        {/* category name grid*/}

        <div style={{ marginLeft: `${2}rem` ,background:"#fff"}}>
          <div
           className="categoryname"
          >
            <CategoryName />
          </div>
        </div>

        {/*Logo Grid */}
        <div style={{background:"#fff"}}>
          <img
            src={getSvg.logo}
            alt="logo"
            className="header_logo"
          />
        </div>

        {/*Cart Grid */}
        <div style={{ display: "flex",background:"#fff" }}>
          <Currencyswitch />
          <CartItem />
        </div>
      </div>
    );
  }
}

export default Header;
