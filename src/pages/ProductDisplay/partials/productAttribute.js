import React from "react";
import { addCart } from "../../../slices/cartslice";
import "./productAttribute.css";
import { connect } from "react-redux";

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
                  <div>
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
                        this.props.activeText === 1 ? "purple" : value,

                      border:
                        value === "white" || value === "#FFFFFF"
                          ? `${1}px solid black`
                          : "none",
                    }}
                    onClick={() => this.handleClick(index)}
                  >
                    <div
                      className="swatch_active"
                      style={{
                        display:
                          this.props.activeText === index ? "block" : "none",
                      }}
                    ></div>
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
