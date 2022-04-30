import React from "react";
import getSvg from "../../../../svg/getSvg";
import { connect } from "react-redux";
import { addCart } from "../../../../slices/cartslice";
import "./cartItem.css";
import ProductAttribute from "../../../../pages/ProductDisplay/partials/productAttribute";
import { Link } from "react-router-dom";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      qty:this.props.cartfil.length
    };
    this.minicartRef = React.createRef();
    this.cartbuttonRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.minicartRef.current && this.cartbuttonRef.current) {
      if (
        !this.minicartRef.current.contains(event.target) &&
        !this.cartbuttonRef.current.contains(event.target)
      ) {
        this.setState({ open: false });
      }
    }
  }
 
  
  render() {
   
    
     
window.cartTotal = []
window.totalAmount= 0.00
      return (
        <>
          <div>
            <div onClick={() => this.setState({ open: !this.state.open })}
                ref={this.cartbuttonRef}>
              <div className="badge" style={{opacity:this.props.qty <= 0 ? 0 : 1}}>
                <div className="badge_text" >{this.props.qty > 9 ? "9+" : this.props.qty}</div>
              </div>
              <img
                src={getSvg.cart}
                alt="cart"
                className="cart"
                
              />
            </div>
            <div
              className="overlay"
              style={{ display: this.state.open ? "block" : "none" }}
            >
              <div className="mini_cart" ref={this.minicartRef}>

                <p>
                  <span className="bold_text">My bag</span>,{" "}
                  {this.props.cartfil.length} item(s)
                </p>
                
                <div style={{overflowY:"scroll", width:`${100}%`,height:"fit-content",maxHeight:`${50}vh`,position:"relative"}}>
                {this.props.cartfil.map(
                  ({ name, quantity, brand , img, attributes,attributeName,prices }) => {
                   
                      let cartAmount = prices.filter(
                        (price) =>
                          price.currency.symbol === this.props.currency.symbol
                      )[0];
                      const amount = cartAmount.amount * quantity
                 window.cartTotal.push(amount)
                 const cartTotAmount = window.cartTotal.reduce(function (acc, obj) {
                  return acc + obj;
                }, 0);
                window.totalAmount = cartTotAmount.toFixed(2)
                      const quanincre = attributeName
                     const quandecre = attributeName
                    const quanincrename = name
                    const quandecrename = name
                      const textindex = this.props.attrop

                    return (
                      <>
                        <div className="cartItem_Container">
                          <div>
                            <h2 className="cart_name">{name}</h2>
                            <h3 className="cart_brand">{brand}</h3>
                            <h4 className="cart_amount">{cartAmount.currency.symbol}{cartAmount.amount}</h4>
                            {attributes?.map(({ type, name, items }) => (
                              <>
                              <div style={{position:"absolute",zIndex:1,width:`${50}%`,height:`${60}px`}}>
                                 </div>
                              <ProductAttribute
                                name={name}
                                item={items}
                                type={type}
                                initial={attributeName}
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
                            <button onClick={()=>this.props.dispatch(addCart({quanincre,textindex,quanincrename}))} >+</button>
                            <span>{quantity}</span>
                            <button onClick={()=>this.props.dispatch(addCart({quandecre,textindex,quandecrename}))} >-</button>
                          </div>
                          <div>
                            <img src={img} alt="cart_image" className="cart_image" />
                          </div>
                        </div>
                      </>
                    );
                  }
                )}
                 </div>
                <div style={{marginTop:`${1}rem`,fontSize:`${1.1}rem`}}>
                  <span>Total:</span>
                  <span style={{float:"right",marginRight:`${1}rem`,fontWeight:700}}>{this.props.currency.symbol}{window.totalAmount}</span>
                </div>
                <div style={{marginTop:`${1}rem`}}>
                  <button className="cart_button_one">
                  <Link to={"/cart"} style={{textDecoration:"none",color:"black"}} >VIEW BAG</Link>
                  </button>
                  <button className="cart_button_two">CHECKOUT</button>
                </div>


                </div>

             
            </div>
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
  qty:state.cart.cartQuantity,
  attrop:state.cart.attrid
});

export default connect(mapStateToProps)(CartItem);
