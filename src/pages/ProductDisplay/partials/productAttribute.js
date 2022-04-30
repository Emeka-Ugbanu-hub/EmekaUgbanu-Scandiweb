import React from "react";
import { addCart } from "../../../slices/cartslice";
import "./productAttribute.css";
import { connect } from "react-redux";
import getSvg from "../../../svg/getSvg";

class ProductAttribute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeText: this.props.initial,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({ activeText: this.props.initial });
    }, 1000);
  }
  handleClick = (index) => {
    const textindex = index;

    this.setState({ activeText: textindex });

    this.props.dispatch(addCart({ textindex }));
  };
  render() {
    if (this.props.type === "text") {
      return (
        <>
          <div style={{ display: "flex" }}>
            {this.props.item.map(({ value }, index) => {
              return (
                <>
                  <div key={index}>
                    <div
                      className={`text_box ${
                        this.state.activeText === index ? "active_text" : ""
                      }`}
                      onClick={() => this.handleClick(index)}
                    >
                      {value}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
    }
    if (this.props.type === "swatch")
      return (
        <>
          <div style={{ display: "flex" }}>
            {this.props.item.map(({ value }, index) => {
              return (
                <>
                  <div
                    className="swatch_box"
                    style={{
                      background:
                        value,

                      border:
                        value === "white" || value === "#FFFFFF"
                          ? `${1}px solid black`
                          : "none",
                    }}
                    key={index}
                    onClick={() => this.handleClick(index)}
                  >
                    <img
                      className="swatch_active"
                      style={{
                        display:
                          this.state.activeText === index ? "block" : "none",
                      }}
                      src={getSvg.check}
                    />
                    
                  </div>
                </>
              );
            })}
          </div>
        </>
      );
  }
}

const mapStateToProps = (state) => ({
  atttr: state.cart.attrid,
});

export default connect(mapStateToProps)(ProductAttribute);
