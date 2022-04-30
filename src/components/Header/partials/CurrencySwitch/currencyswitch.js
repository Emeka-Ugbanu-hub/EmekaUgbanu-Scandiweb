import React from "react";
import { connect } from "react-redux";
import { currencySwitcher } from "../../../../slices/currencyslice";
import "./currencySwitch.css";
import getSvg from "../../../../svg/getSvg";

class CurrencySwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };

    this.menuRef = React.createRef();
    this.buttonRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
  handleClickOutside(event) {
    if (this.menuRef.current && this.buttonRef.current) {
      if (
        !this.menuRef.current.contains(event.target) &&
        !this.buttonRef.current.contains(event.target)
      ) {
        this.setState({ isActive: false });
      }
    }
  }
  render() {
    const {
      data: { currencies, loading },
    } = this.props;
    if (loading) {
      return <img alt="suspense_loader" src={getSvg.loader} />;
    } else {
      return (
        <>
          <div className="currency_switch_container">
            <div
              onClick={() => this.setState({ isActive: !this.state.isActive })}
              ref={this.buttonRef}
              className="svg"
              style={{ margin: `${1}rem 0 0 ${5}rem` }}
            >
              {this.props.currency.symbol}
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d={
                    this.state.isActive
                      ? "M1 3.5L4 0.5L7 3.5"
                      : "M1 0.5L4 3.5L7 0.5"
                  }
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <ul
              ref={this.menuRef}
              className="currency_dropdown"
              style={{ opacity: this.state.isActive ? "1" : "0" }}
            >
              {currencies.map(({ label, symbol }, index) => (
                <li
                  style={{ margin: `${10}px ${25}px 0 0` }}
                  key={index}
                  onClick={() =>
                    this.props.dispatch(currencySwitcher({ symbol, label }))
                  }
                >
                  {symbol} {label}
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  currency: state.currency.activeCurrency,
});
export default connect(mapStateToProps)(CurrencySwitch);
