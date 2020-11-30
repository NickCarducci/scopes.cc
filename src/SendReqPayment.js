import React from "react";
import firebase from "./init-firebase";

class SendReqPayment extends React.Component {
  state = {};
  render() {
    const { thisclient } = this.props;
    return (
      <div style={{ backgroundColor: "rgb(25,25,35)" }}>
        {this.props.project.pendingPayment ? (
          <div
            onClick={() =>
              firebase
                .firestore()
                .collection("projects")
                .doc(this.props.project.id)
                .update({ pendingPayment: false })
            }
            onMouseEnter={() => this.setState({ highlight: true })}
            onMouseLeave={() => this.setState({ highlight: false })}
            style={
              this.state.highlight
                ? {
                    display: "flex",
                    position: "fixed",
                    backgroundColor: "navy",
                    width: "calc(100% - 38px)",
                    height: "41px",
                    borderRadius: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    top: "0px",
                    right: "0px",
                    zIndex: "9"
                  }
                : {
                    display: "flex",
                    position: "fixed",
                    backgroundColor: "rgb(100,150,200)",
                    width: "calc(100% - 38px)",
                    height: "41px",
                    borderRadius: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    top: "0px",
                    right: "0px",
                    zIndex: "9"
                  }
            }
          >
            {this.state.highlight ? "Undo" : "Waiting for confirmation"}
          </div>
        ) : (
          <div
            onClick={() => {
              if (thisclient) {
                var answer = window.confirm(
                  `are you sure this ask is ready? ${
                    thisclient.username
                  } will be able to pay`
                );
                if (answer) {
                  firebase
                    .firestore()
                    .collection("projects")
                    .doc(this.props.project.id)
                    .update({
                      pendingPayment: true
                    });
                }
              }
            }}
            style={{
              display: "flex",
              position: "fixed",
              backgroundColor: "navy",
              width: "max-content",
              height: "41px",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "center",
              padding: "0px 20px",
              color: "white",
              top: "0px",
              right: "0px",
              zIndex: "9"
            }}
          >
            Send for payment
          </div>
        )}
      </div>
    );
  }
}
export default SendReqPayment;
