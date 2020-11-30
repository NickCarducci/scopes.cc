import React from "react";
import RequestProjectWidget from "./RequestProjectWidget";

class Requesting extends React.Component {
  state = {};
  render() {
    const { show, assigneePersonas, requests, auth, myCompanies } = this.props;
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
        <div className="loading" />
        {assigneePersonas.map(person => {
          var thisAssignee = requests.filter(
            x =>
              (x.requesteeId === person.id && x.clientId === auth.uid) ||
              (!x.requesteeId && person === "unassigned")
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
                  if (
                    this.state.highlighted === person.id ||
                    person === this.state.highlighted
                  ) {
                    return (
                      <RequestProjectWidget
                        highh={this.state.highh === person.id}
                        display={true}
                        x={x}
                        thisone={thisone}
                        person={person}
                      />
                    );
                  } else return null;
                })}
              </div>
              <div
                onMouseEnter={() => this.setState({ high: person.id })}
                onMouseLeave={() => this.setState({ high: null })}
                onClick={() =>
                  this.setState({
                    highlighted: person.id ? person.id : person
                  })
                }
                style={
                  this.state.highlighted === person ||
                  this.state.highlighted === person.id ||
                  this.state.high === person.id ||
                  this.state.high === person
                    ? {
                        display: "flex",
                        backgroundColor: "white",
                        borderBottom: "rgb(25,25,30) solid 1px"
                      }
                    : {
                        display: "flex",
                        backgroundColor: "grey",
                        borderBottom: "rgb(25,25,30) solid 1px"
                      }
                }
              >
                &nbsp;
                {(this.state.highlighted !== person.id ||
                  this.state.highlighted === person) &&
                  `(${thisAssignee.length})`}
                <div style={{ padding: "0px 10px" }}>
                  {person.username ? person.username : "Unassigned"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
export default Requesting;
