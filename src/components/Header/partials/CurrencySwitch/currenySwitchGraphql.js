import { graphql } from "@apollo/client/react/hoc";
import { gql } from "@apollo/client";
import CurrencySwitch from "./currencyswitch.js";

export default graphql(gql`
  query {
  currencies {
      label,
      symbol
  }

  }
`)(CurrencySwitch);
