import React from "react";
import { connect } from "react-redux";
import { addCart } from "../../slices/cartslice";
import ProductAttribute from "../ProductDisplay/partials/productAttribute";
import "./cart.css";

class Cart extends React.Component {
  render() {
    /*create global variabe*/
    window.cartPageTotal = [];
    window.cartPageAmount = 0.0;
    return (
      <>
        <div
          style={{
            fontSize: `${2.3}rem`,
            fontWeight: 600,
            margin: `${1}em 0 0 ${2}em`,
          }}
        >
          CART
        </div>

        {this.props.cartfil.map(
          ({
            name,
            quantity,
            brand,
            img,
            attributes,
            attributeName,
            prices,
          }) => {
            let cartAmount = prices.filter(
              (price) => price.currency.symbol === this.props.currency.symbol
            )[0];
            const amount = cartAmount.amount * quantity;
            window.cartPageTotal.push(amount);
            const cartTotAmount = window.cartTotal.reduce(function (acc, obj) {
              return acc + obj;
            }, 0);
            window.cartPageAmount = cartTotAmount.toFixed(2);

            const quandecre = attributeName;
            const id = name;
            const quandecrename = name;
            const textindex = this.props.attrop;

            return (
              <>
                <hr
                  style={{
                    width: `${90}%`,
                    opacity: 0.3,
                    marginTop: `${4}rem`,
                  }}
                />
                <div className="cartPage_Container">
                  <div>
                    <h2 className="cartpage_name">{name}</h2>
                    <h3 className="cartpage_brand">{brand}</h3>
                    <h4 className="cartpage_amount">
                      {cartAmount.currency.symbol}
                      {cartAmount.amount}
                    </h4>
                    {attributes?.map(({ type, name, items }) => (
                      <>
                        <div
                          style={{
                            position: "absolute",
                            zIndex: 1,
                            width: `${50}%`,
                            height: `${60}px`,
                          }}
                        ></div>
                        <ProductAttribute
                          name={name}
                          item={items}
                          type={type}
                          work={attributeName}
                        />
                      </>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "center",
                    }}
                  >
                    <button
                      className="cartpage_quantityupdate"
                      onClick={() =>
                        this.props.dispatch(addCart({ textindex, id }))
                      }
                    >
                      +
                    </button>
                    <span
                      style={{
                        marginRight: `${4}rem`,
                        marginTop: `${1}rem`,
                        fontWeight: 600,
                        fontSize: `${1.3}rem`,
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      className="cartpage_quantityupdate"
                      onClick={() =>
                        this.props.dispatch(
                          addCart({ quandecre, textindex, quandecrename })
                        )
                      }
                    >
                      -
                    </button>
                  </div>
                  <div>
                    <img
                      src={img}
                      alt="cart_image"
                      className="cartpage_image"
                    />
                  </div>
                </div>
              </>
            );
          }
        )}
        <div
          className="cartpage_total"
        >
          <span>Total:</span>
          <span style={{ float: "right" }}>
            {this.props.currency.symbol}
            {window.cartPageAmount}
          </span>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart.value,
  cartfil: state.cart.filt,
  currency: state.currency.activeCurrency,
  jet: state.cart.geto,
  activeCategory: state.categoryName.value,
  qty: state.cart.cartQuantity,
  attrop: state.cart.attrid,
});
export default connect(mapStateToProps)(Cart);
