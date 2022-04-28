import React from "react";
import getSvg from "../../svg/getSvg";
import CategoryName from "./partials/CategoryName/CategoryNameGraphql";
import Currencyswitch from "./partials/CurrencySwitch/currenySwitchGraphql";
import CartItem from "./partials/CartItem/cartItem";
class Header extends React.Component {
  render() {
    return (
      <div
        style={{
          width: `${100}%`,
          height: `${10}vh`,
          display: "grid",
          gridTemplateColumns: `${20}% ${65}% ${15}%`,
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
        }}
      >
        {/* */}

        <div style={{ marginLeft: `${2}rem` }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              fontSize: `${0.8}rem`,
              marginTop: `${1}rem`,
            }}
          >
            <CategoryName />
          </div>
        </div>

        {/*Logo Grid */}
        <div>
          <img
            src={getSvg.logo}
            alt="logo"
            style={{ margin: `${1}rem 0 0 ${50}%` }}
          />
        </div>

        {/*Cart Grid */}
        <div style={{ display: "flex" }}>
          <Currencyswitch />
          <CartItem />
        </div>
      </div>
    );
  }
}

export default Header;
