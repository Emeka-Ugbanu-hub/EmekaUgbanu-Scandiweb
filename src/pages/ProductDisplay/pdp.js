import React from "react";
import "./pdp.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProductAttribute from "./partials/productAttribute";
import { addCart } from "../../slices/cartslice";
import getSvg from "../../svg/getSvg";

class PDP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgsrc: "",
      imgload:false,
    };
  }
  componentDidMount() {
    // here you have the id
    const id = this.props.match.params.productId;
    this.props.data.refetch({ pdpid: id });
    setTimeout(() => {
      this.setState({ imgsrc: this.props.data.product.gallery[0] });
    }, 1000);
  }
  handleClick(id, brand, image, attributes, prices) {
    const textindex = this.props.attrop;

    this.props.dispatch(
      addCart({ id, brand, image, attributes, textindex, prices })
    );
  }

  render() {
    const {
      data: { product, loading },
    } = this.props;

    if (loading) {
      return <img alt="suspense_loader" src={getSvg.loader} />;
    } else {
      let pdpamount = product.prices.filter(
        (price) => price.currency.symbol === this.props.currency.symbol
      )[0];

      return (
        <>
          <div className="pdp_container">
            <div className="image_section">
              <div className="image_column">
                {product.gallery.map((src,index) => {
                  return (
                    <img
                      src={src}
                      key={index}
                      alt="more_images"
                      onClick={() => this.setState({ imgsrc: src })}
                      className="img_col"
                    />
                  );
                })}
              </div>

              <div>
                {this.state.imgload ? null :  <img src={getSvg.loader} alt=""  className="loader_img"/>}
                <img
                  src={this.state.imgsrc}
                  alt=""
                  className="pdp_image"
                 onLoad={()=>this.setState({imgload:true})}
                  style={{ opacity: product.inStock ? 1 : 0.5 }}
                />
                {!product.inStock && (
                  <h2 className="outof_stock">OUT OF STOCK</h2>
                )}
              </div>
            </div>
            <div className="attribute_section">
              <h1 className="product_name">{product.name}</h1>
              <h1 className="product_brand">{product.brand}</h1>
              {product.attributes.map(({ type, name, items },index) => {
                return (
                  <>
                    <div style={{ marginTop: `${2}rem` }} key={index}>
                      <span className="pdp_name">{name}:</span>
                      <div style={{ marginTop: `${1}rem` }}>
                        <ProductAttribute
                          name={name}
                          item={items}
                          type={type}
                          initial={this.props.attrop}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
              <div style={{ marginTop: `${3}rem` }}>
                <span style={{ fontSize: `${1.2}rem`, fontWeight: 600 }}>
                  Price:
                </span>
                <span
                  style={{
                    fontSize: `${1.5}rem`,
                    fontWeight: 700,
                    display: "block",
                  }}
                >
                  {this.props.currency.symbol}
                  {pdpamount.amount}
                </span>
              </div>
              <button
                className="pdp_button"
                style={{
                  pointerEvents: product.inStock ? "all" : "none",
                }}
                onClick={() =>
                  this.handleClick(
                    product.name,
                    product.brand,
                    product.gallery[0],
                    product.attributes,
                    product.prices
                  )
                }
              >
                Add to cart!
              </button>

              <p dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </div>
        </>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  pdpinfo: state.cart.pdpinfo,
  attrop: state.cart.attrid,
  currency: state.currency.activeCurrency,
});

export default connect(mapStateToProps)(withRouter(PDP));
