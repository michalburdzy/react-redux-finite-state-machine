import React from "react";
import { connect } from "react-redux";

const MainApp = props => (
  <div>
    <button onClick={() => props.getData()}>fetch data</button>
    {/* {props.data && <div>{props.data}</div>} */}
  </div>
);

const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => {
  return {
    getData: () => dispatch({ type: "GET_DATA" })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
