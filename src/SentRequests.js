import React from "react";
import Accepted from "./Accepted";
import Requesting from "./Requesting";

class SentRequests extends React.Component {
  state = {
    choosenType: "accepted",
    projects: [],
    requests: [],
    userQuery: ""
  };
  render() {
    var assignees = [];
    this.props.requests.map(x => {
      if (
        (x.clientId && x.clientId === this.props.auth.uid) ||
        (x.clientCompanyId &&
          this.props.myCompanies.find(y => y.id === x.clientCompanyId))
      ) {
        return assignees.push(x.requesteeId ? x.requesteeId : "unassigned");
      } else return null;
    });
    var unique = Array.from(new Set(assignees).values());
    var assigneePersonas = [];
    unique.map(x => {
      var thisone = this.props.users.find(y => y.id === x);
      return assigneePersonas.push(thisone ? thisone : "unassigned");
    });
    var assigned = [];
    this.props.projects.map(x => {
      if (
        (x.clientId && x.clientId === this.props.auth.uid) ||
        (x.clientCompanyId &&
          this.props.myCompanies.find(y => y.id === x.clientCompanyId))
      ) {
        return assigned.push(x.assigneeId);
      } else return null;
    });
    var unique1 = Array.from(new Set(assigned).values());
    var assignedPersonas = [];
    unique1.map(x => {
      var thisone = this.props.users.find(y => y.id === x);
      return thisone && assignedPersonas.push(thisone);
    });

    return (
      <div
        style={
          this.props.openRequests
            ? {
                flexDirection: "column",
                display: "flex",
                position: "fixed",
                overflowY: "auto",
                overflowX: "hidden",
                width: "100%",
                height: "100%",
                transform: "translateX(0%)",
                transition: ".3s ease-in",
                backgroundColor: "rgb(25,25,35)",
                zIndex: "2"
              }
            : {
                flexDirection: "column",
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
        {this.state.choosenType === "requested" ? (
          <div>
            <div
              onClick={() => this.setState({ choosenType: "accepted" })}
              style={{
                width: "min-content",
                height: "min-content",
                padding: "2px",
                borderRadius: "3px",
                backgroundColor: "rgb(50,50,180)",
                color: "white",
                zIndex: "19"
              }}
            >
              Requesting&nbsp;{assigneePersonas.length}
            </div>
          </div>
        ) : (
          <div
            onClick={() => this.setState({ choosenType: "requested" })}
            style={{
              width: "min-content",
              height: "min-content",
              padding: "2px",
              borderRadius: "3px",
              backgroundColor: "rgb(50,50,180)",
              color: "white",
              zIndex: "19"
            }}
          >
            Accepted&nbsp;&#10004;&nbsp;{assignedPersonas.length}
          </div>
        )}
        {this.state.choosenType === "accepted" ? (
          <div>
            <div
              onClick={() => this.setState({ choosenType: "requested" })}
              style={{
                width: "min-content",
                height: "min-content",
                padding: "2px",
                borderRadius: "3px",
                color: "grey",
                zIndex: "19"
              }}
            >
              Requesting&nbsp;{assigneePersonas.length}
            </div>
          </div>
        ) : (
          <div
            onClick={() => this.setState({ choosenType: "accepted" })}
            style={{
              width: "min-content",
              height: "min-content",
              padding: "2px",
              borderRadius: "3px",
              color: "grey",
              zIndex: "19"
            }}
          >
            Accepted&nbsp;{assignedPersonas.length}
          </div>
        )}
        <div>
          <Requesting
            show={this.state.choosenType === "requested"}
            myCompanies={this.props.myCompanies}
            auth={this.props.auth}
            assigneePersonas={assigneePersonas}
            requests={this.props.requests}
          />

          <Accepted
            show={this.state.choosenType === "accepted"}
            myCompanies={this.props.myCompanies}
            auth={this.props.auth}
            assignedPersonas={assignedPersonas}
            projects={this.props.projects}
          />
        </div>
      </div>
    );
  }
}
export default SentRequests;
