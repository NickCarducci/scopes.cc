import React from "react";
import RequestProjectWidget from "./RequestProjectWidget";

class Accepted extends React.Component {
  state = {
    projects: [],
    requests: []
  };
  render() {
    const { show, assignedPersonas, projects, auth, myCompanies } = this.props;
    return (
      <div
        style={
          show
            ? {
                padding: "30px",
                display: "flex",
                position: "absolute",
                height: "min-content",
                flexDirection: "column",
                width: "100%",
                alignItems: "flex-start"
              }
            : { display: "none" }
        }
      >
        {assignedPersonas.map(person => {
          var thisAssignee =
            person.id &&
            projects.filter(
              x => x.assigneeId === person.id && x.clientId === auth.uid
            );
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                height: "min-content",
                width: "100%"
              }}
            >
              <div
                onMouseEnter={() => this.setState({ highh: person.id })}
                onMouseLeave={() => this.setState({ highh: null })}
                style={{
                  width: "min-content",
                  display: "flex",
                  alignItems: "flex-start"
                }}
              >
                {thisAssignee.map(x => {
                  var thisone = myCompanies.find(
                    y => y.id === x.assigneeCompanyId
                  );

                  if (this.state.highlighted === person.id) {
                    return (
                      <RequestProjectWidget
                        highh={this.state.highh === person.id}
                        display={true}
                        isProject={true}
                        x={x}
                        thisone={thisone}
                        user={this.props.user}
                        person={person}
                      />
                    );
                  } else return null;
                })}
              </div>
              <div
                onMouseEnter={() => this.setState({ high: person.id })}
                onMouseLeave={() => this.setState({ high: null })}
                onClick={() => this.setState({ highlighted: person.id })}
                style={
                  this.state.highlighted === person.id ||
                  this.state.high === person.id ||
                  this.state.highlighted === person ||
                  this.state.high === person
                    ? {
                        backgroundColor: "white",
                        padding: "0px 20px",
                        borderBottom: "rgb(25,25,30) solid 1px"
                      }
                    : {
                        backgroundColor: "grey",
                        padding: "0px 20px",
                        borderBottom: "rgb(25,25,30) solid 1px"
                      }
                }
              >
                {person.username ? person.username : person}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Accepted;
