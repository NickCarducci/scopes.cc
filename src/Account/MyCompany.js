import React from "react";

class MyCompany extends React.Component {
  render() {
    const { x } = this.props;
    return <div style={{ padding: "10px" }}>{x.businessName}</div>;
  }
}
export default MyCompany;
