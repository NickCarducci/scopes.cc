import React from "react";
import MyCompany from "./MyCompany";

class ReportsHeader extends React.Component {
  state = {};
  render() {
    return (
      <div
        style={
          this.props.revenueShow || this.props.expenseShow
            ? {
                display: "flex",
                position: "relative",
                height: "min-content",
                top: "0",
                transform: "translateY(-280px)",
                width: "100%",
                transition: "transform .3s ease-out",
                flexDirection: "column"
              }
            : {
                display: "flex",
                position: "relative",
                height: "min-content",
                top: "0",
                transform: "translateY(0)",
                width: "100%",
                transition: "transform .3s ease-in",
                flexDirection: "column"
              }
        }
      >
        <div
          style={{
            display: "flex",
            position: "relative",
            backgroundColor: "rgb(20,20,40)",
            borderBottom: "1px white solid",
            height: "56px",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            color: "teal"
          }}
        >
          <div
            onClick={
              this.state.showMyCompanies
                ? () => this.setState({ showMyCompanies: false })
                : () => this.setState({ showMyCompanies: true })
            }
            style={{
              display: "flex",
              position: "absolute",
              left: "20px",
              width: "36px",
              height: "36px",
              backgroundColor: "rgb(20,20,40)",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "5px",
              color: "white",
              fontSize: "30px",
              transform: "rotate(180deg)"
            }}
          >
            ^
          </div>
          <h2>${this.props.balance}</h2>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: "20px",
              width: "36px",
              height: "36px",
              backgroundColor: "rgb(20,20,40)",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "5px",
              color: "white",
              fontSize: "30px"
            }}
          >
            +
          </div>
        </div>

        <div
          style={
            this.state.showMyCompanies
              ? {
                  display: "flex",
                  position: "relative",
                  backgroundColor: "white",
                  borderTop: "2px teal solid",
                  height: "min-content",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "teal",
                  transform: "height .3s ease-in",
                  flexDirection: "column"
                }
              : {
                  display: "flex",
                  position: "relative",
                  backgroundColor: "white",
                  borderTop: "2px teal solid",
                  height: "0px",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "teal",
                  maxheight: "0",
                  transform: "height .3s ease-out",
                  zIndex: "-1",
                  opacity: "0"
                }
          }
        >
          <div style={{ padding: "10px" }}>{this.props.user.username}</div>
          {this.props.myCompanies.length > 0 ? (
            this.props.myCompanies.map(x => {
              return <MyCompany x={x} />;
            })
          ) : (
            <div style={{ padding: "10px" }}>
              you have no other companies registered
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReportsHeader;
