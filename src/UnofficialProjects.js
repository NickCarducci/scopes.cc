import React from "react";
import RequestProjectWidget from "./RequestProjectWidget";

class UnofficialProjects extends React.Component {
  render() {
    return (
      <div
        style={
          this.props.show
            ? {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                maxHeight: "100vh",
                height: "450px",
                transform: "translateX(0%)",
                transition: ".3s ease-in",
                backgroundColor: "rgb(30,20,30)",
                color: "white",
                zIndex: "2"
              }
            : {
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                height: "100%",
                transform: "translateX(100%)",
                transition: ".3s ease-out",
                opacity: "0"
              }
        }
      >
        <div
          style={{
            padding: "30px",
            display: "flex",
            position: "absolute",
            height: "min-content",
            flexDirection: "column",
            width: "50%"
          }}
        >
          {this.props.these.map(x => {
            var thisone = this.props.myCompanies.find(
              y => y.id === x.assigneeCompanyId
            );
            var thisalso = this.props.users.find(y => y.id === x.clientId);
            var thisassignee = this.props.users.find(
              y => y.id === x.assigneeId
            );
            return (
              <RequestProjectWidget
                isProject={true}
                x={x}
                thisone={thisone}
                person={thisassignee}
                client={thisalso}
                auth={this.props.auth}
              />
            );
          })}
          {this.props.these.length === 0 && "No invites to buy"}
        </div>
      </div>
    );
  }
}
export default UnofficialProjects;
